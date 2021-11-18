import * as selectors from '..';
import {
  mockDetailsState,
  mockFittings,
  mockProductId,
} from 'tests/__fixtures__/products';

describe('Fittings', () => {
  describe('getProductFittings()', () => {
    it('should get the fittings information', () => {
      expect(
        selectors.getProductFittings(mockDetailsState, mockProductId),
      ).toEqual(mockFittings);
    });
  });

  describe('areProductFittingsLoading()', () => {
    it('should get the fittings loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          fittings: {
            ...mockDetailsState.details.fittings,
            isLoading: {
              ...mockDetailsState.details.fittings.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductFittingsLoading(changedMockState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductFittingsError()', () => {
    it('should get the fittings error property of a given product', () => {
      const expectedResult =
        mockDetailsState.details.fittings.error[mockProductId];

      expect(
        selectors.getProductFittingsError(mockDetailsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductFittingsFetched()', () => {
    it('should get the fittings fetched status of a given product', () => {
      expect(
        selectors.areProductFittingsFetched(mockDetailsState, mockProductId),
      ).toBe(true);
    });
  });
});
