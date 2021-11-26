import * as selectors from '../attributes';
import {
  mockProductAttributes,
  mockProductId,
  mockProductsState,
} from 'tests/__fixtures__/products';

describe('Attributes', () => {
  describe('getProductAttributes()', () => {
    it('should get the attributes', () => {
      expect(
        selectors.getProductAttributes(mockProductsState, mockProductId),
      ).toEqual(mockProductAttributes);
    });
  });

  describe('areProductAttributesLoading()', () => {
    it('should get the attributes loading status of a given product', () => {
      const changedMockState = {
        products: {
          ...mockProductsState.products,
          attributes: {
            ...mockProductsState.products.attributes,
            isLoading: {
              ...mockProductsState.products.attributes.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductAttributesLoading(changedMockState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductAttributesError()', () => {
    it('should get the attributes error property of a given product', () => {
      const expectedResult =
        mockProductsState.products.attributes.error[mockProductId];

      expect(
        selectors.getProductAttributesError(mockProductsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductAttributesFetched()', () => {
    it('should get the attributes fetched status of a given product', () => {
      expect(
        selectors.areProductAttributesFetched(mockProductsState, mockProductId),
      ).toBe(true);
    });
  });
});
