import * as fromSharedWishlistReducer from './reducer.js';
import { createSelector } from 'reselect';
import { getEntities, getEntityById } from '../entities/selectors/index.js';
import type { Brand, SharedWishlist } from '@farfetch/blackout-client';
import type {
  CategoryEntity,
  ProductEntity,
  SharedWishlistEntity,
  SharedWishlistItemDenormalized,
  SharedWishlistItemEntity,
} from '../entities/types/index.js';
import type { SharedWishlistState } from './types/index.js';
import type { StoreState } from '../types/index.js';

/**
 * Retrieves current user's shared wishlist id.
 *
 * @example
 * ```
 * import { getSharedWishlistId } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     sharedWishlistId: getSharedWishlistId(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Shared Wishlist result.
 */
export const getSharedWishlistId = (state: StoreState) =>
  fromSharedWishlistReducer.getResult(
    state.sharedWishlist as SharedWishlistState,
  );

/**
 * Retrieves the error state of the current user's shared wishlist.
 *
 * @example
 * ```
 * import { getSharedWishlistError } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     error: getSharedWishlistError(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Error information, `undefined` if there are no errors.
 */
export const getSharedWishlistError = (state: StoreState) =>
  fromSharedWishlistReducer.getError(
    state.sharedWishlist as SharedWishlistState,
  );

/**
 * Retrieves the loading status of the shared wishlist.
 *
 * This status is affected by the loading of the shared wishlist itself, as well as any
 * "add" operation.
 *
 * @example
 * ```
 * import { isSharedWishlistLoading } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: isSharedWishlistLoading(state)
 * });
 * ```
 *
 * @param state - Application state.
 *
 * @returns Loading status of the wishlist.
 */
export const isSharedWishlistLoading = (state: StoreState) =>
  fromSharedWishlistReducer.getIsLoading(
    state.sharedWishlist as SharedWishlistState,
  );

/**
 * Retrieves a specific shared wishlist by its id, with all properties populated (ie, the
 * product).
 *
 * @example
 * ```
 * import { getSharedWishlist } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { sharedWishlists: { id } }) => ({
 *     sharedWishlist: getSharedWishlist(state, id)
 * });
 * ```
 *
 * @param state     - Application state.
 * @param sharedWishlistId - Numeric identifier of the shared wishlist.
 *
 * @returns - Shared Wishlist item entity for the given id.
 */
export const getSharedWishlist = (
  state: StoreState,
  sharedWishlistId: SharedWishlist['id'],
) => {
  return getEntityById(state, 'sharedWishlists', sharedWishlistId);
};

/**
 * Retrieves a specific shared wishlist item by its id, with all properties populated (ie, the
 * product).
 *
 * @example
 * ```
 * import { getSharedWishlistItem } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { sharedWishlistItem: { id } }) => ({
 *     sharedWishlistItem: getSharedWishlistItem(state, id)
 * });
 * ```
 *
 * @param state     - Application state.
 * @param sharedWishlistItemId - Numeric identifier of the shared wishlist item.
 *
 * @returns - Shared Wishlist item entity for the given id.
 */

export const getSharedWishlistItem: (
  state: StoreState,
  sharedWishlistItemId: SharedWishlistItemEntity['id'],
) => SharedWishlistItemDenormalized | undefined = createSelector(
  [
    (_, sharedWishlistItemId) => sharedWishlistItemId,
    (state: StoreState) => getEntities(state, 'sharedWishlistItems'),
    (state: StoreState) => getEntities(state, 'products'),
    (state: StoreState) => getEntities(state, 'brands'),
    (state: StoreState) => getEntities(state, 'categories'),
  ],
  (sharedWishlistItemId, sharedWishlistItems, products, brands, categories) => {
    return denormalizeSharedWishlistItem(
      sharedWishlistItemId,
      sharedWishlistItems,
      products,
      brands,
      categories,
    );
  },
);

/**
 * Retrieves shared wishlist items from a specific wishlist
 *
 * @example
 * ```
 * import { getSharedWishlistItems } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = (state, { sharedWishlists: { id } }) => ({
 *     sharedWishlistItems: getSharedWishlistItems(state, id)
 * });
 * ```
 *
 * @param state            - Application state.
 * @param sharedWishlistId - The id of the shared wishlist to get the items from.
 *
 * @returns - Shared Wishlist Items entity for the given id.
 */
export const getSharedWishlistItems: (
  state: StoreState,
  sharedWishlistId: SharedWishlistEntity['id'],
) => SharedWishlistItemDenormalized[] | undefined = createSelector(
  [
    (_, sharedWishlistId) => sharedWishlistId,
    (state: StoreState) => getEntities(state, 'sharedWishlists'),
    (state: StoreState) => getEntities(state, 'sharedWishlistItems'),
    (state: StoreState) => getEntities(state, 'products'),
    (state: StoreState) => getEntities(state, 'brands'),
    (state: StoreState) => getEntities(state, 'categories'),
  ],
  (
    sharedWishlistId,
    sharedWishlists,
    sharedWishlistItems,
    products,
    brands,
    categories,
  ) => {
    const sharedWishlistEntity = sharedWishlists?.[sharedWishlistId];

    if (!sharedWishlistEntity) {
      return undefined;
    }

    return sharedWishlistEntity.items
      .map(itemId =>
        denormalizeSharedWishlistItem(
          itemId,
          sharedWishlistItems,
          products,
          brands,
          categories,
        ),
      )
      .filter(Boolean) as SharedWishlistItemDenormalized[];
  },
);

/**
 * Denormalizes a shared wishlist item.
 *
 * @param sharedWishlistItemId - Shared wishlist item id.
 * @param sharedWishlistItems - Shared wishlist item entities as obtained with getEntities(state, 'sharedWishlistItems').
 * @param products - Product entities as obtained with getEntities(state, 'products').
 * @param brands - Brand entities as obtained with getEntities(state, 'brands').
 * @param categories  - Category entities as obtained with getEntities(state, 'categories').
 *
 * @returns Shared wishlist item object containing product information.
 */
const denormalizeSharedWishlistItem = (
  sharedWishlistItemId: SharedWishlistItemEntity['id'],
  sharedWishlistItems:
    | Record<SharedWishlistItemEntity['id'], SharedWishlistItemEntity>
    | undefined,
  products: Record<ProductEntity['id'], ProductEntity> | undefined,
  brands: Record<Brand['id'], Brand> | undefined,
  categories: Record<CategoryEntity['id'], CategoryEntity> | undefined,
): SharedWishlistItemDenormalized | undefined => {
  const sharedWishlistItemEntity = sharedWishlistItems?.[sharedWishlistItemId];

  if (!sharedWishlistItemEntity) {
    return undefined;
  }

  const productEntity = products?.[sharedWishlistItemEntity?.product];
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

  const sharedWishlistItem: SharedWishlistItemDenormalized = {
    ...sharedWishlistItemEntity,
    product,
  };

  return sharedWishlistItem;
};
