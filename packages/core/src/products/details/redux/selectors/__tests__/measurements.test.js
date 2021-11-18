import * as selectors from '..';
import {
  mockDetailsState,
  mockMeasurements,
  mockProductId,
} from 'tests/__fixtures__/products';

describe('Measurements', () => {
  describe('getProductMeasurements()', () => {
    it('should get the measurements', () => {
      expect(
        selectors.getProductMeasurements(mockDetailsState, mockProductId),
      ).toEqual(mockMeasurements);
    });
  });

  describe('areProductMeasurementsLoading()', () => {
    it('should get the measurements loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          measurements: {
            ...mockDetailsState.details.measurements,
            isLoading: {
              ...mockDetailsState.details.measurements.isLoading,
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
        mockDetailsState.details.measurements.error[mockProductId];

      expect(
        selectors.getProductMeasurementsError(mockDetailsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductMeasurementsFetched()', () => {
    it('should get the measurements fetched status of a given product', () => {
      expect(
        selectors.areProductMeasurementsFetched(
          mockDetailsState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });
});
