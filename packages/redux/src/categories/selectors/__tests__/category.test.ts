import * as fromCategories from '../../reducer/category';
import * as selectors from '../category';
import {
  mockCategoriesState,
  mockCategory,
  mockCategoryId,
  mockCategoryLoadingState,
} from 'tests/__fixtures__/categories';

describe('categories redux selectors', () => {
  const mockState = mockCategoriesState;

  beforeEach(jest.clearAllMocks);

  describe('isCategoryLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromCategories, 'getIsLoading');

      expect(
        selectors.isCategoryLoading(mockCategoryLoadingState, mockCategoryId),
      ).toBe(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getCategoryError()', () => {
    it('should get error', () => {
      const expectedResult =
        mockState.categories.category.error[mockCategoryId];
      const spy = jest.spyOn(fromCategories, 'getError');

      expect(selectors.getCategoryError(mockState, mockCategoryId)).toBe(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('isCategoryFetched()', () => {
    it('should get the fetched status', () => {
      expect(selectors.isCategoryFetched(mockState, mockCategoryId)).toBe(true);
    });
  });

  describe('getCategory()', () => {
    it('should return the category entity for a given id', () => {
      expect(selectors.getCategory(mockState, mockCategoryId)).toEqual(
        mockCategory,
      );
    });
  });
});
