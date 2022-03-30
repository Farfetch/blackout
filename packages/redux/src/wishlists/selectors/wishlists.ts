import * as fromWishlistReducer from '../reducer/wishlists';
import * as fromWishlistSetsReducer from '../reducer/wishlistsSets';
import { buildWishlistItem, generateWishlistItemHash } from '../utils';
import { createSelector } from 'reselect';
import { getEntityById, getProduct } from '../../entities/selectors';
import type { BuildWishlistItemData } from '../utils/buildWishlistItem';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  ProductEntity,
  WishlistItemEntity,
  WishlistItemHydrated,
  WishlistSetEntity,
} from '../../entities/types';
import type { State } from '../types';
import type { StoreState } from '../../types';
import type { WishlistItem } from '@farfetch/blackout-client/wishlists/types';

/**
 * Retrieves the universal identifier of the current user's wishlist.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {string|null} Universal identifier of the wishlist.
 *
 * @example
 * import { getWishlistId } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistId: getWishlistId(state)
 * });
 */
export const getWishlistId = (state: StoreState): State['id'] =>
  fromWishlistReducer.getId(state.wishlist);

/**
 * Retrieves current user's wishlist.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Wishlist result.
 *
 * @example
 * import { getWishlist } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlist: getWishlist(state)
 * });
 */
export const getWishlist = (state: StoreState): State['result'] =>
  fromWishlistReducer.getResult(state.wishlist);

/**
 * Retrieves a specific wishlist item by its id, with all
 * properties populated (ie, the product).
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
 * import { getWishlistItem } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistItem: { id } }) => ({
 *     wishlistItem: getWishlistItem(state, id)
 * });
 */
export const getWishlistItem = createSelector(
  [
    (state: StoreState, wishlistItemId: WishlistItem['id']) =>
      getEntityById(state, 'wishlistItems', wishlistItemId),
    (state: StoreState, wishlistItemId: WishlistItem['id']) => {
      const wishlistItem = getEntityById(
        state,
        'wishlistItems',
        wishlistItemId,
      ) as WishlistItemEntity;

      return getProduct(state, wishlistItem?.product);
    },
    (
      state: StoreState,
      wishlistItemId: WishlistItem['id'],
      withParentSetsInfo = false,
    ) => {
      if (!withParentSetsInfo) {
        return;
      }

      const wishlistItem = getEntityById(
        state,
        'wishlistItems',
        wishlistItemId,
      ) as WishlistItemEntity;
      // Here I'm not using the wishlist sets selectors to avoid circular dependencies,
      // since `./wishlistSets.js` already consumes selectors from this file
      // (`getWishlistSet` uses `getWishlistItem` to populate the items of a set)
      const wishlistSetsIds = fromWishlistSetsReducer.getIds(
        state.wishlist.sets,
      );

      // Gets parent sets info
      return wishlistSetsIds?.reduce((acc, setId) => {
        const { id, name, wishlistSetItems } = getEntityById(
          state,
          'wishlistSets',
          setId,
        ) as WishlistSetEntity;

        for (const { wishlistItemId } of wishlistSetItems) {
          if (wishlistItem.id === wishlistItemId) {
            acc.push({ id, name });
          }
        }

        return acc;
      }, [] as Record<'id' | 'name', string>[]);
    },
  ],
  (wishlistItem, product, parentSetsInfo) => {
    let newWishListItem = wishlistItem;

    if (parentSetsInfo) {
      newWishListItem = {
        ...wishlistItem,
        parentSets: parentSetsInfo,
      } as WishlistItemHydrated;
    }

    return { ...newWishListItem, product } as WishlistItemHydrated | undefined;
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
 * @returns {Array|null} List of wishlist items ids.
 *
 * @example
 * const wishlistItemsIds = getWishlistItemsIds(state);
 *
 * wishlistItemsIds.map(otherSelector(state));
 */
export const getWishlistItemsIds = (state: StoreState): State['items']['ids'] =>
  fromWishlistReducer.getItemsIds(state.wishlist);

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
 * @returns {Array|undefined} List of each wishlist item entity
 * (with the respective products) from the current user's wishlist.
 *
 * @example
 * import { getWishlistItems } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 * wishlistItems: getWishlistItems(state),
 * });
 */
export const getWishlistItems = createSelector(
  [
    getWishlistItemsIds,
    state => state,
    (state, withParentSetsInfo = false) => withParentSetsInfo,
  ],
  (wishlistItemsIds, state, withParentSetsInfo) =>
    wishlistItemsIds?.map(wishlistItemId =>
      getWishlistItem(state, wishlistItemId, withParentSetsInfo),
    ),
) as (
  state: unknown,
  withParentSetsInfo?: boolean,
) => WishlistItemHydrated[] | undefined;

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
 * import { getWishlistError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     error: getWishlistError(state)
 * });
 */
