import * as selectors from '../sizes.js';
import {
  mockOutOfStockSizes,
  mockProductEntity,
  mockProductId,
  mockProductSizesAdapted,
  mockProductsState,
} from 'tests/__fixtures__/products/index.mjs';

describe('Sizes', () => {
  describe('areProductSizesLoading()', () => {
    it('should get the sizes loading status of a given product', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          sizes: {
            ...mockProductsState.products.sizes,
            isLoading: {
              ...mockProductsState.products.sizes.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductSizesLoading(changedMockState, mockProductId),
      ).toBe(true);
    });
  });

  describe('areProductSizesFetched()', () => {
    it('should get the sizes fetched status of a given product', () => {
      expect(
        selectors.areProductSizesFetched(mockProductsState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductSizesError()', () => {
    it('should get the sizes error property of a given product', () => {
      const expectedResult =
        mockProductsState.products.sizes.error[mockProductId];

      expect(
        selectors.getProductSizesError(mockProductsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductSizes()', () => {
    it('should get the sizes', () => {
      expect(
        selectors.getProductSizes(mockProductsState, mockProductId),
      ).toEqual(mockProductSizesAdapted);
    });
  });

  describe('getProductSizesWithStock()', () => {
    it('should get the sizes with stock', () => {
      const changedMockState = {
        ...mockProductsState,
        entities: {
          products: {
            [mockProductId]: {
              ...mockProductEntity,
              sizes: mockOutOfStockSizes,
            },
          },
        },
      };

      expect(
        selectors.getProductSizesWithStock(changedMockState, mockProductId),
      ).toEqual(mockProductSizesAdapted);
    });
  });
});
