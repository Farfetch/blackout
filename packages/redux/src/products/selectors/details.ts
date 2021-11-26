import { createSelector } from 'reselect';
import { findProductInBag, getProductQuantityInBag } from '../../bags';
import { getError, getIsHydrated, getIsLoading } from '../reducer/details';
import { getProduct } from '../../entities/selectors';
import type { Error } from '@farfetch/blackout-client/types';
import type { ProductEntity } from '../../entities/types';
import type { SizeAdapted } from '@farfetch/blackout-client/helpers/adapters/types';
import type { StoreState } from '../../types';

/**
 * Returns the error given by product actions.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} Product details error.
 */
export const getProductError = (
  state: StoreState,
  id: ProductEntity['id'],
): Error | undefined => getError(state.products.details)[id];

/**
 * Returns the hydrated condition from product details.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If a certain product is hydrated or not.
 */
export const isProductHydrated = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined => getIsHydrated(state.products.details)[id];

/**
 * Returns the loading condition from product details.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If a certain product is loading or not.
 */
export const isProductLoading = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined => getIsLoading(state.products.details)[id];

/**
 * Returns the fetched status of a specific product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If a certain product has been fetched or not.
 */
export const isProductFetched = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined =>
  (getIsLoading(state.products.details).hasOwnProperty(id) ||
    getIsHydrated(state.products.details).hasOwnProperty(id)) &&
  isProductLoading(state, id) === false;

/**
 * Returns if the product is duplicated or not.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean|undefined} If a certain product is duplicated or not.
 */
export const isProductDuplicated = (
  state: StoreState,
  id: ProductEntity['id'],
): ProductEntity['isDuplicated'] | undefined => {
  const product = getProduct(state, id);

  return product?.isDuplicated;
};

/**
 * Returns all the info about breadcrumbs at PDP.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object|undefined} Breadcrumbs info.
 */
export const getProductBreadcrumbs = (
  state: StoreState,
  id: ProductEntity['id'],
): ProductEntity['breadCrumbs'] | undefined => {
  const product = getProduct(state, id);

  return product?.breadCrumbs;
};

/**
 * Creates a function responsible for checking the remaining available quantity
 * of a product of a given size, based on its quantity in the bag.
 * This creator should only be used in cases/projects you have the need
 * to have product details and bag logics/reducer at the same time.
 *
 * @memberof module:products/selectors
 
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 * @param {number} sizeId - Numeric identifier of the size.
 *
 * @returns {Function} Function that returns a Number,
 * which is the difference between the total quantity of product size and the
 * respective bag quantity.
 *
 */
export const getProductSizeRemainingQuantity = (
  state: StoreState,
  productId: ProductEntity['id'],
  sizeId: SizeAdapted['id'],
): number => {
  const product = getProduct(state, productId) as ProductEntity;
  const size = product?.sizes?.find(({ id }) => id === sizeId) as SizeAdapted;
  const stockAvailable = size?.globalQuantity ?? 0;
  const bagItem = findProductInBag(state, { product, size });

  if (bagItem) {
    const itemWholeQuantity = getProductQuantityInBag(state, productId, sizeId);

    return stockAvailable - itemWholeQuantity;
  }

  return stockAvailable;
};

/**
 * Returns all the info about color grouping for the given product id.
 * This selector should be used on listing pages to get the grouped entries.
 * This information comes from the listing endpoint and is attached to the
 * products entity by product id.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Product identifier.
 *
 * @returns {object|undefined} Color grouping object.
 *
 * @example
 * import { getListingGroupedEntries } from '@farfetch/blackout-redux/products';
 *
 * const mapStateToProps = state => ({
 *     groupedEntries: getListingGroupedEntries(state, productId)
 * });
 *
 * @example
 * // Result of color grouping
 * {
 *  totalItems: 20, // Total colors available
 *  remaining: 15, // Number of remaining colors available
 *  entries: [ // Info about the available colors
 *      {
 *          productId: 12912485,
 *          merchantId: 9359,
 *          shortDescription: 'Cotton Patchwork Trousers',
 *          images: [
 *              {
 *                  order: 1,
 *                  size: '50',
 *                  url: 'image-1'
 *              }
 *          ]
 *      }
 *  ]
 *};
 *
 */
export const getProductGroupedEntries = createSelector(
  [
    (state: StoreState, productId: ProductEntity['id']) =>
      getProduct(state, productId),
  ],
  product => {
    const groupedEntries = product?.groupedEntries;

    if (!groupedEntries) return;

    return {
      totalItems: groupedEntries.totalItems,
      remaining: groupedEntries.totalItems - groupedEntries.entries.length,
      entries: groupedEntries.entries,
    };
  },
);
