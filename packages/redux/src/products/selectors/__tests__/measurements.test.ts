import * as selectors from '../measurements.js';
import {
  mockProductId,
  mockProductsState,
  mockProductVariantsMeasurements,
} from 'tests/__fixtures__/products/index.mjs';

describe('Measurements', () => {
  describe('getProductMeasurements()', () => {
    it('should get the measurements', () => {
      expect(
        selectors.getProductMeasurements(mockProductsState, mockProductId),
      ).toEqual(mockProductVariantsMeasurements);
    });
  });

  describe('areProductMeasurementsLoading()', () => {
    it('should get the measurements loading status of a given product', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          measurements: {
            ...mockProductsState.products.measurements,
            isLoading: {
              ...mockProductsState.products.measurements.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductMeasurementsLoading(
          changedMockState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });

  describe('getProductMeasurementsError()', () => {
    it('should get the measurements error property of a given product', () => {
      const expectedResult =
        mockProductsState.products.measurements.error[mockProductId];

      expect(
        selectors.getProductMeasurementsError(mockProductsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductMeasurementsFetched()', () => {
    it('should get the measurements fetched status of a given product', () => {
      expect(
        selectors.areProductMeasurementsFetched(
          mockProductsState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });
});
