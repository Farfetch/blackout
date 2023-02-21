import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import * as utils from '../utils';
import {
  mockBrandsIds,
  mockCategories,
  mockQuery,
  mockSizeGuides,
  mockState,
} from 'tests/__fixtures__/sizeGuides';
import { toBlackoutError } from '@farfetch/blackout-client';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('sizeGuides redux selectors', () => {
  describe('areSizeGuidesLoading()', () => {
    it('should get the loading status of the sizeGuides', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.areSizeGuidesLoading(mockState)).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSizeGuidesError()', () => {
    it('should get the sizeGuides error property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const expectedResult = mockState.sizeGuides.error;

      expect(selectors.getSizeGuidesError(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSizeGuides()', () => {
    it('should get the all the sizeGuides fetched on state', () => {
      const spy = jest.spyOn(fromReducer, 'getResult');

      expect(selectors.getSizeGuides(mockState)).toEqual(mockSizeGuides);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSpecificSizeGuide()', () => {
    const spy = jest.spyOn(utils, 'findSpecificSizeGuide');

    it('should get the a specific sizeGuide to the parameters received', () => {
      selectors.getSpecificSizeGuide(mockState, mockQuery);

      expect(spy).toHaveBeenCalledWith({
        sizeGuides: mockSizeGuides,
        categories: mockCategories,
        brandId: mockBrandsIds[0],
      });
    });

    it('should return undefined if does not have sizeGuides', () => {
      const mockStateWithoutSizeGuides = {
        ...mockState,
        sizeGuides: {
          error: toBlackoutError(new Error('Error - SizeGuides request.')),
          isLoading: false,
          result: null,
        },
      };

      expect(
        selectors.getSpecificSizeGuide(mockStateWithoutSizeGuides, mockQuery),
      ).toBeUndefined();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
