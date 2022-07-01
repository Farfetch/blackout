import { buildBagItem, generateBagItemHash } from '../../bags/utils';
import { createSelector } from 'reselect';
import {
  findProductInBag,
  getBagItems,
  getProductQuantityInBag,
} from '../../bags';
import { getError, getIsHydrated, getIsLoading } from '../reducer/details';
import { getProduct } from '../../entities/selectors';
import type { ProductEntity } from '../../entities/types';
import type { ProductsState } from '../types';
import type { SizeAdapted } from '../../helpers/adapters';
import type { StoreState } from '../../types';

/**
 * Returns the error given by product actions.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns Product details error.
 */
export const getProductError = (state: StoreState, id: ProductEntity['id']) =>
  getError((state.products as ProductsState).details)[id];

/**
 * Returns the hydrated condition from product details.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If a certain product is hydrated or not.
 */
export const isProductHydrated = (state: StoreState, id: ProductEntity['id']) =>
  getIsHydrated((state.products as ProductsState).details)[id];

/**
 * Returns the loading condition from product details.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If a certain product is loading or not.
 */
export const isProductLoading = (state: StoreState, id: ProductEntity['id']) =>
  getIsLoading((state.products as ProductsState).details)[id];

/**
 * Returns the fetched status of a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If a certain product has been fetched or not.
 */
export const isProductFetched = (state: StoreState, id: ProductEntity['id']) =>
  (getIsLoading((state.products as ProductsState).details).hasOwnProperty(id) ||
    getIsHydrated((state.products as ProductsState).details).hasOwnProperty(
      id,
    )) &&
  isProductLoading(state, id) === false;

/**
 * Returns if the product is duplicated or not.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If a certain product is duplicated or not.
 */
export const isProductDuplicated = (
  state: StoreState,
  id: ProductEntity['id'],
) => {
  const product = getProduct(state, id);

  return product?.isDuplicated;
};

/**
 * Returns all the info about breadcrumbs at PDP.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns Breadcrumbs info.
 */
export const getProductBreadcrumbs = (
  state: StoreState,
  id: ProductEntity['id'],
) => {
  const product = getProduct(state, id);

  return product?.breadCrumbs;
};

/**
 * Function responsible for checking the remaining available quantity of a product
 * of a given size, based on its quantity in the bag.
 *
 * To use this selector you should be using products and bag reducers at the same
 * time.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 * @param sizeId    - Numeric identifier of the size.
 *
 * @returns Difference between the total quantity of product size and the respective bag quantity.
 */
export const getProductSizeRemainingQuantity = (
  state: StoreState,
  productId: ProductEntity['id'],
  sizeId: SizeAdapted['id'],
): number => {
  const product = getProduct(state, productId);
  const size = product?.sizes?.find(({ id }) => id === sizeId) as SizeAdapted;
  const stockAvailable = size?.globalQuantity ?? 0;
  const bagItem = product && findProductInBag(state, { product, size });

  if (bagItem) {
    const itemWholeQuantity = getProductQuantityInBag(state, productId, sizeId);

    return stockAvailable - itemWholeQuantity;
  }

  return stockAvailable;
};

/**
 * Function responsible for checking the remaining available quantity for each size
 * of the provided product, based on its quantity in the bag.
 *
 * To use this selector you should be using products and bag reducers at the same
 * time.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns Product sizes array with updated quantity, as the difference between the total quantity of
 * product size and the respective bag quantity.
 */
export const getAllProductSizesRemainingQuantity = createSelector(
  [
    (state: StoreState, productId: ProductEntity['id']) =>
      getProduct(state, productId),
    getBagItems,
  ],
  (product, bagItems): ProductEntity['sizes'] => {
    return (
      product?.sizes?.map(
        ({ globalQuantity, isOutOfStock, id: sizeId, ...props }) => {
          // Get product size remaining quantity
          const size = product?.sizes?.find(({ id }) => id === sizeId);
          let stockAvailable = size?.globalQuantity ?? 0;
          const bagItemData = size && buildBagItem({ product, size });
          const hash = bagItemData && generateBagItemHash(bagItemData);
          const bagItem = bagItems?.find(
            item => generateBagItemHash(item) === hash,
          );

          if (bagItem) {
            // Get product quantity in bag
            const itemWholeQuantity =
              bagItems?.reduce((acc, item) => {
                if (
                  item.product?.id === product.id &&
                  item.size.id === sizeId
                ) {
                  return acc + item.quantity;
                }

                return acc;
              }, 0) || 0;

            stockAvailable = stockAvailable - itemWholeQuantity;
          }

          return {
            ...props,
            id: sizeId,
            globalQuantity: stockAvailable,
            isOutOfStock: stockAvailable === 0,
          };
        },
      ) || []
    );
  },
);

/**
 * Returns all the info about color grouping for the given product id. This
 * selector should be used on listing pages to get the grouped entries. This
 * information comes from the listing endpoint and is attached to the products
 * entity by product id.
 *
 * @example
 * ```
 * import { getListingGroupedEntries } from '@farfetch/blackout-redux';
 *
 * const mapStateToProps = state => ({
 *     groupedEntries: getListingGroupedEntries(state, productId)
 * });
 *
 * ```
 * @example
 * ```
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
 * };
 *
 * ```
 *
 * @param state     - Application state.
 * @param productId - Product identifier.
 *
 * @returns Color grouping object.
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
