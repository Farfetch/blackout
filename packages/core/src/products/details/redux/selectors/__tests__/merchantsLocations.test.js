import * as selectors from '..';
import {
  mockDetailsState,
  mockMerchantsLocations,
  mockProductId,
  mockVariantId,
} from 'tests/__fixtures__/products';

describe('Merchants Locations', () => {
  describe('getProductMerchantsLocations()', () => {
    it('should get the merchants locations', () => {
      expect(
        selectors.getProductMerchantsLocations(
          mockDetailsState,
          mockProductId,
          mockVariantId,
        ),
      ).toEqual(mockMerchantsLocations);
    });

    it('should not get the merchants locations if product without variant', () => {
      const state = {
        ...mockDetailsState,
        entities: {
          ...mockDetailsState.entities,
          products: {
            [mockProductId]: {
              ...mockDetailsState.entities.products[mockProductId],
              variants: null,
            },
          },
        },
      };
      expect(
        selectors.getProductMerchantsLocations(
          state,
          mockProductId,
          mockVariantId,
        ),
      ).toBeUndefined();
    });
  });

  describe('areProductMerchantsLocationsLoading()', () => {
    it('should get the merchants locations loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          merchantsLocations: {
            ...mockDetailsState.details.merchantsLocations,
            isLoading: {
              ...mockDetailsState.details.merchantsLocations.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductMerchantsLocationsLoading(
          changedMockState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });

  describe('getProductMerchantsLocationsError()', () => {
    it('should get the merchants locations error property of a given product', () => {
      const expectedResult =
        mockDetailsState.details.merchantsLocations.error[mockProductId];

      expect(
        selectors.getProductMerchantsLocationsError(
          mockDetailsState,
          mockProductId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductMerchantsLocationsFetched()', () => {
    it('should get the merchants locations fetched status of a given product', () => {
      expect(
        selectors.areProductMerchantsLocationsFetched(
          mockDetailsState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });
});
