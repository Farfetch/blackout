import { findSpecificSizeGuide } from './utils';
import { getCategory } from '../entities/selectors';
import { getError, getIsLoading, getResult } from './reducer';
import type { Brand, Category, SizeGuide } from '@farfetch/blackout-client';
import type { SizeGuidesState } from './types';
import type { StoreState } from '../types';

type GetSpecificSizeGuideParams = {
  // Brand ids to search for size guides.
  brandIds: Array<Brand['id']>;
  // Category ids to search for size guides.
  categoryIds: Array<Category['id']>;
};

/**
 * Returns the loading sizeGuides condition.
 *
 * @param state - Application state.
 *
 * @returns If the sizeGuides are loading or not.
 */
export const areSizeGuidesLoading = (state: StoreState) =>
  getIsLoading(state.sizeGuides as SizeGuidesState);

/**
 * Returns the error sizeGuide condition.
 *
 * @param state - Application state.
 *
 * @returns The sizeGuides error object or null if there's no error.
 */
export const getSizeGuidesError = (state: StoreState) =>
  getError(state.sizeGuides as SizeGuidesState);

/**
 * Retrieves the result of all sizeGuides.
 *
 * @param state - Application state.
 *
 * @returns All sizeGuides fetched or null if nothing fetched yet.
 */
export const getSizeGuides = (state: StoreState) =>
  getResult(state.sizeGuides as SizeGuidesState);

/**
 * Returns the most specific size guide for the given categories and brand id of a
 * product.
 *
 * @param state  - Application state.
 * @param params - Parameters to match with a specific size guide.
 *
 * @returns The most specific size guide.
 */
export const getSpecificSizeGuide = (
  state: StoreState,
  { brandIds, categoryIds }: GetSpecificSizeGuideParams,
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
