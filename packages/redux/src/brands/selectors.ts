import { createSelector } from 'reselect';
import { generateBrandsHash } from './index.js';
import { getEntities, getEntityById } from '../entities/selectors/index.js';
import { getError, getIsLoading, getResult } from './reducer.js';
import type { Brand, Brands, GetBrandsQuery } from '@farfetch/blackout-client';
import type { BrandsState } from './types/index.js';
import type { StoreState } from '../types/index.js';

/**
 * Returns error for one brand - fetchBrand request.
 *
 * @param state - Application state.
 * @param id    - Brand identifier.
 *
 * @returns Brand error.
 */
export const getBrandError = (state: StoreState, id: Brand['id']) =>
  getError(state.brands as BrandsState)?.[id];

/**
 * Returns the error for brands - fetchBrands request.
 *
 * @param state - Application state.
 * @param query - Get brands request query.
 *
 * @returns Brands error.
 */
export const getBrandsError = (state: StoreState, query?: GetBrandsQuery) => {
  const hash = generateBrandsHash(query);

  return hash ? getError(state.brands as BrandsState)[hash] : undefined;
};

/**
 * Returns the loading status for one brand - fetchBrand request.
 *
 * @param state - Application state.
 * @param id    - Brand identifier.
 *
 * @returns Loading status corresponding to a fetchBrand request.
 */
export const isBrandLoading = (state: StoreState, id: Brand['id']) =>
  getIsLoading(state.brands as BrandsState)?.[id];

/**
 * Returns the loading status for brands - fetchBrands request.
 *
 * @param state - Application state.
 * @param query - Get brands request query.
 *
 * @returns Loading status corresponding to a fetchBrands request.
 */
export const areBrandsLoading = (state: StoreState, query?: GetBrandsQuery) => {
  const hash = generateBrandsHash(query);

  return hash ? getIsLoading(state.brands as BrandsState)?.[hash] : undefined;
};

/**
 * Returns all brands from state.
 *
 * @param state - Application state.
 *
 * @returns Object with key values pairs representing brandId and brand properties.
 */
export const getBrands = (state: StoreState) => getEntities(state, 'brands');

/**
 * Returns a specific brand by its id.
 *
 * @param state   - Application state.
 * @param brandId - Brand id.
 *
 * @returns Brand normalized.
 */
export const getBrand = (state: StoreState, brandId: Brand['id']) =>
  getEntityById(state, 'brands', brandId);

/**
 * Returns the brands result descendant from the `fetchBrands` request.
 *
 * @param state - Application state.
 * @param query - Get brands request query.
 *
 * @returns Brands result with pagination.
 */
export const getBrandsResult: (
  state: StoreState,
  query?: GetBrandsQuery,
) => Brands | undefined = createSelector(
  [
    (state: StoreState, query?: GetBrandsQuery) => generateBrandsHash(query),
    (state: StoreState) => getResult(state.brands as BrandsState),
    getBrands,
  ],
  (hash, brandsResult, brands) => {
    const result = hash && brandsResult[hash];

    if (!result) {
      return;
    }

    return {
      ...result,
      entries: result.entries
        .map((id: number) => brands?.[id])
        .filter(Boolean) as Brand[],
    };
  },
);

/**
 * Retrieves if a brands result is cached by its hash.
 *
 * @param state - Application state.
 * @param query - Get brands request query.
 *
 * @returns Whether the brands result is cached or not.
 */
export const isBrandsResultCached = (
  state: StoreState,
  query?: GetBrandsQuery,
) => {
  const hash = generateBrandsHash(query);

  return hash ? !!getResult(state.brands as BrandsState)[hash] : false;
};

/**
 * Retrieves if a brand is fetched.
 *
 * @param state - Application state.
 * @param id    - Brand identifier.
 *
 * @returns Whether the brand is fetched or not.
 */
export const isBrandFetched = (state: StoreState, id: Brand['id']) => {
  return (
    (!!getBrand(state, id) || !!getBrandError(state, id)) &&
    !isBrandLoading(state, id)
  );
};
/**
 * Retrieves if the brands result are fetched by its hash.
 *
 * @param state - Application state.
 * @param query - Get brands request query.
 *
 * @returns Whether the brands result is cached or not.
 */
export const areBrandsFetched = (state: StoreState, query?: GetBrandsQuery) => {
  return (
    (!!getBrandsResult(state, query) || !!getBrandsError(state, query)) &&
    !areBrandsLoading(state, query)
  );
};
