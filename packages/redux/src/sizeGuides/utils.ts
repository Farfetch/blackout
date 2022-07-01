import findIndex from 'lodash/findIndex';
import type { Brand, Category, SizeGuide } from '@farfetch/blackout-client';

type FindSpecificSizeGuideParams = {
  // All size guides to find the most specific.
  sizeGuides?: SizeGuide[];
  // All categories to match with a specific size guide.
  categories: Array<Category | undefined>;
  // The brand id to match with a specific size guide.
  brandId?: Brand['id'];
};

/**
 * Among the size guides received, find the most specific/accurate to the given
 * categories and brand.
 *
 * @param params - Parameters to find the specific size guide.
 *
 * @returns - The most specific size guide or undefined if there are no size guides.
 */
export const findSpecificSizeGuide = ({
  sizeGuides,
  categories,
  brandId,
}: FindSpecificSizeGuideParams): SizeGuide | undefined => {
  if (!sizeGuides) {
    return;
  }

  let categoryIdDeep0: number | undefined;
  let categoryIdDeep1: number | undefined;
  let index: number;

  categories.forEach(category => {
    if (category?.parentId === 0) {
      categoryIdDeep0 = category?.id;
    }

    if (category?.parentId === categoryIdDeep0) {
      categoryIdDeep1 = category?.id;
    }
  });

  index = categoryIdDeep1
    ? findIndex(sizeGuides, { categoryId: categoryIdDeep1, brandId })
    : -1;

  // Search from specific to generic sizeGuide
  if (index === -1) {
    index = findIndex(sizeGuides, { categoryId: categoryIdDeep0, brandId });

    if (index === -1) {
      index = categoryIdDeep1
        ? findIndex(sizeGuides, {
            categoryId: categoryIdDeep1,
          })
        : -1;

      if (index === -1) {
        index = findIndex(sizeGuides, {
          categoryId: categoryIdDeep0,
        });
      }
    }
  }

  return sizeGuides[index];
};
