import {
  calculatePriceDiscount,
  getCategory,
  getCurrency,
  getSizeFullInformation,
  getVariant,
} from './helpers.js';
import { get, isNil } from 'lodash-es';
import {
  getWishlistId,
  getWishlistItem,
  getWishlistSet,
  wishlistsActionTypes,
} from '../../wishlists/index.js';
import Analytics, {
  EventType,
  FromParameterType,
  utils,
} from '@farfetch/blackout-analytics';
import type { AnyAction, Dispatch, Middleware } from 'redux';
import type { StoreState } from '../../types/index.js';
import type {
  WishlistActionMiddlewareOptions,
  WishlistActionProcessedOptions,
  WishlistProductUpdateSetActionMetadata,
} from './types/index.js';
import type {
  WishlistItemDenormalized,
  WishlistItemEntity,
  WishlistSetDenormalized,
  WishlistSetItemDenormalized,
} from '../../entities/types/index.js';

/**
 * Extends the default action types with the ones passed to the middleware.
 *
 * @param customActionTypes - Action types to extend/replace the ones from
 *                            \@farfetch/blackout-redux/wishlists.
 *
 * @returns The final map for wishlist actions.
 */
const getActionTypes = (
  customActionTypes?: WishlistActionMiddlewareOptions,
): WishlistActionProcessedOptions => ({
  ADD_WISHLIST_ITEM_SUCCESS: wishlistsActionTypes.ADD_WISHLIST_ITEM_SUCCESS,
  REMOVE_WISHLIST_ITEM_SUCCESS:
    wishlistsActionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
  UPDATE_WISHLIST_ITEM_SUCCESS:
    wishlistsActionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
  UPDATE_WISHLIST_SET_SUCCESS: wishlistsActionTypes.UPDATE_WISHLIST_SET_SUCCESS,
  ...customActionTypes,
});

/**
 * Gets wishlist item id that corresponds to the product specified in the action.
 *
 * @param action     - The action being executed.
 * @param searchMeta - Flag indicating if the search for the wishlist item id should look on the
 *                     action.meta property. This value will be false when there is an update action
 *                     because the id on the action.meta is not the id of the wishlist item after the
 *                     update, as it will be changed by the server.
 *
 * @returns The wishlist item id for the product if available or undefined.
 */
const getWishlistItemIdFromAction = (action: AnyAction, searchMeta = true) => {
  if (searchMeta) {
    const wishlistItemIdInMeta = get(action, 'meta.wishlistItemId');

    if (!isNil(wishlistItemIdInMeta)) {
      return wishlistItemIdInMeta;
    }
  }

  const wishlistItems = get(action, 'payload.entities.wishlistItems') as Record<
    WishlistItemEntity['id'],
    WishlistItemEntity
  >;
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
      // Do not consider merchant if it was not passed to the update wishlist item action
      wishlistItem.merchant ===
        (merchantIdMeta ? merchantIdMeta : wishlistItem.merchant) &&
      // Do not consider size id if it was not passed to the update wishlist item action
      wishlistItem.size.id ===
        (sizeIdMeta ? sizeIdMeta : wishlistItem.size.id) &&
      // Do not consider scale id if it was not passed to the update wishlist item action
      wishlistItem.size.scale ===
        (sizeScaleMeta ? sizeScaleMeta : wishlistItem.size.scale),
  )?.id;
};

/**
 * Builds an object with all wishlist events data needed for tracking.
 *
 * @param action       - The action being executed.
 * @param wishlistItem - The wishlist item entity.
 *
 * @returns Event data for analytics.
 */
const getWishlistData = (
  action: AnyAction,
  wishlistItem:
    | WishlistItemDenormalized
    | WishlistSetItemDenormalized
    | undefined,
) => {
  return {
    affiliation: get(action, 'meta.affiliation'),
    coupon: get(action, 'meta.coupon'),
    from: get(action, 'meta.from'),
    list: get(action, 'meta.list'),
    listId: get(action, 'meta.listId'),
    position: get(action, 'meta.position'),
    isMainWishlist: get(action, 'meta.isMainWishlist'),
    value:
      get(action, 'meta.value') || get(wishlistItem, 'price.includingTaxes'),
  };
};

