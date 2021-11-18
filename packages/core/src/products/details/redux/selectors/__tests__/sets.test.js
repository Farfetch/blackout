import * as selectors from '..';
import {
  mockDetailsState,
  mockProductId,
  mockSetId,
} from 'tests/__fixtures__/products';

describe('Sets', () => {
  describe('isSetLoading()', () => {
    it('should get the set loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          sets: {
            ...mockDetailsState.details.sets,
            isLoading: {
              ...mockDetailsState.details.sets.isLoading,
              [mockSetId]: true,
            },
          },
        },
      };

      expect(selectors.isSetLoading(changedMockState, mockSetId)).toBe(true);
    });
  });

  describe('isSetFetched()', () => {
    it('should get the set fetched status of a given product', () => {
      expect(selectors.isSetFetched(mockDetailsState, mockSetId)).toBe(true);
    });
  });

  describe('getSetError()', () => {
    it('should get the set error property of a given product', () => {
      const expectedResult = mockDetailsState.details.sets.error[mockSetId];

      expect(selectors.getSetError(mockDetailsState, mockSetId)).toEqual(
        expectedResult,
      );
    });
  });

  describe('getProductRelatedSetsIdsByType()', () => {
    it('should get the related sets of a specific type', () => {
      const mockProductType = 3;
      expect(
        selectors.getProductRelatedSetsIdsByType(
          mockDetailsState,
          mockProductId,
          mockProductType,
        ),
      ).toEqual([mockSetId]);
    });

    it('should return an empty array if there are no related sets of the given type', () => {
      const mockProductType = 1;
      expect(
        selectors.getProductRelatedSetsIdsByType(
          mockDetailsState,
          mockProductId,
          mockProductType,
        ),
      ).toEqual([]);
    });
  });
});
