import * as actionTypes from '../../actionTypes.js';
import * as fromReducer from '../accountSettings.js';
import { accountSettingsReducer as reducer } from '../index.js';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { AccountSettingsState } from '../../types/index.js';

let initialState: AccountSettingsState;
const randomAction = { type: 'this_is_a_random_action' };
const hash = 'noqueries';
const setting = {
  id: 'testId',
  type: 'Generic',
  channelCode: 'string',
  details: {},
};

describe('account settings redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle FETCH_ACCOUNT_SETTINGS_REQUEST action type', () => {
      expect(
        reducer(
          { ...initialState },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTINGS_REQUEST,
            meta: { hash },
          },
        ).error,
      ).toStrictEqual({ [hash]: null });
    });

    it('should handle FETCH_ACCOUNT_SETTINGS_FAILURE action type', () => {
      const expectedResult = { [hash]: 'foo' };

      expect(
        reducer(
          { ...initialState },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTINGS_FAILURE,
            payload: { error: 'foo' },
            meta: { hash },
          },
        ).error,
      ).toStrictEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: { [hash]: toBlackoutError(new Error('foo')) },
      };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer({ ...initialState }, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_ACCOUNT_SETTINGS_REQUEST action type', () => {
      expect(
        reducer(
          { ...initialState },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTINGS_REQUEST,
            payload: {
              result: 'foo',
            },
            meta: {
              hash,
            },
          },
        ).isLoading,
      ).toStrictEqual({ [hash]: true });
    });

    it('should handle FETCH_ACCOUNT_SETTINGS_FAILURE action type', () => {
      expect(
        reducer(
          { ...initialState },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTINGS_FAILURE,
            payload: { error: '' },
            meta: {
              hash,
            },
          },
        ).isLoading,
      ).toStrictEqual({ [hash]: false });
    });

    it('should handle FETCH_ACCOUNT_SETTINGS_SUCCESS action type', () => {
      expect(
        reducer(
          { ...initialState },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTINGS_SUCCESS,
            payload: {
              result: {
                entries: [],
                number: 123,
                totalItems: 1,
                totalPages: 1,
              },
            },
            meta: {
              hash,
            },
          },
        ).isLoading,
      ).toEqual({ [hash]: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: { [hash]: false } };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = { [hash]: toBlackoutError(new Error('error')) };
      const state = { ...initialState, error };

      expect(fromReducer.getError(state)).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = { [hash]: true };
      const state = { ...initialState, isLoading };

      expect(fromReducer.getIsLoading(state)).toBe(isLoading);
    });
  });

  describe('getResult() selector', () => {
    it('should return the `result` property from a given state', () => {
      const result = { [hash]: [setting] };
      const state = { ...initialState, result };

      expect(fromReducer.getResult(state)).toBe(result);
    });
  });
});
