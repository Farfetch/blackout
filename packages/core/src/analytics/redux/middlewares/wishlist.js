import {
  calculatePriceDiscount,
  getBrand,
  getCategory,
  getCurrency,
  getVariant,
} from './helpers';
import {
  getWishlistId,
  getWishlistItem,
  getWishlistSet,
  actionTypes as wishlistActionTypes,
} from '../../../wishlists/redux';
import { logger } from '../../utils';
import Analytics, { eventTypes, fromParameterTypes } from '../../';
import get from 'lodash/get';
import isNil from 'lodash/isNil';

/**
 * Extends the default action types with the ones passed to the middleware.
 *
 * @private
 *
 * @param {object} customActionTypes - Action types to extend/replace the ones from @farfetch/blackout-core/wishlists/redux.
 *
 * @returns {object} The final map for bag actions.
 */
const getActionTypes = customActionTypes => ({
  ADD_ITEM_TO_WISHLIST_SUCCESS:
    wishlistActionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
  DELETE_WISHLIST_ITEM_SUCCESS:
    wishlistActionTypes.DELETE_WISHLIST_ITEM_SUCCESS,
  UPDATE_WISHLIST_ITEM_SUCCESS:
    wishlistActionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
  UPDATE_WISHLIST_SET_SUCCESS: wishlistActionTypes.UPDATE_WISHLIST_SET_SUCCESS,
  ...customActionTypes,
});

/**
 * Gets wishlist item id that corresponds to the product
 * specified in the action.
 *
 * @private
 *
 * @param {object} action - The action being executed.
 * @param {boolean} searchMeta - Flag indicating if the search for the wishlist item id should look on the action.meta property. This value will be false when there is an update action because the id on the action.meta is not the id of the wishlist item after the update, as it will be changed by the server.
 *
 * @returns {(number|undefined)} The wishlist item id for the product if available or undefined.
 */
const getWishlistItemIdFromAction = (action, searchMeta = true) => {
  if (searchMeta) {
    const wishlistItemIdInMeta = get(action, 'meta.wishlistItemId');

    if (!isNil(wishlistItemIdInMeta)) {
      return wishlistItemIdInMeta;
    }
  }

  const wishlistItems = get(action, 'payload.entities.wishlistItems');
  const productIdMeta = get(action, 'meta.productId');
  const merchantIdMeta = get(action, 'meta.merchantId');
  const sizeIdMeta = get(action, 'meta.size');
  const sizeScaleMeta = get(action, 'meta.scale');

  if (!wishlistItems || !productIdMeta) {
    return;
  }

  return Object.values(wishlistItems).find(
    wishlistItem =>
      wishlistItem.product === productIdMeta &&
      wishlistItem.merchant ===
        (merchantIdMeta ? merchantIdMeta : wishlistItem.merchant) &&
      wishlistItem.size.id === sizeIdMeta &&
      wishlistItem.size.scale === sizeScaleMeta,
  )?.id;
};

/**
 * Builds an object with all wishlist events data needed for tracking.
 *
 * @private
 *
 * @param {object} action - The action being executed.
 * @param {object} wishlistItem - The wishlist item entity.
 *
 * @returns {object} Event data for analytics.
 */
const getWishlistData = (action, wishlistItem) => {
  return {
    affiliation: get(action, 'meta.affiliation'),
    coupon: get(action, 'meta.coupon'),
    from: get(action, 'meta.from'),
    list: get(action, 'meta.list'),
    listId: get(action, 'meta.listId'),
    position: get(action, 'meta.position'),
    value:
      get(action, 'meta.value') || get(wishlistItem, 'price.includingTaxes'),
  };
};

/**
 * Builds an object with all product data needed for tracking.
 *
 * @private
 * @param {Analytics} analyticsInstance - Analytics instance.
 * @param {object} state - Application state.
 * @param {object} action - The action being executed.
 * @param {object} wishlistItem - The wishlist action object.
 * @returns {object} Product data for analytics.
 */
