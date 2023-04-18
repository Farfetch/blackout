import * as selectors from '../grouping.js';
import {
  mockProductGroupingAdapted,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products/index.mjs';

const query = { pageIndex: 1 };

describe('Grouping', () => {
  describe('getProductGrouping()', () => {
    it('should get the grouping information', () => {
      expect(
        selectors.getProductGrouping(mockProductsState, mockProductId, query),
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
              [mockProductId]: { '?pageindex=1': true },
            },
          },
        },
      };

      expect(
        selectors.isProductGroupingLoading(
          changedMockState,
          mockProductId,
          query,
        ),
      ).toBe(true);
    });
  });

  describe('getProductGroupingError()', () => {
    it('should get the grouping error of a given product', () => {
      const expectedResult =
        mockProductsState.products.grouping.error[mockProductId][
          '?pageindex=1'
        ];

      expect(
        selectors.getProductGroupingError(
          mockProductsState,
          mockProductId,
          query,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('isProductGroupingFetched()', () => {
    it('should get the grouping fetched status of a given product', () => {
      expect(
        selectors.isProductGroupingFetched(
          mockProductsState,
          mockProductId,
          query,
        ),
      ).toBe(true);
    });
  });
});
