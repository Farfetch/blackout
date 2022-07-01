import * as fromWishlistReducer from '../reducer/wishlists';
import * as fromWishlistSetsReducer from '../reducer/wishlistsSets';
import { buildWishlistItem, generateWishlistItemHash } from '../utils';
import { createSelector } from 'reselect';
import { getEntityById, getProduct } from '../../entities/selectors';
import type { BuildWishlistItemData } from '../utils/buildWishlistItem';
import type {
  ProductEntity,
  WishlistItemEntity,
  WishlistItemHydrated,
  WishlistSetEntity,
} from '../../entities/types';
import type { StoreState } from '../../types';
import type { WishlistItem } from '@farfetch/blackout-client';
import type { WishlistsState } from '../types';

/**
 * Retrieves the universal identifier of the current user's wishlist.
 *
 * @example
 * ```
 * import { getWishlistId } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistId: getWishlistId(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Universal identifier of the wishlist.
 */
export const getWishlistId = (state: StoreState) =>
  fromWishlistReducer.getId(state.wishlist as WishlistsState);

/**
 * Retrieves current user's wishlist.
 *
 * @example
 * ```
 * import { getWishlist } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlist: getWishlist(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Wishlist result.
 */
export const getWishlist = (state: StoreState) =>
  fromWishlistReducer.getResult(state.wishlist as WishlistsState);

// NOTE: This is an auxiliary function just to have createSelector for the
//       getWishlistItem selector infer the type correctly because
//       the third argument is optional and createSelector uses the first function type
//       to infer the type of the selector functions arguments. Maybe there is another
//       cleaner way to do it, but for now this will do.
const getWishlistItemSelectorAux: (
  state: StoreState,
  wishlistItemId: WishlistItem['id'],
  withParentSetsInfo?: boolean,
) => WishlistItemEntity | undefined = (
  state: StoreState,
  wishlistItemId: WishlistItem['id'],
) => {
  return getEntityById(state, 'wishlistItems', wishlistItemId);
};

/**
 * Retrieves a specific wishlist item by its id, with all properties populated (ie,
 * the product).
 *
 * @example
 * ```
 * import { getWishlistItem } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistItem: { id } }) => ({
 *     wishlistItem: getWishlistItem(state, id)
 * });
 * ```
 *
 * @param state              - Application state.
 * @param wishlistItemId     - Numeric identifier of the wishlist item in the wishlist.
 * @param withParentSetsInfo - Whether the item should be populated with information about the wishlist
 *                             sets it belongs to.
 *
 * @returns Wishlist item entity for the given id.
 */
