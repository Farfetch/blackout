import * as selectors from '..';
import {
  mockDetailsState,
  mockOutfits,
  mockProductId,
} from 'tests/__fixtures__/products';

describe('Outfits', () => {
  describe('getProductOutfits()', () => {
    it('should get the outfits', () => {
      expect(
        selectors.getProductOutfits(mockDetailsState, mockProductId),
      ).toEqual(mockOutfits);
    });
  });

  describe('areProductOutfitsLoading()', () => {
    it('should get the outfits loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          outfits: {
            ...mockDetailsState.details.outfits,
            isLoading: {
              ...mockDetailsState.details.outfits.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductOutfitsLoading(changedMockState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductOutfitsError()', () => {
    it('should get the outfits error property of a given product', () => {
      const expectedResult =
        mockDetailsState.details.outfits.error[mockProductId];

      expect(
        selectors.getProductOutfitsError(mockDetailsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductOutfitsFetched()', () => {
    it('should get the outfits fetched status of a given product', () => {
      expect(
        selectors.areProductOutfitsFetched(mockDetailsState, mockProductId),
      ).toBe(true);
    });
  });
});
