import * as selectors from '..';
import {
  mockAttributes,
  mockDetailsState,
  mockProductId,
} from 'tests/__fixtures__/products';

describe('Attributes', () => {
  describe('getProductAttributes()', () => {
    it('should get the attributes', () => {
      expect(
        selectors.getProductAttributes(mockDetailsState, mockProductId),
      ).toEqual(mockAttributes);
    });
  });

  describe('areProductAttributesLoading()', () => {
    it('should get the attributes loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          attributes: {
            ...mockDetailsState.details.attributes,
            isLoading: {
              ...mockDetailsState.details.attributes.isLoading,
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
        mockDetailsState.details.attributes.error[mockProductId];

      expect(
        selectors.getProductAttributesError(mockDetailsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductAttributesFetched()', () => {
    it('should get the attributes fetched status of a given product', () => {
      expect(
        selectors.areProductAttributesFetched(mockDetailsState, mockProductId),
      ).toBe(true);
    });
  });
});
