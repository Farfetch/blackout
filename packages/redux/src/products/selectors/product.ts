import { createSelector } from 'reselect';
import { get, isEmpty, orderBy } from 'lodash-es';
import { getBrands } from '../../brands/index.js';
import { getCategories } from '../../categories/index.js';
import { getEntityById } from '../../entities/selectors/entity.js';
import type {
  CategoryEntity,
  ProductEntity,
  ProductEntityDenormalized,
} from '../../entities/types/index.js';
import type { Label, Promotion } from '@farfetch/blackout-client';
import type { StoreState } from '../../types/index.js';

/**
 * Returns a specific product by its id.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns Product normalized.
 */
export const getProduct = (state: StoreState, productId: ProductEntity['id']) =>
  getEntityById(state, 'products', productId);

/**
 * Returns a specific product denormalized by its id .
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns Product normalized.
 */
export const getProductDenormalized = (
  state: StoreState,
  productId: ProductEntity['id'],
) => {
  const product = getProduct(state, productId);

  if (!product) {
    return undefined;
  }

  const brands = getBrands(state);
  const categories = getCategories(state);
  const brand = brands?.[product.brand];
  const productCategories =
    categories &&
    (product.categories
      ?.map(id => categories[id])
      .filter(Boolean) as CategoryEntity[]);

  return {
    ...product,
    brand,
    categories: productCategories,
  } as ProductEntityDenormalized;
};

/**
 * Checks if a specific product is "one size" by its id.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns If a certain product is one size or not.
 */
export const isProductOneSize = (
  state: StoreState,
  productId: ProductEntity['id'],
) => {
  const sizes = get(getProduct(state, productId), 'sizes');

  return sizes && sizes.length > 0 ? sizes[0]?.isOneSize : false;
};

/**
 * Checks if a specific wishlist product is "out of stock" by its id.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns If a certain product is out of stock or not.
 */
export const isProductOutOfStock = (
  state: StoreState,
  productId: ProductEntity['id'],
) => {
  const sizes = get(getProduct(state, productId), 'sizes');

  return (
    isEmpty(sizes) ||
    (isProductOneSize(state, productId) && sizes?.[0]?.isOutOfStock) ||
    !sizes?.find((size: { globalQuantity: number }) => size.globalQuantity > 0)
  );
};

/**
 * Returns the list of promotions for a product given its id.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns List of product promotions for the given ID.
 */
export const getProductPromotions: (
  state: StoreState,
  productId: ProductEntity['id'],
) => Promotion[] = createSelector(
  [
    (state: StoreState, productId: ProductEntity['id']) =>
      getProduct(state, productId),
  ],
  product => product?.promotions || [],
);

/**
 * Gets all labels of a given product, sorted by the given priority order.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 * @param sortOrder - Sorting order; can be 'asc' or 'desc'.
 *
 * @returns Labels sorted by the given order.
 */
export const getProductLabelsByPriority: (
  state: StoreState,
  productId: ProductEntity['id'],
  sortOrder?: 'asc' | 'desc',
) => Label[] = createSelector(
  [
    (state: StoreState, productId: ProductEntity['id']) =>
      getProduct(state, productId),
    (
      state: StoreState,
      productId: ProductEntity['id'],
      sortOrder: 'asc' | 'desc' = 'asc',
    ) => sortOrder,
  ],
  (product, sortOrder) => {
    const labels = product?.labels;

    return orderBy(labels, 'priority', sortOrder);
  },
);
