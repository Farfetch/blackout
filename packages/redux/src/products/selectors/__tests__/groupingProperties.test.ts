import * as selectors from '../groupingProperties';
import {
  mockProductGroupingPropertiesAdapted,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';

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
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductGroupingPropertiesLoading(
          changedMockState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });

  describe('getProductGroupingPropertiesError()', () => {
    it('should get the grouping properties error of a given product', () => {
      const expectedResult =
        mockProductsState.products.groupingProperties.error[mockProductId];

      expect(
        selectors.getProductGroupingPropertiesError(
          mockProductsState,
          mockProductId,
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
        ),
      ).toBe(true);
    });
  });
});