const getProductData = async (
  analyticsInstance,
  state,
  wishlistItem,
  action,
) => {
  const product = get(wishlistItem, 'product');
  const priceWithDiscount = get(wishlistItem, 'price.includingTaxes');
  const quantity = get(wishlistItem, 'quantity');
  const size = get(wishlistItem, 'size.name');
  const metadata = get(action, 'meta');
  const oldSize = get(metadata, 'oldSize.name');
  const priceWithoutDiscount = get(
    wishlistItem,
    'price.includingTaxesWithoutDiscount',
  );
  const discount = calculatePriceDiscount(
    priceWithDiscount,
    priceWithoutDiscount,
  );

  return {
    id: get(product, 'id'),
    name: get(product, 'name')?.trim(),
    brand: getBrand(state, product),
    category: getCategory(state, product),
    discountValue: discount,
    price: priceWithDiscount,
    priceWithoutDiscount,
    variant: getVariant(product),
    currency: await getCurrency(analyticsInstance),
    quantity,
    size,
    oldSize,
  };
};

/**
 * Middleware for @farfetch/blackout-core/wishlists/redux actions, to call `analyticsInstance.track()` with the correct payload.
 *
 * @function wishlistMiddleware
 * @memberof module:analytics/middlewares
 *
 * @param {Analytics} analyticsInstance - Analytics instance.
 * @param {object} customActionTypes - Action types to extend/replace the ones from @farfetch/blackout-core/wishlists/redux.
 *
 * @returns {Function} Redux middleware.
 */
