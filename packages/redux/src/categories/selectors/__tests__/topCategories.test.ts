import * as fromTopCategories from '../../reducer/topCategories';
import * as selectors from '../topCategories';
import {
  mockCategoriesLoadingState,
  mockCategoriesState,
  mockChildrenCategories,
  mockTopCategories,
} from 'tests/__fixtures__/categories';
import type { Category } from '@farfetch/blackout-client';

describe('categories redux selectors', () => {
  const mockState = mockCategoriesState;

  beforeEach(jest.clearAllMocks);

  describe('areTopCategoriesLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromTopCategories, 'getIsLoading');

      expect(
        selectors.areTopCategoriesLoading(mockCategoriesLoadingState),
      ).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTopCategoriesError()', () => {
    it('should get the error', () => {
      const expectedResult = mockState.categories.top.error;
      const spy = jest.spyOn(fromTopCategories, 'getError');

      expect(selectors.getTopCategoriesError(mockState)).toBe(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getTopCategories()', () => {
    it('should return a list with the top categories', () => {
      const result = selectors.getTopCategories(mockState);

      expect(result).toHaveLength(mockTopCategories.length);
      expect(result).toEqual(expect.arrayContaining(mockTopCategories));
    });

    it('should return an empty list when no top categories are available', () => {
      const otherCategory = mockChildrenCategories[0] as Category;
      const result = selectors.getTopCategories({
        categories: {
          ...mockCategoriesState.categories,
          top: {
            error: null,
            isLoading: false,
            result: null,
          },
        },
        entities: {
          ...mockCategoriesState.entities,
          categories: {
            [otherCategory?.id]: otherCategory,
          },
        },
      });

      expect(result).toEqual([]);
    });
  });

  describe('areTopCategoriesFetched()', () => {
    it('should get the top categories fetched status', () => {
      const spy = jest.spyOn(fromTopCategories, 'getResult');

      expect(selectors.areTopCategoriesFetched(mockState)).toEqual(true);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
