import * as fromSharedWishlistReducer from './reducer';
import { createSelector } from 'reselect';
import { getEntity } from '../../entities/redux/selectors';

/**
 * Retrieves current user's shared wishlist id.
 *
 * @function
 * @memberof module:sharedWishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {string} Universal idenfier of the shared wishlist.
 *
 * @example
 * import { getSharedWishlistId } from '@farfetch/blackout-core/sharedWishlists/redux';
 *
 * const mapStateToProps = state => ({
 *    sharedWishlistId: getSharedWishlist(state)
 * });
 */
export const getSharedWishlistId = state =>
  fromSharedWishlistReducer.getResult(state.sharedWishlist);

/**
 * Retrieves the error state of the current user's shared wishlist.
 *
 * @function
 * @memberof module:sharedWishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object|undefined} Error information, `undefined` if there are no errors.
 *
 * @example
 * import { getSharedWishlistError } from '@farfetch/blackout-core/sharedWishlists/redux';
 *
 * const mapStateToProps = state => ({
 *    error: getSharedWishlistError(state)
 * });
 */
export const getSharedWishlistError = state =>
  fromSharedWishlistReducer.getError(state.sharedWishlist);

/**
 * Retrieves the loading status of the shared wishlist.
 *
 * @function
 * @memberof module:sharedWishlists/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status of the shared wishlist.
 *
 * @example
 * import { isSharedWishlistLoading } from '@farfetch/blackout-core/sharedWishlists/redux';
 *
 * const mapStateToProps = state => ({
 *    isLoading: isSharedWishlistLoading(state)
 * });
 */
export const isSharedWishlistLoading = state =>
  fromSharedWishlistReducer.getIsLoading(state.sharedWishlist);

/**
 * Retrieves a specific shared wishlist by its id, with all properties populated(ie,
 * the product).
 *
 * @function
 * @memberof module:sharedWishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {string} sharedWishlistId - Numeric identifier of the shared wishlist.
 *
 * @returns {object} - Shared wishlist entity for the given id.
 *
 * @example
 * import { getSharedWishlist } from '@farfetch/blackout-core/sharedWishlists/redux';
 *
 * const mapStateToProps = (state, { sharedWishlists: { id } }) => ({
 *    sharedWishlist: getSharedWishlist(state, id)
 * });
 */
export const getSharedWishlist = (state, sharedWishlistId) => {
  return getEntity(state, 'sharedWishlists', sharedWishlistId);
};

/**
 * Denormalizes a shared wishlist item.
 *
 * @function
 * @memberof module:sharedWishlists/selectors
 *
 * @param {number} sharedWishlistItemId - Shared wishlist item id.
 * @param {object} sharedWishlistItems - Shared wishlist item entities as obtained with getEntity(state, 'sharedWishlistItems').
 * @param {object} products - Product entities as obtained with getEntity(state, 'products').
 * @param {object} brands - Brand entities as obtained with getEntity(state, 'brands').
 * @param {object} categories  - Category entities as obtained with getEntity(state, 'categories').
 *
 * @returns {object} Shared wishlist item object containing product information.
 */
const denormalizeSharedWishlistItem = (
  sharedWishlistItemId,
  sharedWishlistItems,
  products,
  brands,
  categories,
) => {
  const sharedWishlistItemEntity = sharedWishlistItems[sharedWishlistItemId];

  if (!sharedWishlistItemEntity) {
    return undefined;
  }

  const productEntity = products[sharedWishlistItemEntity.product];
  const productBrand = productEntity.brand;
  const brand = productBrand ? brands[productBrand] : undefined;
  const productCategories =
    categories && productEntity.categories.map(id => categories[id]);

  const product = productEntity
    ? {
        ...productEntity,
        brand,
        categories: productCategories,
      }
    : undefined;

  const sharedWishlistItem = {
    ...sharedWishlistItemEntity,
    product,
  };

  return sharedWishlistItem;
};

/**
 * Retrieves a specific shared wishlist item by its id, with all properties
 * populated (ie, the product).
 *
 * @function
 * @memberof module:sharedWishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {number} sharedWishlistItemId - Numeric identifier of the shared wishlist item.
 *
 * @returns {object} - Shared wishlist item entity for the given id.
 *
 * @example
 * import { getSharedWishlistItem } from '@farfetch/blackout-core/sharedWishlists/redux';
 *
 * const mapStateToProps = (state, { sharedWishlistItem: { id } }) => ({
 *    sharedWishlistItem: getSharedWishlistItem(state, id)
 * });
 */
export const getSharedWishlistItem = createSelector(
  [
    (state, sharedWishlistItemId) => sharedWishlistItemId,
    state => getEntity(state, 'sharedWishlists'),
    state => getEntity(state, 'sharedWishlistsItems'),
    state => getEntity(state, 'products'),
    state => getEntity(state, 'brands'),
    state => getEntity(state, 'categories'),
  ],
  (
    sharedWishlistItemId,
    sharedWishlistsItems,
    products,
    brands,
    categories,
  ) => {
    return denormalizeSharedWishlistItem(
      sharedWishlistItemId,
      sharedWishlistsItems,
      products,
      brands,
      categories,
    );
  },
);

/**
 * Retrieves shared wishlist items for a specific wishlist.
 *
 * @function
 * @memberof module:sharedWishlists/selectors
 *
 * @param {object} state - Application state.
 * @param {number} sharedWishlistId - Numeric identifier of the shared wishlist.
 *
 * @returns {object} - Shared wishlist items entity for the given id.
 *
 * @example
 * import { getSharedWishlistItem } from '@farfetch/blackout-core/sharedWishlists/redux';
 *
 * const mapStateToProps = (state, { sharedWishlists: { id } }) => ({
 *    sharedWishlistItems: getSharedWishlistItems(state, id)
 * });
 */

export const getSharedWishlistItems = createSelector(
  [
    (_, sharedWishlistId) => sharedWishlistId,
    state => getEntity(state, 'sharedWishlists'),
    state => getEntity(state, 'sharedWishlistItems'),
    state => getEntity(state, 'products'),
    state => getEntity(state, 'brands'),
    state => getEntity(state, 'categories'),
  ],
  (
    sharedWishlistId,
    sharedWishlists,
    sharedWishlistItems,
    products,
    brands,
    categories,
  ) => {
    const sharedWishlistEntity = sharedWishlists[sharedWishlistId];

    if (!sharedWishlistEntity) {
      return undefined;
    }

    return sharedWishlistEntity.items.map(itemId =>
      denormalizeSharedWishlistItem(
        itemId,
        sharedWishlistItems,
        products,
        brands,
        categories,
      ),
    );
  },
);
