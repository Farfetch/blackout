// @TODO: Remove this file in version 2.0.0.
import * as fromReducer from '../../reducer/searchIntents';
import * as selectors from '../';
import { mockSearchIntentsResponse } from 'tests/__fixtures__/search';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('search redux selectors', () => {
  const mockState = {
    search: {
      intents: {
        error: 'Error - Search request.',
        isLoading: false,
        result: mockSearchIntentsResponse,
      },
    },
  };

  describe('isSearchLoading()', () => {
    it('should get the loading status of a given search', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.isSearchLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchError()', () => {
    it('should get the search error property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const expectedResult = mockState.search.intents.error;

      expect(selectors.getSearchError(mockState)).toEqual(expectedResult);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchResult()', () => {
    it('should get the result of a given search', () => {
      expect(selectors.getSearchResult(mockState)).toEqual(
        mockSearchIntentsResponse,
      );
    });
  });
});
