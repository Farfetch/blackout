import * as selectors from '..';
import {
  mockColorGrouping,
  mockDetailsState,
  mockProductId,
} from 'tests/__fixtures__/products';

describe('Color grouping', () => {
  const mockStateWithoutColorGrouping = {
    ...mockDetailsState,
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
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          colorGrouping: {
            ...mockDetailsState.details.colorGrouping,
            isLoading: {
              ...mockDetailsState.details.colorGrouping.isLoading,
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
        mockDetailsState.details.colorGrouping.error[mockProductId];

      expect(
        selectors.getProductColorGroupingError(mockDetailsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('getProductColorGrouping()', () => {
    it('should get the color grouping', () => {
      expect(
        selectors.getProductColorGrouping(mockDetailsState, mockProductId),
      ).toEqual(mockColorGrouping);
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

  describe('getDigitalAssetsFromColorGrouping()', () => {
    it('should get the all the digital assets', () => {
      expect(
        selectors.getDigitalAssetsFromColorGrouping(
          mockDetailsState,
          mockProductId,
        ),
      ).toEqual(
        mockColorGrouping.reduce((acc, { entries }) => {
          acc.push(...entries);

          return acc;
        }, []),
      );
    });

    it('should return undefined if the product does not have color grouping', () => {
      expect(
        selectors.getDigitalAssetsFromColorGrouping(
          mockStateWithoutColorGrouping,
          mockProductId,
        ),
      ).toBeUndefined();
    });
  });

  describe('getColorGroupingByPageIndex()', () => {
    it('should get the color grouping from a specific pageIndex', () => {
      const mockPageIndex = 1;

      expect(
        selectors.getColorGroupingByPageIndex(
          mockDetailsState,
          mockProductId,
          mockPageIndex,
        ),
      ).toEqual(mockColorGrouping[1]);
    });

    it('should return undefined if the pageIndex does not exist', () => {
      const mockPageIndex = 3;

      expect(
        selectors.getColorGroupingByPageIndex(
          mockDetailsState,
          mockProductId,
          mockPageIndex,
        ),
      ).toBeUndefined();
    });

    it('should return undefined if the product does not have color grouping', () => {
      const mockPageIndex = 3;

      expect(
        selectors.getColorGroupingByPageIndex(
          mockStateWithoutColorGrouping,
          mockProductId,
          mockPageIndex,
        ),
      ).toBeUndefined();
    });
  });

  describe('getColorGroupingTotalPages()', () => {
    it('should get the correct number of total pages', () => {
      expect(
        selectors.getColorGroupingTotalPages(mockDetailsState, mockProductId),
      ).toBe(mockColorGrouping[0].totalPages);
    });
  });

  describe('getProductColorGroupingCurrentPageIndex()', () => {
    it('should get the correct product color grouping', () => {
      const expectedResult =
        mockDetailsState.details.colorGrouping.currentPageIndex[mockProductId];

      expect(
        selectors.getProductColorGroupingCurrentPageIndex(
          mockDetailsState,
          mockProductId,
        ),
      ).toBe(expectedResult);
    });
  });

  describe('isProductWithColorGrouping()', () => {
    it('should get whether the product has color grouping', () => {
      expect(
        selectors.isProductWithColorGrouping(mockDetailsState, mockProductId),
      ).toBe(
        mockDetailsState.entities.products[mockProductId]
          .associationsInformation.hasColorGrouping,
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
        selectors.isProductWithColorGrouping(
          mockStateWithoutProductData,
          mockProductId,
        ),
      ).toBeUndefined();
    });
  });
});
