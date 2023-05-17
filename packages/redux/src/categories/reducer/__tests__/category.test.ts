import * as actionTypes from '../../actionTypes.js';
import * as fromReducer from '../category.js';
import { mockCategoryId } from 'tests/__fixtures__/categories/index.mjs';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { CategoryState } from '../../types/index.js';

let initialState: CategoryState;
const reducer = fromReducer.default;
const randomAction = { type: 'this_is_a_random_action' };
const id = 123;

describe('category redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
    });

    it('should handle FETCH_CATEGORY_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORY_REQUEST,
          meta: { id },
        }).error,
      ).toEqual({ [id]: null });
    });

    it('should handle FETCH_CATEGORY_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORY_FAILURE,
          meta: { id },
          payload: { error: expectedResult },
        }).error,
      ).toEqual({ [id]: expectedResult });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: { [mockCategoryId]: new Error('foo') as BlackoutError },
      };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_CATEGORY_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORY_REQUEST,
          meta: { id },
          payload: {
            result: 'foo',
            entities: { categories: {} },
          },
        }).isLoading,
      ).toEqual({ [id]: true });
    });

    it('should handle FETCH_CATEGORY_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORY_FAILURE,
          meta: { id },
          payload: { error: '' },
        }).isLoading,
      ).toEqual({ [id]: false });
    });

    it('should handle FETCH_CATEGORY_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CATEGORY_SUCCESS,
          meta: { id },
          payload: {
            result: ['foo', 'bar'],
            entities: { categories: {} },
          },
        }).isLoading,
      ).toEqual({ [id]: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: { [mockCategoryId]: true } };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = { [mockCategoryId]: new Error('error') as BlackoutError };
      const state = { ...initialState, error };

      expect(fromReducer.getError(state)).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = { [mockCategoryId]: true };
      const state = { ...initialState, isLoading };

      expect(fromReducer.getIsLoading(state)).toBe(isLoading);
    });
  });
});
