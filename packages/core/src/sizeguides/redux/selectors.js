/**
 * @module sizeGuides/selectors
 * @category SizeGuides
 * @subcategory Selectors
 */
import { getCategory } from '../../entities/redux/selectors';
import { getError, getIsLoading, getResult } from './reducer';
import { getSpecificSizeguide } from './utils';
import get from 'lodash/get';

/**
 * Returns the loading sizeguides condition.
 *
 * @function
 * @memberof module:sizeguides/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} If the sizeguides are loading or not.
 */
export const areSizeguidesLoading = state => getIsLoading(state.sizeguides);

/**
 * Returns the error sizeguide condition.
 *
 * @function
 * @memberof module:sizeguides/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} The sizeguides error.
 */
export const getSizeguidesError = state => getError(state.sizeguides);

/**
 * Retrieves the result of all sizeguides.
 *
 * @function
 * @memberof module:sizeguides/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} All sizeguides fetched.
 */
export const getAllSizeguides = state => getResult(state.sizeguides);

/**
 * Returns the most specific sizeguide for a given categories and brand id of a product.
 * Note that this only receives one brand id, although the action needs receiving an array of brandIds. In this selector, and in the case you use this in a PDP, there is only one brand because a product can't have multiple brands.
 *
 * @function
 * @memberof module:sizeguides/selectors
 *
 * @param {object} state - Application state.
 * @param {Array} categoriesIds - All categories to match with a specific sizeguide.
 * @param {number} brandId - The brand id to match with a specific sizeguide.
 *
 * @returns {object | undefined} The most specific sizeguide.
 */
export const getSizeguideByCategoriesAndBrand = (
  state,
  categoriesIds,
  brandId,
) => {
  const sizeguides = getAllSizeguides(state);

  if (!sizeguides) {
    return;
  }

  const categories = categoriesIds.map(categoryId =>
    getCategory(state, categoryId),
  );

  const specificSizeguide = getSpecificSizeguide(
    sizeguides,
    categories,
    brandId,
  );

  return get(specificSizeguide, 'maps');
};
