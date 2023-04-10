import * as selectors from '../recommendedProductSet.js';
import {
  mockProductsState,
  mockRecommendedProductSet,
  mockRecommendedProductSetId,
} from 'tests/__fixtures__/products/index.mjs';

describe('Recommended product set', () => {
  describe('isRecommendedProductSetLoading()', () => {
    it('should get a specific recommended product set loading status', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          recommendedProductSets: {
            ...mockProductsState.products.sizes,
            isLoading: {
              ...mockProductsState.products.sizes.isLoading,
              [mockRecommendedProductSetId]: true,
            },
            result: {},
          },
        },
      };

      expect(
        selectors.isRecommendedProductSetLoading(
          changedMockState,
          mockRecommendedProductSetId,
        ),
      ).toBe(true);
    });
  });

  describe('isRecommendedProductSetFetched()', () => {
    it('should get a specific recommended product set fetch status', () => {
      expect(
        selectors.isRecommendedProductSetFetched(
          mockProductsState,
          mockRecommendedProductSetId,
        ),
      ).toBe(true);
    });
  });

  describe('getRecommendedProductSetError()', () => {
    it('should get a specific recommended product set error', () => {
      const expectedResult =
        mockProductsState.products.recommendedProductSets.error[
          mockRecommendedProductSetId
        ];

      expect(
        selectors.getRecommendedProductSetError(
          mockProductsState,
          mockRecommendedProductSetId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getRecommendedProductSet()', () => {
    it('should get a specific recommended product set error', () => {
      expect(
        selectors.getRecommendedProductSet(
          mockProductsState,
          mockRecommendedProductSetId,
        ),
      ).toEqual(mockRecommendedProductSet);
    });
  });
});