export default (analyticsInstance, customActionTypes) => {
  if (!analyticsInstance || !(analyticsInstance instanceof Analytics)) {
    logger.error(
      'Wishlist middleware did not receive the analytics instance. Please make sure a valid analytics instance is being passed via "wishlistMiddleware(analytics, customActionTypes)")',
    );
  }

  const actionTypes = getActionTypes(customActionTypes);

  return store => next => async action => {
    let state;

    switch (action.type) {
      case actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS: {
        // Run the action through the middlewares pipeline
        // so that it can reach the reducers and update store state.
        const result = await next(action);

        // On add item success, it is expected that the item
        // is added on the store after the reducers run.
        state = store.getState();
        const wishlistItemId = getWishlistItemIdFromAction(action);
        const wishlistItem = getWishlistItem(state, wishlistItemId);
        const wishlistId = getWishlistId(state);

        analyticsInstance.track(eventTypes.PRODUCT_ADDED_TO_WISHLIST, {
          ...(await getProductData(
            analyticsInstance,
            state,
            wishlistItem,
            action,
          )),
          ...getWishlistData(action, wishlistItem),
          wishlistId,
        });

        return result;
      }

      case actionTypes.DELETE_WISHLIST_ITEM_SUCCESS: {
        // On delete item success, it is expected that the item
        // that will be deleted is on the store before the reducers run.
        state = store.getState();
        const wishlistItemId = getWishlistItemIdFromAction(action);
        const wishlistItem = getWishlistItem(state, wishlistItemId);
        const wishlistId = getWishlistId(state);

        analyticsInstance.track(eventTypes.PRODUCT_REMOVED_FROM_WISHLIST, {
          ...(await getProductData(
            analyticsInstance,
            state,
            wishlistItem,
            action,
          )),
          ...getWishlistData(action, wishlistItem),
          wishlistId,
        });

        // Run the action through the middlewares pipeline
        // so that it can reach the reducers and update store state.
        return next(action);
      }

      case actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS: {
        // Run the action through the middlewares pipeline
        // so that it can reach the reducers and update store state.
        const result = await next(action);

        // On update item success, it is expected that the item
        // that was updated is on the store after the reducers run.
        // However, a new item with a new id will be created by the server,
        // replacing the previous item so we pass false on the call to
        // getWishlistItemIdFromAction to not search
        // for a wishlistItemId on the action.meta.
        state = store.getState();
        const wishlistItemId = getWishlistItemIdFromAction(action, false);
        const wishlistItem = getWishlistItem(state, wishlistItemId);
        const wishlistId = getWishlistId(state);

        const analyticsData = {
          ...(await getProductData(
            analyticsInstance,
            state,
            wishlistItem,
            action,
          )),
          ...getWishlistData(action, wishlistItem),
          wishlistId,
        };

        analyticsInstance.track(eventTypes.PRODUCT_UPDATED, {
          ...analyticsData,
          from: fromParameterTypes.WISHLIST,
        });

        analyticsInstance.track(
          eventTypes.PRODUCT_UPDATED_WISHLIST,
          analyticsData,
        );

        return result;
      }

      case actionTypes.UPDATE_WISHLIST_SET_SUCCESS: {
        // This action is dispatched when the user removes an item
        // from a custom wishlist set.
        state = store.getState();
        const data = get(action, 'meta.data');
        const isDeleteOperation = get(action, 'meta.isDeleteOperation');
        const isAddOperation = get(action, 'meta.isAddOperation');
        const wishlistSetId = get(action, 'meta.wishlistSetId');
        const wishlistSet = getWishlistSet(state, wishlistSetId);
        const wishlistItemId = getWishlistItemIdFromAction(action);

        // Here we add support for a generic approach where
        // the middleware does not need to parse the action
        // to know that the delete operation has happened and to which
        // wishlist item id.
        if (isDeleteOperation && !isNil(wishlistItemId)) {
          const wishlistItem = getWishlistItem(state, wishlistItemId);

          analyticsInstance.track(eventTypes.PRODUCT_REMOVED_FROM_WISHLIST, {
            ...(await getProductData(
              analyticsInstance,
              state,
              wishlistItem,
              action,
            )),
            ...getWishlistData(action, wishlistItem),
            wishlistId: wishlistSetId, // We can infer the wishlistId parameter from the wishlistSet
          });

          return next(action);
        }

        // Here we add support for a generic approach where
        // the middleware does not need to parse the action
        // to know that the add operation has happened and to which
        // wishlist item id.
        if (isAddOperation && !isNil(wishlistItemId)) {
          const result = await next(action);
          state = store.getState();
          const wishlistItem = getWishlistItem(state, wishlistItemId);

          analyticsInstance.track(eventTypes.PRODUCT_ADDED_TO_WISHLIST, {
            ...(await getProductData(
              analyticsInstance,
              state,
              wishlistItem,
              action,
            )),
            ...getWishlistData(action, wishlistItem),
            wishlistId: wishlistSetId, // We can infer the wishlistId parameter from the wishlistSet
          });

          return result;
        }

        // In case the action did not provide the removed item through
        // meta parameters, we need to parse the action data payload to
        // obtain them. This is specific to our update wishlist set
        // action.
        // We need to look for items that were removed, i.e. 'op' property
        // is 'remove' and item index is the last path.
        const removedItems = data
          .filter(updatedItem => updatedItem.op === 'remove')
          .map(removedItem => {
            const { path } = removedItem;
            const pathSplit = path.split('/');

            const wishlistItemIndex = parseFloat(
              pathSplit[pathSplit.length - 1],
            );

            if (isNaN(wishlistItemIndex)) {
              return null;
            }

            if (!wishlistSet) {
              return null;
            }

            return get(wishlistSet, `wishlistSetItems[${wishlistItemIndex}]`);
          })
          .filter(Boolean);

        await Promise.all(
          removedItems.map(async wishlistItem => {
            analyticsInstance.track(eventTypes.PRODUCT_REMOVED_FROM_WISHLIST, {
              ...(await getProductData(
                analyticsInstance,
                state,
                wishlistItem,
                action,
              )),
              ...getWishlistData(action, wishlistItem),
              wishlistId: wishlistSetId, // We can infer the wishlistId parameter from the wishlistSet
            });
          }),
        );

        // Here we dispatch the action to the next middleware
        // in order to have the store updated.
        // This is necessary because when the operation is 'add',
        // the wishlistItem might be only available after the
        // action is processed by the reducers.
        const result = await next(action);

        // Update store reference.
        state = store.getState();

        // In case the action did not provide the added item through
        // meta parameters, we need to parse the action data payload to
        // obtain them. This is specific to our update wishlist set
        // action.
        // We need to look for items that were added, i.e. 'op' property
        // is 'add' and value contains the wishlist item id that was added.
        const addedItems = data
          .filter(updatedItem => updatedItem.op === 'add')
          .map(addedItem => {
            const wishlistItemId = get(addedItem, 'value.wishlistItemId');

            if (!wishlistItemId) {
              return null;
            }

            return getWishlistItem(state, wishlistItemId);
          })
          .filter(Boolean);

        await Promise.all(
          addedItems.map(async wishlistItem => {
            analyticsInstance.track(eventTypes.PRODUCT_ADDED_TO_WISHLIST, {
              ...(await getProductData(
                analyticsInstance,
                state,
                wishlistItem,
                action,
              )),
              ...getWishlistData(action, wishlistItem),
              wishlistId: wishlistSetId, // We can infer the wishlistId parameter from the wishlistSet
            });
          }),
        );

        // Return the result from the chain
        return result;
      }

      default:
        return next(action);
    }
  };
};
