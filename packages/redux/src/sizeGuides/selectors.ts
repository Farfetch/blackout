/**
 * @module sizeGuides/selectors
 * @category SizeGuides
 * @subcategory Selectors
 */
import { findSpecificSizeGuide } from './utils';
import { getCategory } from '../entities/selectors';
import { getError, getIsLoading, getResult } from './reducer';
import type { Brand } from '@farfetch/blackout-client/brands/types';
import type { Category } from '@farfetch/blackout-client/categories/types';
import type { Error } from '@farfetch/blackout-client/types';
import type { SizeGuide } from '@farfetch/blackout-client/sizeGuides/types';
import type { StoreState } from '../types';

/**
 * Returns the loading sizeGuides condition.
 *
 * @function
 * @memberof module:sizeGuides/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} If the sizeGuides are loading or not.
 */
export const areSizeGuidesLoading = (state: StoreState): boolean =>
  getIsLoading(state.sizeGuides);

/**
 * Returns the error sizeGuide condition.
 *
 * @function
 * @memberof module:sizeGuides/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object | null} The sizeGuides error object or null if there's no error.
 */
export const getSizeGuidesError = (state: StoreState): Error | null =>
  getError(state.sizeGuides);

/**
 * Retrieves the result of all sizeGuides.
 *
 * @function
 * @memberof module:sizeGuides/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {Array | null} All sizeGuides fetched or null if nothing fetched yet.
 */
export const getSizeGuides = (state: StoreState): SizeGuide[] | null =>
  getResult(state.sizeGuides);

/**
 * Returns the most specific size guide for the given categories and brand id
 * of a product.
 *
 * @function
 * @memberof module:sizeGuides/selectors
 *
 * @param {object} state - Application state.
 * @param {object} params - Parameters to match with a specific size guide.
 * @param {Array} params.brandIds - Brand ids to search for size guides.
 * @param {Array} params.categoryIds - Category ids to search for size guides.
 *
 * @returns {Array | undefined} The most specific size guide.
 */
export const getSpecificSizeGuide = (
  state: StoreState,
  {
    brandIds,
    categoryIds,
  }: { brandIds: Array<Brand['id']>; categoryIds: Array<Category['id']> },
): SizeGuide['maps'] | undefined => {
  const sizeGuides = getSizeGuides(state);

  if (!sizeGuides) {
    return;
  }

  const categories = categoryIds.map((categoryId: number) =>
    getCategory(state, categoryId),
  );

  const specificSizeGuide = findSpecificSizeGuide({
    sizeGuides,
    categories,
    // Note that this only needs one brand id - in the case you use this in a PDP,
    // there is only one brand because a product can't have multiple brands.
    brandId: brandIds[0],
  });

  return specificSizeGuide?.maps;
};
