import * as selectors from '..';
import { mockDetailsState, mockSetId } from 'tests/__fixtures__/products';

describe('Recommended sets', () => {
  describe('isRecommendedSetWithOutOfStockLoading()', () => {
    it('should get a specific recommended set with out of stock loading status', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          recommendedSetsWithOutOfStock: {
            ...mockDetailsState.details.recommendedSetsWithOutOfStock,
            isLoading: {
              ...mockDetailsState.details.recommendedSetsWithOutOfStock
                .isLoading,
              [mockSetId]: true,
            },
          },
        },
      };

      expect(
        selectors.isRecommendedSetWithOutOfStockLoading(
          changedMockState,
          mockSetId,
        ),
      ).toBe(true);
    });
  });

  describe('isRecommendedSetWithOutOfStockFetched()', () => {
    it('should get a specific recommended set with out of stock fetch status', () => {
      expect(
        selectors.isRecommendedSetWithOutOfStockFetched(
          mockDetailsState,
          mockSetId,
        ),
      ).toBe(true);
    });
  });

  describe('getRecommendedSetWithOutOfStockError()', () => {
    it('should get a specific recommended set with out of stock error', () => {
      const expectedResult =
        mockDetailsState.details.recommendedSetsWithOutOfStock.error[mockSetId];

      expect(
        selectors.getRecommendedSetWithOutOfStockError(
          mockDetailsState,
          mockSetId,
        ),
      ).toEqual(expectedResult);
    });
  });
});
