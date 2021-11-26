import * as selectors from '../colorGrouping';
import {
  mockProductColorGrouping,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';

describe('Color grouping', () => {
  const mockStateWithoutColorGrouping = {
    products: mockProductsState,
    entities: {
      products: {
        [mockProductId]: {
          id: mockProductId,
        },
      },
    },
  };

  describe('isProductColorGroupingLoading()', () => {
    it('should get the color grouping loading status of a given product', () => {
      const changedMockState = {
        products: {
          ...mockProductsState.products,
          colorGrouping: {
            ...mockProductsState.products.colorGrouping,
            isLoading: {
              ...mockProductsState.products.colorGrouping.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.isProductColorGroupingLoading(
          changedMockState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });

  describe('getProductColorGroupingError()', () => {
    it('should get the color grouping error property of a given product', () => {
      const expectedResult =
        mockProductsState.products.colorGrouping.error[mockProductId];

      expect(
        selectors.getProductColorGroupingError(
          mockProductsState,
          mockProductId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductColorGrouping()', () => {
    it('should get the color grouping', () => {
      expect(
        selectors.getProductColorGrouping(mockProductsState, mockProductId),
      ).toEqual(mockProductColorGrouping);
    });

    it('should return undefined if the color grouping does not exist', () => {
      expect(
        selectors.getProductColorGrouping(
          mockStateWithoutColorGrouping,
          mockProductId,
        ),
      ).toBeUndefined();
    });
  });

  describe('hasProductColorGrouping()', () => {
    it('should get whether the product has color grouping', () => {
      expect(
        selectors.hasProductColorGrouping(mockProductsState, mockProductId),
      ).toBe(
        mockProductsState.entities.products[mockProductId]
          .associationsInformation.hasColorGrouping,
      );
    });

    it("should return undefined if the product doesn't exist", () => {
      const mockStateWithoutProductData = {
        products: mockProductsState,
        entities: {
          products: {},
        },
      };

      expect(
        selectors.hasProductColorGrouping(
          mockStateWithoutProductData,
          mockProductId,
        ),
      ).toBeUndefined();
    });
  });
});
