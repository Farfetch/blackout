import * as actionTypes from '../actionTypes';
import reducer, * as fromReducer from '../reducer';
import type { UsersState } from '../types';

let initialState: UsersState;
const randomAction = { type: 'this_is_a_random_action' };

describe('users redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state when `LOGOUT_SUCCESS` action is dispatched', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });

    it('should return the initial state when `RESET_USER_STATE` action is dispatched', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_USER_STATE,
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

    // Error status on FAILURE
    it.each([
      actionTypes.FETCH_USER_FAILURE,
      actionTypes.UPDATE_USER_FAILURE,
      actionTypes.CREATE_GUEST_USER_FAILURE,
      actionTypes.FETCH_GUEST_USER_FAILURE,
      actionTypes.LOGIN_FAILURE,
      actionTypes.LOGOUT_FAILURE,
      actionTypes.REGISTER_FAILURE,
      actionTypes.PASSWORD_CHANGE_FAILURE,
      actionTypes.PASSWORD_RECOVER_FAILURE,
      actionTypes.PASSWORD_RESET_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { error },
        type: actionType,
      });

      expect(reducerResult.error).toBe(error);
    });

    // Error status on REQUEST
    it.each([
      actionTypes.FETCH_USER_REQUEST,
      actionTypes.UPDATE_USER_REQUEST,
      actionTypes.CREATE_GUEST_USER_REQUEST,
      actionTypes.FETCH_GUEST_USER_REQUEST,
      actionTypes.RESET_USER_STATE,
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGOUT_REQUEST,
      actionTypes.PASSWORD_CHANGE_REQUEST,
      actionTypes.PASSWORD_RECOVER_REQUEST,
      actionTypes.PASSWORD_RESET_REQUEST,
      actionTypes.REGISTER_REQUEST,
    ])('should handle %s action type', actionType => {
      const reducerResult = reducer(undefined, {
        type: actionType,
      });

      expect(reducerResult.error).toBe(initialState.error);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = { ...initialState, error: 'foo' } as unknown as UsersState;

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).id;

      expect(state).toBe(initialState.id);
    });

    // Id value on SUCCESS
    it.each([
      actionTypes.FETCH_USER_SUCCESS,
      actionTypes.UPDATE_USER_SUCCESS,
      actionTypes.CREATE_GUEST_USER_SUCCESS,
      actionTypes.FETCH_GUEST_USER_SUCCESS,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.REGISTER_SUCCESS,
    ])('should handle %s action type', actionType => {
      const userId = 123;
      const reducerResult = reducer(undefined, {
        payload: { result: userId },
        type: actionType,
      });

      expect(reducerResult.id).toBe(userId);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, id: 'foo' } as unknown as UsersState;

      expect(reducer(state, randomAction).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    // Loading status on REQUEST
    it.each([
      actionTypes.FETCH_USER_REQUEST,
      actionTypes.UPDATE_USER_REQUEST,
      actionTypes.CREATE_GUEST_USER_REQUEST,
      actionTypes.FETCH_GUEST_USER_REQUEST,
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGOUT_REQUEST,
      actionTypes.REGISTER_REQUEST,
      actionTypes.PASSWORD_CHANGE_REQUEST,
      actionTypes.PASSWORD_RECOVER_REQUEST,
      actionTypes.PASSWORD_RESET_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    // Loading status on SUCCESS
    it.each([
      actionTypes.FETCH_USER_SUCCESS,
      actionTypes.UPDATE_USER_SUCCESS,
      actionTypes.CREATE_GUEST_USER_SUCCESS,
      actionTypes.FETCH_GUEST_USER_SUCCESS,
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGOUT_SUCCESS,
      actionTypes.REGISTER_SUCCESS,
      actionTypes.PASSWORD_CHANGE_SUCCESS,
      actionTypes.PASSWORD_RECOVER_SUCCESS,
      actionTypes.PASSWORD_RESET_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: 'foo' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    // Loading status on FAILURE
    it.each([
      actionTypes.FETCH_USER_FAILURE,
      actionTypes.UPDATE_USER_FAILURE,
      actionTypes.CREATE_GUEST_USER_FAILURE,
      actionTypes.FETCH_GUEST_USER_FAILURE,
      actionTypes.LOGIN_FAILURE,
      actionTypes.LOGOUT_FAILURE,
      actionTypes.REGISTER_FAILURE,
      actionTypes.PASSWORD_CHANGE_FAILURE,
      actionTypes.PASSWORD_RECOVER_FAILURE,
      actionTypes.PASSWORD_RESET_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: 'dummy_error' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: true };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });
});
