import { mockProductId } from './ids.fixtures.mjs';

export const mockRecommendedSetId = 202382;

export const mockRecommendedSet = {
  id: mockRecommendedSetId,
  platformSetId: 9999,
  name: 'cool recommended set',
  slug: 'cool-recommended-set',
  products: [mockProductId],
};

export const mockRecommendedSetState = {
  recommendedSets: {
    isLoading: {
      [mockRecommendedSetId]: false,
    },
    error: {
      [mockRecommendedSetId]: null,
    },
    result: {
      [mockRecommendedSetId]: mockRecommendedSet,
    },
  },
};
