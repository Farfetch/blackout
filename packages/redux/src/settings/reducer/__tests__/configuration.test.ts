import * as actionTypes from '../../actionTypes';
import * as fromReducer from '../configuration';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { ConfigurationState } from '../../types';

let initialState: ConfigurationState;
const reducer = fromReducer.default;
const randomAction = { type: 'this_is_a_random_action' };
const code = 123;

describe('configuration redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
    });

    it('should handle FETCH_CONFIGURATION_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATION_REQUEST,
          meta: { code },
        }).error,
      ).toEqual({ [code]: null });
    });

    it('should handle FETCH_CONFIGURATION_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATION_FAILURE,
          meta: { code },
          payload: { error: expectedResult },
        }).error,
      ).toEqual({ [code]: expectedResult });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: { [code]: toBlackoutError(new Error('foo')) },
      };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_CONFIGURATION_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATION_REQUEST,
          meta: { code },
          payload: {
            result: 'foo',
            entities: { configurations: {} },
          },
        }).isLoading,
      ).toEqual({ [code]: true });
    });

    it('should handle FETCH_CONFIGURATION_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATION_FAILURE,
          meta: { code },
          payload: { error: '' },
        }).isLoading,
      ).toEqual({ [code]: false });
    });

    it('should handle FETCH_CONFIGURATION_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CONFIGURATION_SUCCESS,
          meta: { code },
          payload: {
            result: ['foo', 'bar'],
            entities: { configurations: {} },
          },
        }).isLoading,
      ).toEqual({ [code]: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: { [code]: false } };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = { [code]: toBlackoutError(new Error('error')) };
      const state = { ...initialState, error };

      expect(fromReducer.getError(state)).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = { [code]: true };
      const state = { ...initialState, isLoading };

      expect(fromReducer.getIsLoading(state)).toBe(isLoading);
    });
  });
});
