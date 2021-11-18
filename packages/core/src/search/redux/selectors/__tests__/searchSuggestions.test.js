import * as fromReducer from '../../reducer/searchSuggestions';
import * as selectors from '../';
import {
  mockSearchSuggestionsQuery,
  mockSearchSuggestionsResponse,
} from 'tests/__fixtures__/search';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('search suggestions redux selectors', () => {
  const mockState = {
    search: {
      suggestions: {
        error: 'Error - Search request.',
        isLoading: false,
        query: mockSearchSuggestionsQuery,
        result: mockSearchSuggestionsResponse,
      },
    },
  };

  describe('areSearchSuggestionsLoading()', () => {
    it('should get the loading status of a given search', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.areSearchSuggestionsLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchSuggestionsError()', () => {
    it('should get the error property from state to a given search', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const expectedResult = mockState.search.suggestions.error;

      expect(selectors.getSearchSuggestionsError(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchSuggestionsQuery()', () => {
    it('should get the current query to get suggestions', () => {
      expect(selectors.getSearchSuggestionsQuery(mockState)).toEqual(
        mockSearchSuggestionsQuery,
      );
    });
  });

  describe('getSearchSuggestionsResult()', () => {
    it('should get the suggestions result of a given search', () => {
      expect(selectors.getSearchSuggestionsResult(mockState)).toEqual(
        mockSearchSuggestionsResponse,
      );
    });
  });
});
