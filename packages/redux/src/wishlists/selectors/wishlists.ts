import * as fromWishlistReducer from '../reducer/wishlists';
import { buildWishlistItem, generateWishlistItemHash } from '../utils';
import { type CategoryEntity, getEntities } from '../../entities';
import { createSelector } from 'reselect';
import { getWishlistSetsIds } from './wishlistsSets';
import type { Brand, WishlistItem } from '@farfetch/blackout-client';
import type { BuildWishlistItemData } from '../utils/buildWishlistItem';
import type {
  ProductEntity,
  WishlistItemDenormalized,
  WishlistItemEntity,
  WishlistSetEntity,
} from '../../entities/types';
import type { StoreState } from '../../types';
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
 * import { getWishlist } from '@farfetch/blackout-redux';
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

/**
 * Denormalizes a wishlist item.
 *
 * @param wishlistItemId - Wishlist item id.
 * @param withParentSetsInfo - If the wishlist item info should include parent sets as well.
 * @param wishlistItems - Wishlist item entities as obtained with getEntities(state, 'wishlistItems').
 * @param products - Product entities as obtained with getEntities(state, 'products').
 * @param wishlistSetsIds - Wishlist sets ids as obtained with getWishlistSetsIds selector.
 * @param wishlistSets  - Wishlist set entities as obtained with getEntities(state, 'wishlistSets').
 *
 * @returns Wishlist item object containing product information and parent sets info if withParentSetsInfo is true.
 */
const denormalizeWishlistItem = (
  wishlistItemId: WishlistItem['id'],
  withParentSetsInfo = false,
  wishlistItems:
    | Record<WishlistItemEntity['id'], WishlistItemEntity>
    | undefined,
  products: Record<ProductEntity['id'], ProductEntity> | undefined,
  wishlistSetsIds: string[] | undefined,
  wishlistSets: Record<WishlistSetEntity['id'], WishlistSetEntity> | undefined,
  brands: Record<Brand['id'], Brand> | undefined,
  categories: Record<CategoryEntity['id'], CategoryEntity> | undefined,
): WishlistItemDenormalized | undefined => {
  const wishlistItemEntity = wishlistItems?.[wishlistItemId];

  if (!wishlistItemEntity) {
    return undefined;
  }

  const productEntity = products?.[wishlistItemEntity?.product];

  let parentSetsInfo;

  if (withParentSetsInfo) {
    if (!wishlistSetsIds) {
      return undefined;
    }

    // Gets parent sets info
    parentSetsInfo = wishlistSetsIds.reduce((acc, setId) => {
      const wishlistSet = wishlistSets?.[setId];

      if (!wishlistSet) {
        return acc;
      }

      const { id, name, wishlistSetItems } = wishlistSet;

      for (const { wishlistItemId } of wishlistSetItems) {
        if (wishlistItemEntity.id === wishlistItemId) {
          acc.push({ id, name });
        }
      }

      return acc;
    }, [] as NonNullable<WishlistItemDenormalized['parentSets']>);
  }

  const productBrand = productEntity?.brand;
  const brand = productBrand ? brands?.[productBrand] : undefined;
  const productCategories =
    categories &&
    (productEntity?.categories
      ?.map(id => categories[id])
      .filter(Boolean) as CategoryEntity[]);

  const product = productEntity
    ? {
        ...productEntity,
        brand,
        categories: productCategories,
      }
    : undefined;

  const wishlistItem: WishlistItemDenormalized = {
    ...wishlistItemEntity,
    product,
  };

  if (withParentSetsInfo) {
    wishlistItem.parentSets = parentSetsInfo;
  }

  return wishlistItem;
};

/**
 * Retrieves a specific wishlist item denormalized by its id, with all properties populated (ie,
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
) => WishlistItemDenormalized | undefined = createSelector(
  [
    (_, wishlistItemId) => wishlistItemId,
    (_, __, withParentSetsInfo?: boolean) => withParentSetsInfo,
    (state: StoreState) => getEntities(state, 'wishlistItems'),
    (state: StoreState) => getEntities(state, 'products'),
    getWishlistSetsIds,
    (state: StoreState) => getEntities(state, 'wishlistSets'),
    (state: StoreState) => getEntities(state, 'brands'),
    (state: StoreState) => getEntities(state, 'categories'),
  ],
  (
    wishlistItemId,
    withParentSetsInfo,
    wishlistItems,
    products,
    wishlistSetsIds,
    wishlistSets,
    brands,
    categories,
  ) => {
    return denormalizeWishlistItem(
      wishlistItemId,
      withParentSetsInfo,
      wishlistItems,
      products,
      wishlistSetsIds,
      wishlistSets,
      brands,
      categories,
    );
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
 * Retrieves all wishlist items denormalized from the current user's wishlist.
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
export const getWishlistItems: (
  state: StoreState,
  withParentSetsInfo?: boolean,
) => WishlistItemDenormalized[] | undefined = createSelector(
  [
    getWishlistItemsIds,
    (_, withParentSetsInfo: boolean | undefined = false) => withParentSetsInfo,
    (state: StoreState) => getEntities(state, 'wishlistItems'),
    (state: StoreState) => getEntities(state, 'products'),
    (state: StoreState) => getWishlistSetsIds(state),
    (state: StoreState) => getEntities(state, 'wishlistSets'),
    (state: StoreState) => getEntities(state, 'brands'),
    (state: StoreState) => getEntities(state, 'categories'),
  ],
  (
    wishlistItemsIds,
    withParentSetsInfo,
    wishlistItems,
    products,
    wishlistSetsIds,
    wishlistSets,
    brands,
    categories,
  ) =>
    wishlistItemsIds
      ?.map(wishlistItemId =>
        denormalizeWishlistItem(
          wishlistItemId,
          withParentSetsInfo,
          wishlistItems,
          products,
          wishlistSetsIds,
          wishlistSets,
          brands,
          categories,
        ),
      )
      .filter(Boolean) as WishlistItemDenormalized[],
);

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
  fromWishlistReducer.getError(state.wishlist as WishlistsState);

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
 * Retrieves if the wishlist has been fetched.
 *
 * Will return true if a fetch wishlist request
 * has been made that returned either successfully or failed
 * and false otherwise.
 *
 * @example
 * ```
 * import { isWishlistFetched } from '@farfetch/blackout-redux/wishlists';
 *
 * const mapStateToProps = state => ({
 *     isFetched: isWishlistFetched(state)
 * });
 * ```
 * @param state - Application state.
 *
 * @returns isFetched status of the wishlist.
 */
export const isWishlistFetched = (state: StoreState) =>
  (!!getWishlistId(state) || !!getWishlistError(state)) &&
  !isWishlistLoading(state);

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
export const findProductInWishlist: (
  state: StoreState,
  data: BuildWishlistItemData,
  withParentSetsInfo?: boolean,
) => WishlistItemDenormalized | undefined = createSelector(
  [
    (
      state: StoreState,
      data: BuildWishlistItemData,
      withParentSetsInfo: boolean | undefined = false,
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
export const isWishlistWithAnyError = (state: StoreState) => {
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
    wishlistItem => wishlistItem.product?.id === Number(productId),
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
export const getWishlistItemsByProductId: (
  state: StoreState,
  productId: ProductEntity['id'],
) => WishlistItemDenormalized[] = createSelector(
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
      wishlistItem => wishlistItem.product?.id === Number(productId),
    ),
);
