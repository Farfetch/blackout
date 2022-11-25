import * as selectors from '../recommendedSet';
import {
  mockProductsState,
  mockRecommendedSet,
  mockRecommendedSetId,
} from 'tests/__fixtures__/products';

describe('Recommended set', () => {
  describe('isRecommendedSetLoading()', () => {
    it('should get a specific recommended set loading status', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          recommendedSets: {
            ...mockProductsState.products.sizes,
            isLoading: {
              ...mockProductsState.products.sizes.isLoading,
              [mockRecommendedSetId]: true,
            },
            result: {},
          },
        },
      };

      expect(
        selectors.isRecommendedSetLoading(
          changedMockState,
          mockRecommendedSetId,
        ),
      ).toBe(true);
    });
  });

  describe('isRecommendedSetFetched()', () => {
    it('should get a specific recommended set fetch status', () => {
      expect(
        selectors.isRecommendedSetFetched(
          mockProductsState,
          mockRecommendedSetId,
        ),
      ).toBe(true);
    });
  });

  describe('getRecommendedSetError()', () => {
    it('should get a specific recommended set error', () => {
      const expectedResult =
        mockProductsState.products.recommendedSets.error[mockRecommendedSetId];

      expect(
        selectors.getRecommendedSetError(
          mockProductsState,
          mockRecommendedSetId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getRecommendedSet()', () => {
    it('should get a specific recommended set error', () => {
      expect(
        selectors.getRecommendedSet(mockProductsState, mockRecommendedSetId),
      ).toEqual(mockRecommendedSet);
    });
  });
});
