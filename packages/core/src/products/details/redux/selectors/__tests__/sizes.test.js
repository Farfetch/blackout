import * as selectors from '..';
import {
  mockDetailsState,
  mockOutOfStockSizes,
  mockProductId,
  mockSizes,
} from 'tests/__fixtures__/products';

describe('Sizes', () => {
  describe('areProductSizesLoading()', () => {
    it('should get the sizes loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          sizes: {
            ...mockDetailsState.details.sizes,
            isLoading: {
              ...mockDetailsState.details.sizes.isLoading,
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
        selectors.areProductSizesFetched(mockDetailsState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductSizesError()', () => {
    it('should get the sizes error property of a given product', () => {
      const expectedResult =
        mockDetailsState.details.sizes.error[mockProductId];

      expect(
        selectors.getProductSizesError(mockDetailsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductSizes()', () => {
    it('should get the sizes', () => {
      expect(
        selectors.getProductSizes(mockDetailsState, mockProductId),
      ).toEqual(mockSizes);
    });
  });

  describe('getProductSizesWithStock()', () => {
    it('should get the sizes with stock', () => {
      const changedMockState = {
        entities: {
          products: {
            [mockProductId]: {
              sizes: mockOutOfStockSizes,
            },
          },
        },
      };

      expect(
        selectors.getProductSizesWithStock(changedMockState, mockProductId),
      ).toEqual(mockSizes);
    });
  });
});
