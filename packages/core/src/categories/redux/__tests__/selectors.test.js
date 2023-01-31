import * as fromCategories from '../reducer';
import * as selectors from '../selectors';
import {
  mockCategories,
  mockCategory,
  mockCategoryId,
  mockChildrenCategories,
  mockLoadingState,
  mockState,
  mockTopCategories,
  mockUnfetchedState,
} from 'tests/__fixtures__/categories';

describe('categories redux selectors', () => {
  beforeEach(jest.clearAllMocks);

  describe('areCategoriesLoading()', () => {
    it('should get the categories loading status', () => {
      const spy = jest.spyOn(fromCategories, 'getIsLoading');

      expect(selectors.areCategoriesLoading(mockLoadingState)).toEqual(true);
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

  describe('getCategories()', () => {
    it('should return a list with all the categories available', () => {
      const result = selectors.getCategories(mockState);

      expect(result).toHaveLength(mockCategories.length);
      expect(result).toEqual(expect.arrayContaining(mockCategories));
    });

    it('should return an empty list when no categories are available', () => {
      const result = selectors.getCategories({
        ...mockState,
        entities: { categories: {} },
      });

      expect(result).toEqual([]);
    });

    it('should return an empty list when the entity is not available', () => {
      const result = selectors.getCategories({
        ...mockState,
        entities: {},
      });

      expect(result).toEqual([]);
    });
  });

  describe('getTopCategories()', () => {
    it('should return a list with only the top categories', () => {
      const result = selectors.getTopCategories(mockState);

      expect(result).toHaveLength(mockTopCategories.length);
      expect(result).toEqual(expect.arrayContaining(mockTopCategories));
    });

    it('should return an empty list when no top categories are available', () => {
      const otherCategory = mockChildrenCategories[0];
      const result = selectors.getTopCategories({
        categories: {
          top: null,
        },
        entities: {
          categories: {
            [otherCategory.id]: otherCategory,
          },
        },
      });

      expect(result).toEqual([]);
    });
  });

  describe('getCategoryById()', () => {
    it('should return a specific category', () => {
      const result = selectors.getCategoryById(mockState, mockCategoryId);

      expect(result).toEqual(mockCategory);
    });
  });

  describe('areCategoriesFetched()', () => {
    it('should return true if categories are already fetched', () => {
      expect(selectors.areCategoriesFetched(mockState)).toBe(true);
    });

    it('should return false if categories are not fetched', () => {
      expect(selectors.areCategoriesFetched(mockUnfetchedState)).toBe(false);
    });
  });

  describe('areTopCategoriesFetched()', () => {
    it('should return true if top categories are already fetched', () => {
      expect(selectors.areTopCategoriesFetched(mockState)).toBe(true);
    });

    it('should return false if top categories are not fetched', () => {
      expect(selectors.areTopCategoriesFetched(mockUnfetchedState)).toBe(false);
    });
  });
});
