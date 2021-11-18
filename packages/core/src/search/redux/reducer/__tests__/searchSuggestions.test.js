import * as fromReducer from '../searchSuggestions';
import { actionTypes } from '../../';
import { mockSearchSuggestionsQuery } from 'tests/__fixtures__/search';

const reducer = fromReducer.default;
let initialState;

describe('search suggestions redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  const query = mockSearchSuggestionsQuery;

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SEARCH_SUGGESTIONS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toEqual(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle GET_SEARCH_SUGGESTIONS_REQUEST action type', () => {
      const expectedResult = initialState.error;
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEARCH_SUGGESTIONS_REQUEST,
          meta: { query },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle GET_SEARCH_SUGGESTIONS_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEARCH_SUGGESTIONS_FAILURE,
          meta: { query },
          payload: {
            error: expectedResult,
          },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle GET_SEARCH_SUGGESTIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEARCH_SUGGESTIONS_REQUEST,
          meta: { query },
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle GET_SEARCH_SUGGESTIONS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEARCH_SUGGESTIONS_FAILURE,
          meta: { query },
          payload: { error: 'Error - Not loaded' },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle GET_SEARCH_SUGGESTIONS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEARCH_SUGGESTIONS_SUCCESS,
          meta: { query },
          payload: { result: { foo: 'bar' } },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: false };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('query() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().query;

      expect(state).toEqual(initialState.query);
      expect(state).toBeNull();
    });

    it('should handle GET_SEARCH_SUGGESTIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEARCH_SUGGESTIONS_REQUEST,
          meta: { query },
        }).query,
      ).toEqual(query);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { query: { foo: 'bar' } };

      expect(reducer(state).query).toBe(state.query);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().result;

      expect(state).toEqual(initialState.result);
      expect(state).toBeNull();
    });

    it('should handle GET_SEARCH_SUGGESTIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEARCH_SUGGESTIONS_REQUEST,
          meta: { query },
        }).result,
      ).toBeNull();
    });

    it('should handle GET_SEARCH_SUGGESTIONS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEARCH_SUGGESTIONS_FAILURE,
          meta: { query },
          payload: { error: 'Error - Not loaded' },
        }).result,
      ).toBeNull();
    });

    it('should handle GET_SEARCH_SUGGESTIONS_SUCCESS action type', () => {
      const mockResult = { foo: 'bar' };
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SEARCH_SUGGESTIONS_SUCCESS,
          meta: { query },
          payload: { result: mockResult },
        }).result,
      ).toEqual(mockResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { result: { foo: 'bar' } };

      expect(reducer(state).result).toBe(state.result);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;

      expect(fromReducer.getIsLoading({ isLoading })).toEqual(isLoading);
    });
  });

  describe('getQuery() selector', () => {
    it('should return the query property from a given state', () => {
      const mockQuery = { foo: 'bar' };

      expect(fromReducer.getQuery({ query: mockQuery })).toEqual(mockQuery);
    });
  });

  describe('getResult() selector', () => {
    it('should return the result property from a given state', () => {
      const result = { foo: 'bar' };

      expect(fromReducer.getResult({ result })).toEqual(result);
    });
  });
});
