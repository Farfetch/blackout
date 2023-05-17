import * as selectors from '../outfits.js';
import {
  mockProductId,
  mockProductOutfits,
  mockProductsState,
} from 'tests/__fixtures__/products/index.mjs';

describe('Outfits', () => {
  describe('getProductOutfits()', () => {
    it('should get the outfits information', () => {
      expect(
        selectors.getProductOutfits(mockProductsState, mockProductId),
      ).toEqual(mockProductOutfits);
    });
  });

  describe('areProductOutfitsLoading()', () => {
    it('should get the outfits loading status of a given product', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          outfits: {
            ...mockProductsState.products.outfits,
            isLoading: {
              ...mockProductsState.products.outfits.isLoading,
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
        mockProductsState.products.outfits.error[mockProductId];

      expect(
        selectors.getProductOutfitsError(mockProductsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductOutfitsFetched()', () => {
    it('should get the outfits fetched status of a given product', () => {
      expect(
        selectors.areProductOutfitsFetched(mockProductsState, mockProductId),
      ).toBe(true);
    });
  });
});
