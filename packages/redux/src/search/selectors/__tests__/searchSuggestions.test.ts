import * as selectors from '../../selectors/searchSuggestions';
import {
  mockSearchSuggestionsErrorState,
  mockSearchSuggestionsHash,
  mockSearchSuggestionsInitialState,
  mockSearchSuggestionsLoadingState,
  mockSearchSuggestionsResponse,
  mockSearchSuggestionsState,
} from 'tests/__fixtures__/search';

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
          mockSearchSuggestionsHash,
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
          mockSearchSuggestionsHash,
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
          mockSearchSuggestionsHash,
        ),
      ).toEqual(mockSearchSuggestionsResponse);
    });
  });

  describe('areSearchSuggestionsFetched()', () => {
    it('should return true if fetched', () => {
      expect(
        selectors.areSearchSuggestionsFetched(
          mockState,
          mockSearchSuggestionsHash,
        ),
      ).toBe(true);
    });

    it('should return true if a fetch error occured', () => {
      expect(
        selectors.areSearchSuggestionsFetched(
          mockSearchSuggestionsErrorState,
          mockSearchSuggestionsHash,
        ),
      ).toBe(true);
    });

    it('should return false if not fetched', () => {
      expect(
        selectors.areSearchSuggestionsFetched(
          mockSearchSuggestionsInitialState,
          mockSearchSuggestionsHash,
        ),
      ).toBe(false);
    });

    it('should return false if is loading', () => {
      expect(
        selectors.areSearchSuggestionsFetched(
          mockSearchSuggestionsLoadingState,
          mockSearchSuggestionsHash,
        ),
      ).toBe(false);
    });
  });
});
