import { createSelector } from 'reselect';
import { getBrands } from '../../brands';
import { getCategories } from '../../categories';
import { getEntityById } from '../../entities/selectors/entity';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import type {
  ProductEntity,
  ProductEntityDenormalized,
} from '../../entities/types';
import type { StoreState } from '../../types';

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
    categories && product.categories?.map(id => categories[id]);

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
export const getProductPromotions = createSelector(
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
export const getProductLabelsByPriority = createSelector(
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
