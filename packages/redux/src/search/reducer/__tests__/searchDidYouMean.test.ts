import * as actionTypes from '../../actionTypes';
import * as fromReducer from '../searchDidYouMean';
import { mockSearchDidYouMeanQuery } from 'tests/__fixtures__/search';

const reducer = fromReducer.default;
let initialState;
const randomAction = { type: 'this_is_a_random_action' };

describe('search did you mean redux reducer', () => {
  const query = mockSearchDidYouMeanQuery;
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SEARCH_DID_YOU_MEAN,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toEqual(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle FETCH_SEARCH_DID_YOU_MEAN_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
          meta: { query },
        }).error,
      ).toEqual(initialState.error);
    });

    it('should handle FETCH_SEARCH_DID_YOU_MEAN_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE,
          meta: { query },
          payload: {
            error: expectedResult,
          },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('query() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).query;

      expect(state).toEqual(initialState.query);
      expect(state).toBeNull();
    });

    it('should handle FETCH_SEARCH_DID_YOU_MEAN_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
          meta: { query },
        }).query,
      ).toEqual(query);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, query: { foo: 'bar' } };

      expect(reducer(state, randomAction).query).toBe(state.query);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle FETCH_SEARCH_DID_YOU_MEAN_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
          meta: { query },
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle FETCH_SEARCH_DID_YOU_MEAN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE,
          meta: { query },
          payload: { error: 'Error - Not loaded' },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_SEARCH_DID_YOU_MEAN_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS,
          meta: { query },
          payload: { result: { foo: 'bar' } },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toEqual(initialState.result);
      expect(state).toBeNull();
    });

    it('should handle FETCH_SEARCH_DID_YOU_MEAN_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_REQUEST,
          meta: { query },
        }).result,
      ).toBeNull();
    });

    it('should handle FETCH_SEARCH_DID_YOU_MEAN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_FAILURE,
          meta: { query },
          payload: { error: 'Error - Not loaded' },
        }).result,
      ).toBeNull();
    });

    it('should handle FETCH_SEARCH_DID_YOU_MEAN_SUCCESS action type', () => {
      const mockResult = { foo: 'bar' };
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SEARCH_DID_YOU_MEAN_SUCCESS,
          meta: { query },
          payload: { result: mockResult },
        }).result,
      ).toEqual(mockResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, result: { foo: 'bar' } };

      expect(reducer(state, randomAction).result).toBe(state.result);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';
      const state = { ...initialState, error };

      expect(fromReducer.getError(state)).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;
      const state = { ...initialState, isLoading };

      expect(fromReducer.getIsLoading(state)).toEqual(isLoading);
    });
  });

  describe('getQuery() selector', () => {
    it('should return the query property from a given state', () => {
      const mockQuery = { foo: 'bar' };
      const state = { ...initialState, query: mockQuery };

      expect(fromReducer.getQuery(state)).toEqual(mockQuery);
    });
  });

  describe('getResult() selector', () => {
    it('should return the result property from a given state', () => {
      const result = { foo: 'bar' };
      const state = { ...initialState, result };
      expect(fromReducer.getResult(state)).toEqual(result);
    });
  });
});