export const getWishlistError = (
  state: StoreState,
): State['error'] | undefined =>
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
 * import { isWishlistLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isWishlistLoading(state)
 * });
 */
export const isWishlistLoading = (state: StoreState): State['isLoading'] =>
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
 * import { getWishlistItemsCounter } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistItemsCounter: getWishlistItemsCounter(state),
 * });
 */
export const getWishlistItemsCounter = (state: StoreState): number => {
  const wishlistItems = getWishlistItems(state);

  if (!wishlistItems || wishlistItems.length === 0) {
    return 0;
  }

  // @TODO: Why not return `wishlist.count`?
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
 * import { getWishlistTotalQuantity } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistItemsCount: getWishlistTotalQuantity(state),
 * });
 */
export const getWishlistTotalQuantity = (state: StoreState): number => {
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
 * @returns {boolean|undefined} Whether the given wishlist item is loading.
 *
 * @example
 * import { isWishlistItemLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistItem: { id } }) => ({
 *     isLoading: isWishlistItemLoading(state, id)
 * });
 */
export const isWishlistItemLoading = (
  state: StoreState,
  itemId: WishlistItem['id'],
): boolean | undefined =>
  fromWishlistReducer.getAreItemsLoading(state.wishlist)[itemId];

/**
 * Retrieves the error state of a specific wishlist item product by its id.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {number} itemId - Numeric identifier of the product in the wishlist.
 *
 * @returns {object|null|undefined} Error information,
 * `undefined` if there are no errors.
 *
 * @example
 * import { getWishlistItemError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (
 *      state,
 *      { wishlistItem: { product: { id } }
 * }) => ({
 *     error: getWishlistItemError(state, id)
 * });
 */
export const getWishlistItemError = (
  state: StoreState,
  itemId: WishlistItem['id'],
): Error | null | undefined =>
  fromWishlistReducer.getItemsError(state.wishlist)[itemId];

/**
 * Finds a wishlist item for the given product and size,
 * returns undefined if nothing was found.
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
 * @returns {Object|undefined} Returns the item found in the wishlist,
 * undefined otherwise.
 *
 * @example
 * import { findProductInWishlist } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state) => ({
 *     getItemInWishlist: findProductInWishlist(state, { product, size: selectedSize });
 * });
 */
export const findProductInWishlist = createSelector(
  [
    (
      state: StoreState,
      data: BuildWishlistItemData,
      withParentSetsInfo = false,
    ) => getWishlistItems(state, withParentSetsInfo),
    (state: StoreState, { product, size }: BuildWishlistItemData) => ({
      product,
      size,
    }),
  ],
  (wishlistItems, { product, size }) => {
    const wishlistItemData = buildWishlistItem({ product, size });
    const hash = generateWishlistItemHash(wishlistItemData);

    return wishlistItems?.find(item => generateWishlistItemHash(item) === hash);
  },
);

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
 * import { isWishlistWithAnyError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state) => ({
 *     hasWishlistError: isWishlistWithAnyError(state),
 * });
 */
export const isWishlistWithAnyError = (state: StoreState): boolean => {
  const items = getWishlistItems(state) || [];

  return (
    !!getWishlistError(state) ||
    items.some(({ id }) => !!getWishlistItemError(state, id))
  );
};

/**
 * Searches the wishlist items for a specific product. This doesn't care about the
 * size of the product, it just finds if there are wishlist items that match the
 * given product id.
 * This is useful, for example, for the listing page, where you don't care which
 * size of the product is in the wishlist, you just need to know if that product
 * is already there.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 *
 * @returns {boolean} True if there is at least one wishlist item with the given
 * productId, false otherwise.
 */
export const isProductInWishlist = (
  state: StoreState,
  productId: ProductEntity['id'],
): boolean => {
  const wishlistItems = getWishlistItems(state) || [];

  return wishlistItems.some(
    wishlistItem => wishlistItem.product.id === Number(productId),
  );
};

/**
 * Finds all wishlist items with the provided product identifier.
 * This is useful for scenarios where you don't have the item size.
 *
 * @function
 * @memberof module:wishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 * @param {boolean} [withParentSetsInfo=false] - Whether the item should be
 * populated with information about the wishlist sets it belongs to.
 *
 * @returns {Array} List of wishlist items.
 */
export const getWishlistItemsByProductId = createSelector(
  [
    (
      state: StoreState,
      productId: ProductEntity['id'],
      withParentSetsInfo = false,
    ) => getWishlistItems(state, withParentSetsInfo) || [],
    (state: StoreState, productId: ProductEntity['id']) => productId,
  ],
  (wishlistItems, productId) =>
    wishlistItems.filter(
      wishlistItem => wishlistItem.product.id === Number(productId),
    ),
);
