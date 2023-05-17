import * as selectors from '../../selectors/searchSuggestions.js';
import {
  mockSearchSuggestionsErrorState,
  mockSearchSuggestionsHash,
  mockSearchSuggestionsInitialState,
  mockSearchSuggestionsLoadingState,
  mockSearchSuggestionsQuery,
  mockSearchSuggestionsResponse,
  mockSearchSuggestionsState,
} from 'tests/__fixtures__/search/index.mjs';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('search suggestions redux selectors', () => {
  const mockState = mockSearchSuggestionsState;

  describe('areSearchSuggestionsLoading()', () => {
    it('should get the loading status of a given search', () => {
      const spy = jest.spyOn(selectors, 'areSearchSuggestionsLoading');

      expect(
        selectors.areSearchSuggestionsLoading(
          mockState,
          mockSearchSuggestionsQuery,
        ),
      ).toBe(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchSuggestionsError()', () => {
    it('should get the search error property from state', () => {
      const expectedResult =
        mockState.search.suggestions[mockSearchSuggestionsHash].error;
      const spy = jest.spyOn(selectors, 'getSearchSuggestionsError');

      expect(
        selectors.getSearchSuggestionsError(
          mockState,
          mockSearchSuggestionsQuery,
        ),
      ).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchSuggestionsResult()', () => {
    it('should get the result of a given search', () => {
      expect(
        selectors.getSearchSuggestionsResult(
          mockState,
          mockSearchSuggestionsQuery,
        ),
      ).toEqual(mockSearchSuggestionsResponse);
    });
  });

  describe('areSearchSuggestionsFetched()', () => {
    it('should return true if fetched', () => {
      expect(
        selectors.areSearchSuggestionsFetched(
          mockState,
          mockSearchSuggestionsQuery,
        ),
      ).toBe(true);
    });

    it('should return true if a fetch error occured', () => {
      expect(
        selectors.areSearchSuggestionsFetched(
          mockSearchSuggestionsErrorState,
          mockSearchSuggestionsQuery,
        ),
      ).toBe(true);
    });

    it('should return false if not fetched', () => {
      expect(
        selectors.areSearchSuggestionsFetched(
          mockSearchSuggestionsInitialState,
          mockSearchSuggestionsQuery,
        ),
      ).toBe(false);
    });

    it('should return false if is loading', () => {
      expect(
        selectors.areSearchSuggestionsFetched(
          mockSearchSuggestionsLoadingState,
          mockSearchSuggestionsQuery,
        ),
      ).toBe(false);
    });
  });
});
