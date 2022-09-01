import * as selectors from '../grouping';
import {
  mockProductGroupingAdapted,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';

describe('Grouping', () => {
  describe('getProductGrouping()', () => {
    it('should get the grouping information', () => {
      expect(
        selectors.getProductGrouping(
          mockProductsState,
          mockProductId,
          '?pageindex=1',
        ),
      ).toEqual(mockProductGroupingAdapted);
    });
  });

  describe('isProductGroupingLoading()', () => {
    it('should get the grouping loading status of a given product', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          grouping: {
            ...mockProductsState.products.grouping,
            isLoading: {
              ...mockProductsState.products.grouping.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.isProductGroupingLoading(changedMockState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductGroupingError()', () => {
    it('should get the grouping error of a given product', () => {
      const expectedResult =
        mockProductsState.products.grouping.error[mockProductId];

      expect(
        selectors.getProductGroupingError(mockProductsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('isProductGroupingFetched()', () => {
    it('should get the grouping fetched status of a given product', () => {
      expect(
        selectors.isProductGroupingFetched(mockProductsState, mockProductId),
      ).toBe(true);
    });
  });
});
