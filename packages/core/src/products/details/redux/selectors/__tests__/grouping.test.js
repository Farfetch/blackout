import * as selectors from '..';
import {
  mockDetailsState,
  mockGrouping,
  mockProductId,
} from 'tests/__fixtures__/products';

describe('Grouping', () => {
  const mockStateWithoutGrouping = {
    ...mockDetailsState,
    entities: {
      products: {
        [mockProductId]: {
          id: mockProductId,
        },
      },
    },
  };

  describe('isProductGroupingLoading()', () => {
    it('should get the grouping loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          grouping: {
            ...mockDetailsState.details.grouping,
            isLoading: {
              ...mockDetailsState.details.grouping.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.isProductGroupingLoading(changedMockState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductGroupingError()', () => {
    it('should get the grouping error property of a given product', () => {
      const expectedResult =
        mockDetailsState.details.grouping.error[mockProductId];

      expect(
        selectors.getProductGroupingError(mockDetailsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductGrouping()', () => {
    it('should get the grouping', () => {
      expect(
        selectors.getProductGrouping(mockDetailsState, mockProductId),
      ).toEqual(mockGrouping);
    });

    it('should return undefined if the grouping does not exist', () => {
      expect(
        selectors.getProductGrouping(mockStateWithoutGrouping, mockProductId),
      ).toBeUndefined();
    });
  });

  describe('getDigitalAssetsFromGrouping()', () => {
    it('should get the all the digital assets', () => {
      expect(
        selectors.getDigitalAssetsFromGrouping(mockDetailsState, mockProductId),
      ).toEqual(
        mockGrouping.reduce((acc, { entries }) => {
          acc.push(...entries);

          return acc;
        }, []),
      );
    });

    it('should return undefined if the product does not have grouping', () => {
      expect(
        selectors.getDigitalAssetsFromGrouping(
          mockStateWithoutGrouping,
          mockProductId,
        ),
      ).toBeUndefined();
    });
  });

  describe('getGroupingByPageIndex()', () => {
    it('should get the grouping from a specific pageIndex', () => {
      const mockPageIndex = 1;

      expect(
        selectors.getGroupingByPageIndex(
          mockDetailsState,
          mockProductId,
          mockPageIndex,
        ),
      ).toEqual(mockGrouping[1]);
    });

    it('should return undefined if the pageIndex does not exist', () => {
      const mockPageIndex = 3;

      expect(
        selectors.getGroupingByPageIndex(
          mockDetailsState,
          mockProductId,
          mockPageIndex,
        ),
      ).toBeUndefined();
    });

    it('should return undefined if the product does not have grouping', () => {
      const mockPageIndex = 3;

      expect(
        selectors.getGroupingByPageIndex(
          mockStateWithoutGrouping,
          mockProductId,
          mockPageIndex,
        ),
      ).toBeUndefined();
    });
  });

  describe('getGroupingTotalPages()', () => {
    it('should get the correct number of total pages', () => {
      expect(
        selectors.getGroupingTotalPages(mockDetailsState, mockProductId),
      ).toBe(mockGrouping[0].totalPages);
    });
  });

  describe('getProductGroupingCurrentPageIndex()', () => {
    it('should get the correct product grouping', () => {
      const expectedResult =
        mockDetailsState.details.grouping.currentPageIndex[mockProductId];

      expect(
        selectors.getProductGroupingCurrentPageIndex(
          mockDetailsState,
          mockProductId,
        ),
      ).toBe(expectedResult);
    });
  });

  describe('isProductWithGrouping()', () => {
    it('should get whether the product has grouping', () => {
      expect(
        selectors.isProductWithGrouping(mockDetailsState, mockProductId),
      ).toBe(
        mockDetailsState.entities.products[mockProductId]
          .associationsInformation.hasGrouping,
      );
    });

    it("should return undefined if the product doesn't exist", () => {
      const mockStateWithoutProductData = {
        ...mockDetailsState,
        entities: {
          products: {},
        },
      };

      expect(
        selectors.isProductWithGrouping(
          mockStateWithoutProductData,
          mockProductId,
        ),
      ).toBeUndefined();
    });
  });
});
