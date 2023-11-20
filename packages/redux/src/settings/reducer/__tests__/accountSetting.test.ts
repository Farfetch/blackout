import * as actionTypes from '../../actionTypes.js';
import * as fromReducer from '../accountSetting.js';
import { accountSettingReducer as reducer } from '../index.js';
import { toBlackoutError } from '@farfetch/blackout-client';
import type { AccountSettingState } from '../../types/index.js';

let initialState: AccountSettingState;
const randomAction = { type: 'this_is_a_random_action' };
const settingId = 'testId';
const setting = {
  id: settingId,
  type: 'Generic',
  channelCode: 'string',
  details: {},
};

describe('account setting redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle FETCH_ACCOUNT_SETTING_REQUEST action type', () => {
      expect(
        reducer(
          {
            ...initialState,
          },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTING_REQUEST,
            meta: { id: settingId },
          },
        ).error,
      ).toStrictEqual({ [settingId]: null });
    });

    it('should handle FETCH_ACCOUNT_SETTING_FAILURE action type', () => {
      const error = 'foo';
      const expectedResult = { [settingId]: error };

      expect(
        reducer(
          {
            ...initialState,
          },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTING_FAILURE,
            meta: { id: settingId },
            payload: { error },
          },
        ).error,
      ).toStrictEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const error = toBlackoutError(new Error('foo'));
      const state = {
        ...initialState,
        error: { [settingId]: error },
      };

      expect(reducer(state, randomAction).error).toStrictEqual({
        [settingId]: error,
      });
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_ACCOUNT_SETTING_REQUEST action type', () => {
      expect(
        reducer(
          { ...initialState },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTING_REQUEST,
            payload: { setting },
            meta: { id: settingId },
          },
        ).isLoading[settingId],
      ).toBe(true);
    });

    it('should handle FETCH_ACCOUNT_SETTING_FAILURE action type', () => {
      expect(
        reducer(
          { ...initialState },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTING_FAILURE,
            payload: { error: '' },
            meta: { id: settingId },
          },
        ).isLoading[settingId],
      ).toBe(false);
    });

    it('should handle FETCH_ACCOUNT_SETTING_SUCCESS action type', () => {
      expect(
        reducer(
          { ...initialState },
          {
            type: actionTypes.FETCH_ACCOUNT_SETTING_SUCCESS,
            payload: {
              id: settingId,
              tenant: 0,
              type: 'Generic',
              channelCode: 'string',
              details: {},
            },
            meta: { id: settingId },
          },
        ).isLoading[settingId],
      ).toBe(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: { [settingId]: false } };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = toBlackoutError(new Error('error'));
      const state = { ...initialState, error: { [settingId]: error } };

      expect(fromReducer.getError(state)?.[settingId]).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;
      const state = { ...initialState, isLoading: { [settingId]: isLoading } };

      expect(fromReducer.getIsLoading(state)[settingId]).toBe(isLoading);
    });
  });

  describe('getResult() selector', () => {
    it('should return the `result` property from a given state', () => {
      const state = { ...initialState, result: { [settingId]: setting } };

      expect(fromReducer.getResult(state)?.[settingId]).toBe(setting);
    });
  });
});