/**
 * Builds an object with all product data needed for tracking.
 *
 * @param analyticsInstance - Analytics instance.
 * @param state             - Application state.
 * @param wishlistItem      - The wishlist action object.
 *
 * @returns Product data for analytics.
 */
const getProductData = async (
  analyticsInstance: Analytics,
  state: StoreState,
  wishlistItem:
    | WishlistItemDenormalized
    | WishlistSetItemDenormalized
    | undefined,
) => {
  const product = get(wishlistItem, 'product');
  const priceWithDiscount = get(wishlistItem, 'price.includingTaxes', 0);
  const quantity = get(wishlistItem, 'quantity');
  const size = get(wishlistItem, 'size.name');
  const sizeId = get(wishlistItem, 'size.id');

  const sizeScale =
    get(wishlistItem, 'size.scale') ||
    (sizeId && get(getSizeFullInformation(product, sizeId), 'scale')); // size might be defined only on wishlistItem on a hard-refresh of the wishlist page

  const priceWithoutDiscount = get(
    wishlistItem,
    'price.includingTaxesWithoutDiscount',
    0,
  );
  const discount = calculatePriceDiscount(
    priceWithDiscount,
    priceWithoutDiscount,
  );

  return {
    id: get(product, 'id'),
    name: get(product, 'name')?.trim(),
    brand: product?.brand?.name,
    category: getCategory(product),
    discountValue: discount,
    price: priceWithDiscount,
    priceWithoutDiscount,
    variant: getVariant(product),
    currency: await getCurrency(analyticsInstance),
    quantity,
    size,
    sizeId,
    sizeScaleId: sizeScale,
    locationId:
      wishlistItem && 'merchant' in wishlistItem
        ? wishlistItem.merchant?.toString()
        : undefined,
  };
};

/**
 * Middleware for \@farfetch/blackout-redux/wishlists actions, to call
 * `analyticsInstance.track()` with the correct payload.
 *
 * @param analyticsInstance - Analytics instance.
 * @param customActionTypes - Action types to extend/replace the ones from
 *                            \@farfetch/blackout-redux/wishlists.
 *
 * @returns Redux middleware.
 */
