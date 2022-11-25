import * as selectors from '../variantsByMerchantsLocations';
import {
  mockProductId,
  mockProductsState,
  mockProductVariantsMerchantsLocations,
  mockVariantId,
} from 'tests/__fixtures__/products';

describe('Merchants Locations', () => {
  describe('getProductVariantsByMerchantsLocations()', () => {
    it('should get the merchants locations', () => {
      expect(
        selectors.getProductVariantsByMerchantsLocations(
          mockProductsState,
          mockProductId,
          mockVariantId,
        ),
      ).toEqual(mockProductVariantsMerchantsLocations);
    });

    it('should not get the merchants locations if product without variant', () => {
      const state = {
        ...mockProductsState,
        entities: {
          ...mockProductsState.entities,
          products: {
            [mockProductId]: {
              ...mockProductsState.entities.products[mockProductId],
              variants: undefined,
            },
          },
        },
      };
      expect(
        selectors.getProductVariantsByMerchantsLocations(
          state,
          mockProductId,
          mockVariantId,
        ),
      ).toBeUndefined();
    });
  });

  describe('areProductVariantsByMerchantsLocationsLoading()', () => {
    it('should get the merchants locations loading status of a given product', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          variantsByMerchantsLocations: {
            ...mockProductsState.products.variantsByMerchantsLocations,
            isLoading: {
              ...mockProductsState.products.variantsByMerchantsLocations
                .isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductVariantsByMerchantsLocationsLoading(
          changedMockState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });

  describe('getProductVariantsByMerchantsLocationsError()', () => {
    it('should get the merchants locations error property of a given product', () => {
      const expectedResult =
        mockProductsState.products.variantsByMerchantsLocations.error[
          mockProductId
        ];

      expect(
        selectors.getProductVariantsByMerchantsLocationsError(
          mockProductsState,
          mockProductId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductVariantsByMerchantsLocationsFetched()', () => {
    it('should get the merchants locations fetched status of a given product', () => {
      expect(
        selectors.areProductVariantsByMerchantsLocationsFetched(
          mockProductsState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });
});
