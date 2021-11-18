import * as fromReducer from '../reducer';
import * as selectors from '../selectors';
import * as utils from '../utils';
import {
  mockBrandsIds,
  mockCategories,
  mockCategoriesIds,
  mockSizeguides,
  mockState,
} from 'tests/__fixtures__/sizeguides';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('sizeguides redux selectors', () => {
  describe('areSizeguidesLoading()', () => {
    it('should get the loading status of the sizeguides', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.areSizeguidesLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSizeguidesError()', () => {
    it('should get the sizeguides error property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const expectedResult = mockState.sizeguides.error;

      expect(selectors.getSizeguidesError(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAllSizeguides()', () => {
    it('should get the all the sizeguides fetched on state', () => {
      const spy = jest.spyOn(fromReducer, 'getResult');

      expect(selectors.getAllSizeguides(mockState)).toEqual(mockSizeguides);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSizeguideByCategoriesAndBrand()', () => {
    const spy = jest.spyOn(utils, 'getSpecificSizeguide');

    it('should get the a specific sizeguide to the parameters received', () => {
      selectors.getSizeguideByCategoriesAndBrand(
        mockState,
        mockCategoriesIds,
        mockBrandsIds[0],
      );

      expect(spy).toHaveBeenCalledWith(
        mockSizeguides,
        mockCategories,
        mockBrandsIds[0],
      );
    });

    it('should return undefined if does not have sizeguides', () => {
      const mockStateWithoutSizeguides = {
        sizeguides: {
          error: 'Error - Sizeguides request.',
          isLoading: false,
          result: null,
        },
      };

      expect(
        selectors.getSizeguideByCategoriesAndBrand(
          mockStateWithoutSizeguides,
          mockCategoriesIds,
          mockBrandsIds[0],
        ),
      ).toBeUndefined();
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
