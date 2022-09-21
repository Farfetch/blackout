import * as fromCategories from '../../reducer/categories';
import * as selectors from '../categories';
import {
  mockCategoriesLoadingState,
  mockCategoriesState,
} from 'tests/__fixtures__/categories';

describe('categories redux selectors', () => {
  const mockState = mockCategoriesState;

  beforeEach(jest.clearAllMocks);

  describe('areCategoriesLoading()', () => {
    it('should get the loading status', () => {
      const spy = jest.spyOn(fromCategories, 'getIsLoading');

      expect(
        selectors.areCategoriesLoading(mockCategoriesLoadingState),
      ).toEqual(true);
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
      expect(selectors.areCategoriesFetched(mockState)).toEqual(true);
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
