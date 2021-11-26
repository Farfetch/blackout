import * as fromReducer from '../../reducer/searchDidYouMean';
import * as selectors from '..';
import {
  mockSearchDidYouMeanQuery,
  mockSearchDidYouMeanResponse,
  mockSearchDidYouMeanState,
} from 'tests/__fixtures__/search';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('search did you mean redux selectors', () => {
  const mockState = mockSearchDidYouMeanState;

  describe('isSearchDidYouMeanLoading()', () => {
    it('should get the loading status of a given search', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.isSearchDidYouMeanLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchDidYouMeanError()', () => {
    it('should get the error property from state to a given search', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const expectedResult = mockState.search.didYouMean.error;

      expect(selectors.getSearchDidYouMeanError(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchDidYouMeanQuery()', () => {
    it('should get the current query to get did you mean results', () => {
      expect(selectors.getSearchDidYouMeanQuery(mockState)).toEqual(
        mockSearchDidYouMeanQuery,
      );
    });
  });

  describe('getSearchDidYouMeanResult()', () => {
    it('should get the did you mean - facets - result of a given search', () => {
      expect(selectors.getSearchDidYouMeanResult(mockState)).toEqual(
        mockSearchDidYouMeanResponse,
      );
    });
  });
});
