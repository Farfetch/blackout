import * as selectors from '../groupingProperties.js';
import {
  mockProductGroupingPropertiesAdapted,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products/index.mjs';

describe('GroupingProperties', () => {
  describe('getProductGroupingProperties()', () => {
    it('should get the grouping properties information', () => {
      expect(
        selectors.getProductGroupingProperties(
          mockProductsState,
          mockProductId,
          '!all',
        ),
      ).toEqual(mockProductGroupingPropertiesAdapted);
    });
  });

  describe('areProductGroupingPropertiesLoading()', () => {
    it('should get the grouping properties loading status of a given product', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          groupingProperties: {
            ...mockProductsState.products.groupingProperties,
            isLoading: {
              ...mockProductsState.products.groupingProperties.isLoading,
              [mockProductId]: { '!all': true },
            },
          },
        },
      };

      expect(
        selectors.areProductGroupingPropertiesLoading(
          changedMockState,
          mockProductId,
          '!all',
        ),
      ).toBe(true);
    });
  });

  describe('getProductGroupingPropertiesError()', () => {
    it('should get the grouping properties error of a given product', () => {
      const expectedResult =
        mockProductsState.products.groupingProperties.error[mockProductId][
          '!all'
        ];

      expect(
        selectors.getProductGroupingPropertiesError(
          mockProductsState,
          mockProductId,
          '!all',
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductGroupingPropertiesFetched()', () => {
    it('should get the grouping properties fetched status of a given product', () => {
      expect(
        selectors.areProductGroupingPropertiesFetched(
          mockProductsState,
          mockProductId,
          '!all',
        ),
      ).toBe(true);
    });
  });
});
