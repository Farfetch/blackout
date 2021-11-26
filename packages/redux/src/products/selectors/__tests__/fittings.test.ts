import * as selectors from '../fittings';
import {
  mockProductFittings,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';

describe('Fittings', () => {
  describe('getProductFittings()', () => {
    it('should get the fittings information', () => {
      expect(
        selectors.getProductFittings(mockProductsState, mockProductId),
      ).toEqual(mockProductFittings);
    });
  });

  describe('areProductFittingsLoading()', () => {
    it('should get the fittings loading status of a given product', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          fittings: {
            ...mockProductsState.products.fittings,
            isLoading: {
              ...mockProductsState.products.fittings.isLoading,
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
        mockProductsState.products.fittings.error[mockProductId];

      expect(
        selectors.getProductFittingsError(mockProductsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductFittingsFetched()', () => {
    it('should get the fittings fetched status of a given product', () => {
      expect(
        selectors.areProductFittingsFetched(mockProductsState, mockProductId),
      ).toBe(true);
    });
  });
});
