import * as selectors from '..';
import {
  mockDetailsState,
  mockProductId,
  mockSizeguides,
} from 'tests/__fixtures__/products';

describe('Sizeguides', () => {
  describe('getProductSizeguide()', () => {
    it('should get the sizeguide', () => {
      expect(
        selectors.getProductSizeguide(mockDetailsState, mockProductId),
      ).toEqual(mockSizeguides[0]);
    });
  });

  describe('areProductSizeguidesLoading()', () => {
    it('should get the sizeguides loading status of a given product', () => {
      const changedMockState = {
        ...mockDetailsState,
        details: {
          ...mockDetailsState.details,
          sizeguides: {
            ...mockDetailsState.details.sizeguides,
            isLoading: {
              ...mockDetailsState.details.sizeguides.isLoading,
              [mockProductId]: true,
            },
          },
        },
      };

      expect(
        selectors.areProductSizeguidesLoading(changedMockState, mockProductId),
      ).toBe(true);
    });
  });

  describe('getProductSizeguideError()', () => {
    it('should get the sizeguides error property of a given product', () => {
      const expectedResult =
        mockDetailsState.details.sizeguides.error[mockProductId];

      expect(
        selectors.getProductSizeguideError(mockDetailsState, mockProductId),
      ).toEqual(expectedResult);
    });
  });

  describe('areProductSizeguidesFetched()', () => {
    it('should get the sizeguides fetched status of a given product', () => {
      expect(
        selectors.areProductSizeguidesFetched(mockDetailsState, mockProductId),
      ).toBe(true);
    });
  });
});
