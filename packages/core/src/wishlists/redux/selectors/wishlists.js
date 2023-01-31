import * as fromWishlistReducer from '../reducer/wishlists';
import * as fromWishlistSetsReducer from '../reducer/wishlistsSets';
import { buildWishlistItem, createWishlistItemHash } from '../utils';
import { createSelector } from 'reselect';
import { getEntity, getProduct } from '../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Retrieves the universal identifier of the current user's wishlist.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {string} Universal identifier of the wishlist.
 *
 * @example
 * import { getWishlistId } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     wishlistId: getWishlistId(state)
 * });
 */
export const getWishlistId = state => fromWishlistReducer.getId(state.wishlist);

/**
 * Retrieves current user's wishlist.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Wishlist entity.
 *
 * @example
 * import { getWishlist } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     wishlist: getWishlist(state)
 * });
 */
export const getWishlist = state => {
  const wishlistId = getWishlistId(state);

  return getEntity(state, 'wishlist', wishlistId);
};

/**
 * Auxiliary function to find the parent sets of a wishlist item.
 * This is isolated to ease the reading of the `getWishlistItem` selector.
 *
 * @private
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {object} wishlistItem - Wishlist item entity.
 * @param {boolean} withParentSetsInfo - Whether the item should be
 * populated with information about the wishlist sets it belongs to.
 *
 * @returns {Array} Parent sets related to the wishlist item received.
 */
const addParentSetsToWishlistItem = (
  state,
  wishlistItem,
  withParentSetsInfo,
) => {
  if (withParentSetsInfo) {
    // Here I'm not using the wishlist sets selectors to avoid circular dependencies,
    // since `./wishlistSets.js` already consumes selectors from this file
    // (`getWishlistSet` uses `getWishlistItem` to populate the items of a set)
    const wishlistSetsIds = fromWishlistSetsReducer.getIds(
      state.wishlist.wishlistSets,
    );

    if (wishlistSetsIds) {
      const parentSets = wishlistSetsIds.reduce((acc, setId) => {
        const { id, name, wishlistSetItems } = getEntity(
          state,
          'wishlistSets',
          setId,
        );

        for (let { wishlistItemId } of wishlistSetItems) {
          if (wishlistItem.id === wishlistItemId) {
            acc.push({ id, name });
          }
        }

        return acc;
      }, []);

      return parentSets;
    }
  }
};

/**
 * Retrieves a specific wishlist item by its id, with all
 * proprerties populated (ie, the product).
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {number} wishlistItemId - Numeric identifier of the wishlist item in
 * the wishlist.
 * @param {boolean} [withParentSetsInfo=false] - Whether the item should be
 * populated with information about the wishlist sets it belongs to.
 *
 * @returns {object} Wishlist item entity for the given id.
 *
 * @example
 * import { getWishlistItem } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = (state, { wishlistItem: { id } }) => ({
 *     wishlistItem: getWishlistItem(state, id)
 * });
 */
export const getWishlistItem = createSelector(
  [
    (state, wishlistItemId) =>
      getEntity(state, 'wishlistItems', wishlistItemId),
    (state, wishlistItemId) => {
      const wishlistItem = getEntity(state, 'wishlistItems', wishlistItemId);

      return getProduct(state, wishlistItem?.product);
    },
    (state, wishlistItemId, withParentSetsInfo = false) => {
      const wishlistItem = getEntity(state, 'wishlistItems', wishlistItemId);

      return addParentSetsToWishlistItem(
        state,
        wishlistItem,
        withParentSetsInfo,
      );
    },
  ],
  (wishlistItem, product, parentSetsInfo) => {
    let newWishListItem = wishlistItem;

    if (parentSetsInfo) {
      newWishListItem = {
        ...wishlistItem,
        parentSets: parentSetsInfo,
      };
    }

    return { ...newWishListItem, product };
  },
);

/**
 * Retrieves all wishlist items ids from the current user's wishlist.
 *
 * This is typically used as a helper for other selectors.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} List of wishlist items ids.
 *
 * @example
 * const wishlistItemsIds = getWishlistItemsIds(state);
 *
 * wishlistItemsIds.map(otherSelector(state));
 */
