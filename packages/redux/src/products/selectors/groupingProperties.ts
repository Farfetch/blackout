import { getError, getIsLoading } from '../reducer/groupingProperties.js';
import type { ProductEntity } from '../../entities/types/index.js';
import type { ProductsState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

/**
 * Returns the loading grouping properties condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product grouping properties are loading or not.
 */
export const areProductGroupingPropertiesLoading = (
  state: StoreState,
  id: ProductEntity['id'],
  hash: string,
) =>
  getIsLoading((state.products as ProductsState).groupingProperties)[id]?.[
    hash
  ];

/**
 * Returns the fetched status of a specific product grouping properties.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If certain product grouping properties have been fetched or not.
 */
export const areProductGroupingPropertiesFetched = (
  state: StoreState,
  id: ProductEntity['id'],
  hash: string,
) =>
  getIsLoading((state.products as ProductsState).groupingProperties)?.[
    id
  ]?.hasOwnProperty(hash) &&
  areProductGroupingPropertiesLoading(state, id, hash) === false;

/**
 * Returns the error grouping properties condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The grouping properties error associated to a specific product.
 */
export const getProductGroupingPropertiesError = (
  state: StoreState,
  id: ProductEntity['id'],
  hash: string,
) => getError((state.products as ProductsState).groupingProperties)[id]?.[hash];

/**
 * Returns the grouping properties for a given product id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 * @param hash  - Hash built with query params.
 *
 * @returns The grouping properties for a given product id.
 */
export const getProductGroupingProperties = (
  state: StoreState,
  id: ProductEntity['id'],
  hash: string,
) =>
  (state.products as ProductsState).groupingProperties?.results?.[id]?.[hash];
