/**
 * @module sizeGuides/utils
 * @category sizeGuides
 * @subcategory Utils
 */
import findIndex from 'lodash/findIndex';

/**
 * Among the sizeguides received, find the most specific/accurate to the given categories and brand.
 *
 * @function
 * @memberof module:sizeGuides/utils
 *
 * @param {Array} sizeguides - All sizeguides to find the most specific.
 * @param {Array} categories - All categories to match with a specific sizeguide.
 * @param {number} brandId - The brand id to match with a specific sizeguide.
 *
 * @returns {object} - The most specific sizeguide.
 */
export const getSpecificSizeguide = (sizeguides, categories, brandId) => {
  let categoryIdDeep0;
  let categoryIdDeep1;
  let index;

  categories.forEach(category => {
    if (category.parentId === 0) {
      categoryIdDeep0 = category.id;
    }

    if (category.parentId === categoryIdDeep0) {
      categoryIdDeep1 = category.id;
    }
  });

  index = categoryIdDeep1
    ? findIndex(sizeguides, { categoryId: categoryIdDeep1, brandId })
    : -1;

  // Search from specific to generic sizeGuide
  if (index === -1) {
    index = findIndex(sizeguides, { categoryId: categoryIdDeep0, brandId });

    if (index === -1) {
      index = categoryIdDeep1
        ? findIndex(sizeguides, {
            categoryId: categoryIdDeep1,
          })
        : -1;

      if (index === -1) {
        index = findIndex(sizeguides, {
          categoryId: categoryIdDeep0,
        });
      }
    }
  }

  return sizeguides[index];
};
