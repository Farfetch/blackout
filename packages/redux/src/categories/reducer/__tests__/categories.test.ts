import * as actionTypes from '../../actionTypes';
import * as fromReducer from '../categories';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer from '../../reducer';
import type { CategoriesState } from '../../types';

let initialState: CategoriesState;
const randomAction = { type: 'this_is_a_random_action' };

describe('categories redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CATEGORIES_STATE,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle FETCH_CATEGORIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_REQUEST,
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle FETCH_CATEGORIES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_FAILURE,
          payload: { error: expectedResult },
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('foo')),
      };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(false);
      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_CATEGORIES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_REQUEST,
          payload: {
            result: 'foo',
            entities: { categories: {} },
          },
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_CATEGORIES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_FAILURE,
          payload: { error: '' },
        }).isLoading,
      ).toBe(false);
    });

    it('should handle FETCH_CATEGORIES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORIES_SUCCESS,
          payload: {
            result: ['foo', 'bar'],
            entities: { categories: {} },
          },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = toBlackoutError(new Error('error'));
      const state = { ...initialState, error };

      expect(fromReducer.getError(state)).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;
      const state = { ...initialState, isLoading };

      expect(fromReducer.getIsLoading(state)).toBe(isLoading);
    });
  });

  describe('getResult() selector', () => {
    it('should return the `result` property from a given state', () => {
      const result = [1246];
      const state = { ...initialState, result };

      expect(fromReducer.getResult(state)).toBe(result);
    });
  });
});
