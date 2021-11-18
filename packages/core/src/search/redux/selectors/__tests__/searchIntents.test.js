import * as fromReducer from '../../reducer/searchIntents';
import * as selectors from '../';
import { mockSearchIntentsResponse } from 'tests/__fixtures__/search';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('search intents redux selectors', () => {
  const mockState = {
    search: {
      intents: {
        error: 'Error - Search request.',
        isLoading: false,
        result: mockSearchIntentsResponse,
      },
    },
  };

  describe('areSearchIntentsLoading()', () => {
    it('should get the loading status of a given search', () => {
      const spy = jest.spyOn(fromReducer, 'getIsLoading');

      expect(selectors.areSearchIntentsLoading(mockState)).toEqual(false);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchIntentsError()', () => {
    it('should get the search error property from state', () => {
      const spy = jest.spyOn(fromReducer, 'getError');
      const expectedResult = mockState.search.intents.error;

      expect(selectors.getSearchIntentsError(mockState)).toEqual(
        expectedResult,
      );
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('getSearchIntentsResult()', () => {
    it('should get the result of a given search', () => {
      expect(selectors.getSearchIntentsResult(mockState)).toEqual(
        mockSearchIntentsResponse,
      );
    });
  });
});