export function analyticsWishlistMiddleware(
  analyticsInstance: Analytics,
  customActionTypes?: WishlistActionMiddlewareOptions,
): Middleware {
  if (!analyticsInstance || !(analyticsInstance instanceof Analytics)) {
    utils.logger.error(
      'Wishlist middleware did not receive the analytics instance. Please make sure a valid analytics instance is being passed via "wishlistMiddleware(analytics, customActionTypes)")',
    );
  }

  const actionTypes = getActionTypes(customActionTypes);

  return store => (next: Dispatch) => async (action: AnyAction) => {
    let state: StoreState;

    switch (action.type) {
      case actionTypes.ADD_WISHLIST_ITEM_SUCCESS: {
        // Run the action through the middlewares pipeline
        // so that it can reach the reducers and update store state.
        const result = await next(action);

        // On add item success, it is expected that the item
        // is added on the store after the reducers run.
        state = store.getState();

        const wishlistItemId = getWishlistItemIdFromAction(action);
        const wishlistItem = getWishlistItem(state, wishlistItemId);
        const wishlistId = getWishlistId(state);

        analyticsInstance.track(EventType.ProductAddedToWishlist, {
          ...(await getProductData(analyticsInstance, state, wishlistItem)),
          ...getWishlistData(action, wishlistItem),
          wishlistId,
        });

        return result;
      }

      case actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS: {
        // On delete item success, it is expected that the item
        // that will be deleted is on the store before the reducers run.
        state = store.getState();

        const wishlistItemId = getWishlistItemIdFromAction(action);
        const wishlistItem = getWishlistItem(state, wishlistItemId);
        const wishlistId = getWishlistId(state);

        analyticsInstance.track(EventType.ProductRemovedFromWishlist, {
          ...(await getProductData(analyticsInstance, state, wishlistItem)),
          ...getWishlistData(action, wishlistItem),
          wishlistId,
        });

        // Run the action through the middlewares pipeline
        // so that it can reach the reducers and update store state.
        return next(action);
      }

      case actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS: {
        // Get the previous wishlist item from the store
        // Here we can search the action's meta for a wishlistItemId
        // because we want the previous wishlist item id and not the new one
        // which can be changed after updating.
        const previousWishlistItemId = getWishlistItemIdFromAction(
          action,
          true,
        );
        const previousStoreState = store.getState();
        const previousWishlistItem = getWishlistItem(
          previousStoreState,
          previousWishlistItemId,
        );
        const oldProductData = await getProductData(
          analyticsInstance,
          previousStoreState,
          previousWishlistItem,
        );

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

        const data = {
          ...(await getProductData(analyticsInstance, state, wishlistItem)),
          oldSize: oldProductData.size,
          oldSizeId: oldProductData.sizeId,
          oldSizeScaleId: oldProductData.sizeScaleId,
          oldQuantity: oldProductData.quantity,
          ...getWishlistData(action, wishlistItem),
          wishlistId,
        };

        // product updated will only triggered if provenience is from Wishlist
        if (data.from === FromParameterType.Wishlist) {
          analyticsInstance.track(EventType.ProductUpdated, { ...data });
        }

        // Track analytics Wishlist Product Updated Event
        analyticsInstance.track(EventType.ProductUpdatedWishlist, {
          ...data,
        });

        let eventType = null;

        // Check if the quantity difference is less than it was in wishlist - use PRODUCT_REMOVED_FROM_WISHLIST in that case
        if (data.oldQuantity && data.quantity) {
          if (data.quantity < data.oldQuantity) {
            eventType = EventType.ProductRemovedFromWishlist;
          } else if (data.quantity > data.oldQuantity) {
            eventType = EventType.ProductAddedToWishlist;
          }

          data.quantity = Math.abs(data.quantity - (data.oldQuantity || 0));

          // If eventType was set on previous ifs, then track
          if (eventType !== null) {
            analyticsInstance.track(eventType, {
              ...data,
              oldQuantity: undefined,
            });
          }
        }

        return result;
      }

      case actionTypes.UPDATE_WISHLIST_SET_SUCCESS: {
        // This action is dispatched when the user removes an item
        // from a custom wishlist set.
        state = store.getState();

        const metadata = get(
          action,
          'meta',
        ) as WishlistProductUpdateSetActionMetadata;
        const { isDeleteOperation, isAddOperation, wishlistSetId } = metadata;
        const data = metadata.data || [];
        const wishlistSet = getWishlistSet(state, wishlistSetId as string);
        const wishlistItemId = getWishlistItemIdFromAction(action);
        const wishlistName = get(wishlistSet, 'name');
        const wishlistSetMeta = {
          wishlistId: wishlistSetId, // We can infer the wishlistId parameter from the wishlistSet
          wishlist: wishlistName,
          isMainWishlist: get(action, 'meta.isMainWishlist', false),
        };

        // Here we add support for a generic approach where
        // the middleware does not need to parse the action
        // to know that the delete operation has happened and to which
        // wishlist item id.
        if (isDeleteOperation && !isNil(wishlistItemId)) {
          const wishlistItem = getWishlistItem(state, wishlistItemId);

          analyticsInstance.track(EventType.ProductRemovedFromWishlist, {
            ...(await getProductData(analyticsInstance, state, wishlistItem)),
            ...getWishlistData(action, wishlistItem),
            ...wishlistSetMeta,
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

          analyticsInstance.track(EventType.ProductAddedToWishlist, {
            ...(await getProductData(analyticsInstance, state, wishlistItem)),
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
              pathSplit[pathSplit.length - 1] as string,
            );

            if (isNaN(wishlistItemIndex)) {
              return null;
            }

            if (!wishlistSet) {
              return null;
            }

            return get(wishlistSet, `wishlistSetItems[${wishlistItemIndex}]`);
          })
          .filter(Boolean) as Array<
          WishlistSetDenormalized['wishlistSetItems'][number]
        >;

        await Promise.all(
          removedItems.map(async wishlistItem => {
            analyticsInstance.track(EventType.ProductRemovedFromWishlist, {
              ...(await getProductData(analyticsInstance, state, wishlistItem)),
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
          .filter(Boolean) as WishlistItemDenormalized[];

        await Promise.all(
          addedItems.map(async wishlistItem => {
            analyticsInstance.track(EventType.ProductAddedToWishlist, {
              ...(await getProductData(analyticsInstance, state, wishlistItem)),
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
}
