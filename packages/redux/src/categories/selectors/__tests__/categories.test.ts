import * as fromCategories from '../../reducer/categories';
import * as selectors from '../categories';
import {
  mockCategoriesLoadingState,
  mockCategoriesState,
  mockCategory,
  mockCategoryId,
} from 'tests/__fixtures__/categories';

describe('categories redux selectors', () => {
  const mockState = mockCategoriesState;

  beforeEach(jest.clearAllMocks);

  describe('areCategoriesLoading()', () => {
    it('should get the categories loading status', () => {
      const spy = jest.spyOn(fromCategories, 'getIsLoading');

      expect(
        selectors.areCategoriesLoading(mockCategoriesLoadingState),
      ).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCategoriesError()', () => {
    it('should get the categories error', () => {
      const expectedResult = mockState.categories.error;
      const spy = jest.spyOn(fromCategories, 'getError');

      expect(selectors.getCategoriesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areCategoriesFetched()', () => {
    it('should get the categories fetched status', () => {
      const spy = jest.spyOn(fromCategories, 'getIsFetched');

      expect(selectors.areCategoriesFetched(mockState)).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCategory()', () => {
    it('should return the category entity for given id', () => {
      expect(selectors.getCategory(mockState, mockCategoryId)).toEqual(
        mockCategory,
      );
    });
  });

  describe('getCategories()', () => {
    it('should return the category entity', () => {
      expect(selectors.getCategories(mockState)).toEqual(
        mockState.entities.categories,
      );
    });
  });
});
