import * as selectors from '../sizeGuides';
import {
  mockProductId,
  mockProductSizeGuides,
  mockProductsState,
} from 'tests/__fixtures__/products';

describe('SizeGuides', () => {
  describe('getProductSizeGuide()', () => {
    it('should get the size guide', () => {
      expect(
        selectors.getProductSizeGuide(mockProductsState, mockProductId),
      ).toEqual(mockProductSizeGuides[0]);
    });

    it('should get all the product size guides', () => {
      expect(
        selectors.getProductSizeGuides(mockProductsState, mockProductId),
      ).toEqual(mockProductSizeGuides);
    });
  });

  describe('areProductSizeGuidesLoading()', () => {
    it('should get the size guides loading status of a given product', () => {
      const changedMockState = {
        ...mockProductsState,
        products: {
          ...mockProductsState.products,
          sizeGuides: {
            ...mockProductsState.products.sizeGuides,
            isLoading: {
              ...mockProductsState.products.sizeGuides.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductSizeGuidesLoading(changedMockState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductSizeGuidesError()', () => {
    it('should get the size guides error property of a given product', () => {
      const expectedResult =
        mockProductsState.products.sizeGuides.error[mockProductId];

      expect(
        selectors.getProductSizeGuidesError(mockProductsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductSizeGuidesFetched()', () => {
    it('should get the size guides fetched status of a given product', () => {
      expect(
        selectors.areProductSizeGuidesFetched(mockProductsState, mockProductId),
      ).toBe(true);
    });
  });
});