export const getWishlistItemsIds = state => get(getWishlist(state), 'items');

/**
 * Retrieves all wishlist items from the current user's wishlist.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {boolean} [withParentSetsInfo=false] - Whether each item should be
 * populated with information about the wishlist sets it belongs to.
 *
 * @returns {Array} List of each wishlist item entity
 * (with the respective products) from the current user's wishlist.
 *
 * @example
 * import { getWishlistItems } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 * wishlistItems: getWishlistItems(state),
 * });
 */
export const getWishlistItems = createSelector(
  [
    getWishlist,
    state => getEntity(state, 'wishlistItems'),
    state => getEntity(state, 'products'),
    // Here I'm not using the wishlist sets selectors to avoid circular dependencies,
    // since `./wishlistSets.js` already consumes selectors from this file
    // (`getWishlistSet` uses `getWishlistItem` to populate the items of a set)
    (state, withParentSetsInfo = false) =>
      withParentSetsInfo &&
      fromWishlistSetsReducer.getIds(state.wishlist.wishlistSets),
    state => getEntity(state, 'wishlistSets'),
    (state, withParentSetsInfo = false) => withParentSetsInfo,
  ],
  (
    wishlist,
    wishlistItems,
    products,
    wishlistSetsIds,
    wishlistSets,
    withParentSetsInfo,
  ) =>
    wishlist?.items?.map(wishlistItemId => {
      let wishlistItem = wishlistItems[wishlistItemId];

      if (withParentSetsInfo && wishlistSetsIds) {
        const parentSetsInfo = wishlistSetsIds.reduce((acc, setId) => {
          const { id, name, wishlistSetItems } = wishlistSets[setId];

          for (let { wishlistItemId } of wishlistSetItems) {
            if (wishlistItem.id === wishlistItemId) {
              acc.push({ id, name });
            }
          }

          return acc;
        }, []);

        wishlistItem = {
          ...wishlistItem,
          parentSets: parentSetsInfo,
        };
      }

      return {
        ...wishlistItem,
        product: products[wishlistItem.product],
      };
    }),
);

/**
 * Retrieves the error state of the current user's wishlist.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object|undefined} Error information,
 * `undefined` if there are no errors.
 *
 * @example
 * import { getWishlistError } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getWishlistError(state)
 * });
 */
export const getWishlistError = state =>
  fromWishlistReducer.getError(state.wishlist) || undefined;

/**
 * Retrieves the loading status of the wishlist.
 *
 * This status is affected by the loading of the wishlist itself,
 * as well as any "add" operation.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status of the wishlist.
 *
 * @example
 * import { isWishlistLoading } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isWishlistLoading(state)
 * });
 */
export const isWishlistLoading = state =>
  fromWishlistReducer.getIsLoading(state.wishlist);

/**
 * Retrieves the number of different items in the wishlist,
 * regardless of each one's quantity.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {number} Count of the items in the wishlist.
 *
 * @example
 * import { getWishlistItemsCounter } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     wishlistItemsCounter: getWishlistItemsCounter(state),
 * });
 */
export const getWishlistItemsCounter = state => {
  const wishlistItems = getWishlistItems(state);

  if (!wishlistItems || wishlistItems.length === 0) {
    return 0;
  }

  return wishlistItems.length;
};

/**
 * Retrieves the total quantity of products in the current user's
 * wishlist, accounting with each item's quantity.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {number} Total quantity of products in
 * the wishlist.
 *
 * @example
 * import { getWishlistTotalQuantity } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = state => ({
 *     wishlistItemsCount: getWishlistTotalQuantity(state),
 * });
 */
export const getWishlistTotalQuantity = state => {
  const wishlistItems = getWishlistItems(state);

  if (!wishlistItems || wishlistItems.length === 0) {
    return 0;
  }

  return wishlistItems.reduce(
    (acc, wishlistItem) => acc + wishlistItem.quantity,
    0,
  );
};