export const getWishlistItem: (
  state: StoreState,
  wishlistItemId: WishlistItem['id'],
  withParentSetsInfo?: boolean,
) => WishlistItemHydrated | undefined = createSelector(
  [
    getWishlistItemSelectorAux,
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
    ): Record<'id' | 'name', string>[] | undefined => {
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
        (state.wishlist as WishlistsState).sets,
      );

      if (!wishlistSetsIds) {
        return undefined;
      }

      // Gets parent sets info
      return wishlistSetsIds.reduce((acc, setId) => {
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
      }, [] as NonNullable<WishlistItemHydrated['parentSets']>);
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
 * @example
 * ```
 * const wishlistItemsIds = getWishlistItemsIds(state);
 *
 * wishlistItemsIds.map(otherSelector(state));
 * ```
 *
 * @param state - Application state.
 *
 * @returns List of wishlist items ids.
 */
export const getWishlistItemsIds = (state: StoreState) =>
  fromWishlistReducer.getItemsIds(state.wishlist as WishlistsState);

/**
 * Retrieves all wishlist items from the current user's wishlist.
 *
 * @example
 * ```
 * import { getWishlistItems } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 * wishlistItems: getWishlistItems(state),
 * });
 * ```
 *
 * @param state              - Application state.
 * @param withParentSetsInfo - Whether each item should be populated with information about the
 *                             wishlist sets it belongs to.
 *
 * @returns List of each wishlist item entity (with the respective products) from the current user's
 * wishlist.
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
 * @example
 * ```
 * import { getWishlistError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     error: getWishlistError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information, `undefined` if there are no errors.
 */
export const getWishlistError = (state: StoreState) =>
  fromWishlistReducer.getError(state.wishlist as WishlistsState) || undefined;

/**
 * Retrieves the loading status of the wishlist.
 *
 * This status is affected by the loading of the wishlist itself, as well as any
 * "add" operation.
 *
 * @example
 * ```
 * import { isWishlistLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isWishlistLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Loading status of the wishlist.
 */
export const isWishlistLoading = (state: StoreState) =>
  fromWishlistReducer.getIsLoading(state.wishlist as WishlistsState);

/**
 * Retrieves the number of different items in the wishlist, regardless of each
 * one's quantity.
 *
 * @example
 * ```
 * import { getWishlistItemsCounter } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistItemsCounter: getWishlistItemsCounter(state),
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Count of the items in the wishlist.
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
 * Retrieves the total quantity of products in the current user's wishlist,
 * accounting with each item's quantity.
 *
 * @example
 * ```
 * import { getWishlistTotalQuantity } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     wishlistItemsCount: getWishlistTotalQuantity(state),
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Total quantity of products in the wishlist.
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
 * @example
 * ```
 * import { isWishlistItemLoading } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state, { wishlistItem: { id } }) => ({
 *     isLoading: isWishlistItemLoading(state, id)
 * });
 * ```
 *
 * @param state  - Application state.
 * @param itemId - Numeric identifier of the wishlist item in the wishlist.
 *
 * @returns Whether the given wishlist item is loading.
 */
export const isWishlistItemLoading = (
  state: StoreState,
  itemId: WishlistItem['id'],
) =>
  fromWishlistReducer.getAreItemsLoading(state.wishlist as WishlistsState)[
    itemId
  ];

/**
 * Retrieves the error state of a specific wishlist item product by its id.
 *
 * @example
 * ```
 * import { getWishlistItemError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (
 *      state,
 *      { wishlistItem: { product: { id } }
 * }) => ({
 *     error: getWishlistItemError(state, id)
 * });
 * ```
 *
 * @param state  - Application state.
 * @param itemId - Numeric identifier of the product in the wishlist.
 *
 * @returns Error information, `undefined` if there are no errors.
 */
export const getWishlistItemError = (
  state: StoreState,
  itemId: WishlistItem['id'],
) =>
  fromWishlistReducer.getItemsError(state.wishlist as WishlistsState)[itemId];

/**
 * Finds a wishlist item for the given product and size, returns undefined if
 * nothing was found.
 *
 * @example
 * ```
 * import { findProductInWishlist } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state) => ({
 *     getItemInWishlist: findProductInWishlist(state, { product, size: selectedSize });
 * });
 * ```
 *
 * @param state              - Application state.
 * @param data               - Data needed to find check the given product.
 * @param withParentSetsInfo - Whether the item should be populated with information about the wishlist
 *                             sets it belongs to.
 *
 * @returns Returns the item found in the wishlist, undefined otherwise.
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
 * Checks if there is a general error in the wishlist or in one of the wishlist
 * items.
 *
 * @example
 * ```
 * import { isWishlistWithAnyError } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = (state) => ({
 *     hasWishlistError: isWishlistWithAnyError(state),
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Whether there is an error within the wishlist or not.
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
 * given product id. This is useful, for example, for the listing page, where you
 * don't care which size of the product is in the wishlist, you just need to know
 * if that product is already there.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns True if there is at least one wishlist item with the given productId, false otherwise.
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
 * Finds all wishlist items with the provided product identifier. This is useful
 * for scenarios where you don't have the item size.
 *
 * @param state              - Application state.
 * @param productId          - Numeric identifier of the product.
 * @param withParentSetsInfo - Whether the item should be populated with information about the wishlist
 *                             sets it belongs to.
 *
 * @returns List of wishlist items.
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
