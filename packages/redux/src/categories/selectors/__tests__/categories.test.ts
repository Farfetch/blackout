import * as fromCategories from '../../reducer/categories.js';
import * as selectors from '../categories.js';
import {
  mockCategoriesLoadingState,
  mockCategoriesState,
} from 'tests/__fixtures__/categories/index.mjs';

describe('categories redux selectors', () => {
  const mockState = mockCategoriesState;

  beforeEach(jest.clearAllMocks);

  describe('areCategoriesLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromCategories, 'getIsLoading');

      expect(selectors.areCategoriesLoading(mockCategoriesLoadingState)).toBe(
        true,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCategoriesError()', () => {
    it('should get error', () => {
      const expectedResult = mockState.categories.error;
      const spy = jest.spyOn(fromCategories, 'getError');

      expect(selectors.getCategoriesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('areCategoriesFetched()', () => {
    it('should get the fetched status', () => {
      expect(selectors.areCategoriesFetched(mockState)).toBe(true);
    });
  });

  describe('getCategories()', () => {
    it('should return the categories entity', () => {
      expect(selectors.getCategories(mockState)).toEqual(
        mockState.entities.categories,
      );
    });
  });
});
