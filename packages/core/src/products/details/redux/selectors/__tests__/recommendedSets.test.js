import * as selectors from '..';
import {
  mockDetailsState,
  mockProduct,
  mockProductId,
  mockSetId,
} from 'tests/__fixtures__/products';

describe('Recommended sets', () => {
  describe('isRecommendedSetLoading()', () => {
    it('should get the recommended set loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          recommendedSets: {
            ...mockDetailsState.details.recommendedSets,
            isLoading: {
              ...mockDetailsState.details.recommendedSets.isLoading,
              [mockSetId]: true,
            },
          },
        },
      };

      expect(
        selectors.isRecommendedSetLoading(changedMockState, mockSetId),
      ).toBe(true);
    });
  });

  describe('getRecommendedSetError()', () => {
    it('should get the recommended set error property of a given product', () => {
      const expectedResult =
        mockDetailsState.details.recommendedSets.error[mockSetId];

      expect(
        selectors.getRecommendedSetError(mockDetailsState, mockSetId),
      ).toEqual(expectedResult);
    });
  });

  describe('isRecommendedSetFetched()', () => {
    it('should get the recommended set fetched status of a given product', () => {
      expect(
        selectors.isRecommendedSetFetched(mockDetailsState, mockSetId),
      ).toBe(true);
    });
  });

  describe('getProductRecommendedSetId()', () => {
    it('Should return undefined if there are no recommended set associated', () => {
      expect(
        selectors.getProductRecommendedSetId(
          {
            entities: {
              products: {
                [mockProductId]: {
                  ...mockProduct,
                  recommendedSet: 0,
                },
              },
            },
          },
          mockProductId,
        ),
      ).toBeUndefined();
    });

    it('Should return the recommended set ID of the product', () => {
      expect(
        selectors.getProductRecommendedSetId(mockDetailsState, mockProductId),
      ).toEqual(mockSetId);
    });
  });
});
