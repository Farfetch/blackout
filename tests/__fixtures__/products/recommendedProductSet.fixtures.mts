import { mockProductId } from './ids.fixtures.mjs';

export const mockRecommendedProductSetId = 202382;

export const mockRecommendedProductSet = {
  id: mockRecommendedProductSetId,
  platformSetId: 9999,
  name: 'cool recommended set',
  slug: 'cool-recommended-set',
  products: [mockProductId],
};

export const mockRecommendedProductSetState = {
  recommendedProductSets: {
    isLoading: {
      [mockRecommendedProductSetId]: false,
    },
    error: {
      [mockRecommendedProductSetId]: null,
    },
    result: {
      [mockRecommendedProductSetId]: mockRecommendedProductSet,
    },
  },
};
