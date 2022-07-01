import * as actionTypes from '../actionTypes';
import { mockQuery } from 'tests/__fixtures__/sizeGuides';
import reducer, * as fromReducer from '../reducer';

let initialState;
const randomAction = { type: 'this_is_a_random_action' };

describe('sizeGuides redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SIZE_GUIDES_STATE,
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

    it('should handle FETCH_SIZE_GUIDES_REQUEST action type', () => {
      const expectedResult = initialState.error;
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_GUIDES_REQUEST,
          meta: mockQuery,
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle FETCH_SIZE_GUIDES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_GUIDES_FAILURE,
          meta: mockQuery,
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

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle FETCH_SIZE_GUIDES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_GUIDES_REQUEST,
          meta: mockQuery,
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle FETCH_SIZE_GUIDES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_GUIDES_FAILURE,
          meta: mockQuery,
          payload: { error: 'Error - Not loaded' },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_SIZE_GUIDES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_GUIDES_SUCCESS,
          meta: mockQuery,
          payload: { result: { foo: 'bar' } },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction);

      expect(state.result).toEqual(initialState.result);
    });

    it('should handle FETCH_SIZE_GUIDES_SUCCESS', () => {
      const expectedResult = { foo: 'bar' };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_SIZE_GUIDES_SUCCESS,
        meta: mockQuery,
        payload: { result: expectedResult },
      });

      expect(state.result).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        result: { foo: 'bar' },
      };

      expect(reducer(state, randomAction).result).toEqual(state.result);
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

  describe('getResult() selector', () => {
    it('should return the result property from a given state', () => {
      const result = { foo: 'bar' };
      const state = { ...initialState, result };

      expect(fromReducer.getResult(state)).toEqual(result);
    });
  });
});
