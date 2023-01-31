import * as selectors from '..';
import {
  mockDetailsState,
  mockGroupingProperties,
  mockProductId,
} from 'tests/__fixtures__/products';

describe('Grouping Properties', () => {
  const mockStateWithoutGroupingProperties = {
    ...mockDetailsState,
    entities: {
      products: {
        [mockProductId]: {
          id: mockProductId,
        },
      },
    },
  };

  describe('isProductGroupingPropertiesLoading()', () => {
    it('should get the grouping properties loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          groupingProperties: {
            ...mockDetailsState.details.groupingProperties,
            isLoading: {
              ...mockDetailsState.details.groupingProperties.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.isProductGroupingPropertiesLoading(
          changedMockState,
          mockProductId,
        ),
      ).toBe(true);
    });
  });

  describe('getProductGroupingPropertiesError()', () => {
    it('should get the grouping properties error property of a given product', () => {
      const expectedResult =
        mockDetailsState.details.groupingProperties.error[mockProductId];

      expect(
        selectors.getProductGroupingPropertiesError(
          mockDetailsState,
          mockProductId,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductGroupingProperties()', () => {
    it('should get the grouping properties', () => {
      expect(
        selectors.getProductGroupingProperties(mockDetailsState, mockProductId),
      ).toEqual(mockGroupingProperties);
    });

    it('should return undefined if the grouping properties does not exist', () => {
      expect(
        selectors.getProductGroupingProperties(
          mockStateWithoutGroupingProperties,
          mockProductId,
        ),
      ).toBeUndefined();
    });
  });
});
