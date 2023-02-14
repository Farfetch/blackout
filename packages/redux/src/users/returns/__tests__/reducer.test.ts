import * as actionTypes from '../actionTypes';
import { BlackoutError, toBlackoutError } from '@farfetch/blackout-client';
import { mockNormalizedUserReturnsResponse } from 'tests/__fixtures__/users';
import reducer, * as fromReducer from '../reducer';
import type { UserReturnsState } from '../types';

let initialState: UserReturnsState;

describe('returns reducers', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const newState = reducer(undefined, { type: 'INIT' }).result;

      expect(newState).toBe(initialState.result);
      expect(newState).toBeNull();
    });

    it('should handle FETCH_USER_RETURNS_SUCCESS action type', () => {
      const newResult = {
        result: {
          number: 1,
          totalPages: 1,
          totalItems: 1,
          entries: [{ id: '111' }, { id: '222' }],
        },
      };
      const previousState = {
        error: null,
        isLoading: false,
        result: {
          number: 1,
          totalPages: 1,
          totalItems: 1,
          entries: [],
        },
      };

      const newState = reducer(previousState, {
        payload: newResult,
        type: actionTypes.FETCH_USER_RETURNS_SUCCESS,
      });

      expect(newState.result).toEqual(newResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        result: mockNormalizedUserReturnsResponse.result,
        error: null,
        isLoading: false,
      };

      const randomActionWithResult = {
        type: 'random',
        result: [{ id: '222' }],
      };

      expect(reducer(state, randomActionWithResult).result).toBe(state.result);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, { type: 'INIT' }).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    // Error value on FAILURE
    it.each([actionTypes.FETCH_USER_RETURNS_FAILURE])(
      'should handle %s action type',
      actionType => {
        const error = 'foo';
        const mockState = { ...initialState, error: null };
        const reducerResult = reducer(mockState, {
          payload: { error },
          type: actionType,
        });

        expect(reducerResult.error).toBe(error);
      },
    );

    // Error value on REQUEST
    it.each([actionTypes.FETCH_USER_RETURNS_REQUEST])(
      'should handle %s action type',
      actionType => {
        const previousState = {
          ...initialState,
          error: toBlackoutError(new Error('foo')),
        };
        const reducerResult = reducer(previousState, {
          type: actionType,
        });

        expect(reducerResult.error).toBe(initialState.error);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: new Error('foo') as BlackoutError,
      };

      const randomActionWithError = {
        type: 'random',
        payload: { error: new Error('dummy error') },
      };

      expect(reducer(state, randomActionWithError).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const newState = reducer(undefined, { type: 'INIT' }).isLoading;

      expect(newState).toBe(initialState.isLoading);
      expect(newState).toBe(false);
    });

    // Loading status on REQUEST
    it.each([actionTypes.FETCH_USER_RETURNS_REQUEST])(
      'should handle %s action type',
      actionType => {
        const mockState = { ...initialState, isLoading: false };
        expect(
          reducer(mockState, {
            type: actionType,
          }).isLoading,
        ).toBe(true);
      },
    );

    // Loading status on SUCCESS
    it.each([actionTypes.FETCH_USER_RETURNS_SUCCESS])(
      'should handle %s action type',
      actionType => {
        const mockState = { ...initialState, isLoading: true };
        expect(
          reducer(mockState, {
            payload: { result: '' },
            type: actionType,
          }).isLoading,
        ).toBe(initialState.isLoading);
      },
    );

    // Loading status on FAILURE
    it.each([actionTypes.FETCH_USER_RETURNS_FAILURE])(
      'should handle %s action type',
      actionType => {
        const mockState = { ...initialState, isLoading: true };
        expect(
          reducer(mockState, {
            payload: { error: '' },
            type: actionType,
          }).isLoading,
        ).toBe(initialState.isLoading);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        isLoading: true,
      };

      const randomAction = {
        type: 'random_action',
      };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });
});