/**
 * Retrieves the loading status of a specific wishlist item by its id.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {number} itemId - Numeric identifier of the wishlist
 * item in the wishlist.
 *
 * @returns {boolean} Whether the given wishlist item is loading.
 *
 * @example
 * import { isWishlistItemLoading } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = (state, { wishlistItem: { id } }) => ({
 *     isLoading: isWishlistItemLoading(state, id)
 * });
 */
export const isWishlistItemLoading = (state, itemId) =>
  fromWishlistReducer.getIsItemLoading(state.wishlist)[itemId];

/**
 * Retrieves the error state of a specific wishlist item product by its id.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {number} itemId - Numeric identifier of the product in the wishlist.
 *
 * @returns {object|undefined} Error information,
 * `undefined` if there are no errors.
 *
 * @example
 * import { getWishlistItemError } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = (
 *      state,
 *      { wishlistItem: { product: { id } }
 * }) => ({
 *     error: getWishlistItemError(state, id)
 * });
 */
export const getWishlistItemError = (state, itemId) =>
  fromWishlistReducer.getItemError(state.wishlist)[itemId];

/**
 * Searches the wishlist for a specific product. This doesn't care about the
 * size of the product, it just finds the wishlist item that matches the given
 * product id.
 * This is useful, for example, for the listing page, where you don't care which
 * size of the product is in the wishlist, you just need to know if that product
 * is already there.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 * @param {boolean} [withParentSetsInfo] - Whether the item should be
 * populated with information about the wishlist sets it belongs to. This is
 * optional because `getWishlistItems` already has the default value.
 *
 * @returns {object} Item at the wishlist if search had results, undefined
 * otherwise.
 */
export const itemInWishlist = (state, productId, withParentSetsInfo) => {
  const wishlistItems = getWishlistItems(state, withParentSetsInfo);

  return (
    wishlistItems &&
    wishlistItems.find(
      wishlistItem => wishlistItem.product.id === Number(productId),
    )
  );
};

/**
 * Creates a function responsible for checking if a given product
 * (with or without a given size) exists in the wishlist. It'll eventually
 * return the found wishlist item.
 * This is particularly useful to get the item of a specific product, with a
 * specific size, for example, to know in which wishlist sets it is; there are
 * cases where you might get two wishlist items of the same product but with
 * different sizes, and you need to get a specific one.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {object} data - Data needed to find check the given product.
 * @param {object} data.product - Product object with its id.
 * @param {object} data.size - Size selected.
 * @param {boolean} [withParentSetsInfo=false] - Whether the item should be
 * populated with information about the wishlist sets it belongs to.
 *
 * @returns {Function|undefined} Function that returns the item found in the
 * wishlist, undefined otherwise.
 *
 * @example
 * import { createGetItemInWishlist } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = (state) => ({
 *     getItemInWishlist: createGetItemInWishlist(state)
 * });
 *
 * render(
 *  const itemInWishlist = getItemInWishlist({ product, size: selectedSize });
 *  ...
 * )
 */
export const createGetItemInWishlist =
  state =>
  ({ product, size }, withParentSetsInfo) => {
    const wishlistItems = getWishlistItems(state, withParentSetsInfo);
    const wishlistItemData = buildWishlistItem(product, size);
    const hash = createWishlistItemHash(wishlistItemData);

    return (
      wishlistItems &&
      wishlistItems.find(item => createWishlistItemHash(item) === hash)
    );
  };

/**
 * Checks if there is a general error in the wishlist or
 * in one of the wishlist items.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Whether there is an error within the wishlist or not.
 *
 * @example
 * import { isWishlistWithAnyError } from '@farfetch/blackout-core/wishlists/redux';
 *
 * const mapStateToProps = (state) => ({
 *     hasWishlistError: isWishlistWithAnyError(state),
 * });
 */
export const isWishlistWithAnyError = state => {
  const items = getWishlistItems(state) || [];

  return (
    !!getWishlistError(state) ||
    items.some(({ id }) => !!getWishlistItemError(state, id))
  );
};
