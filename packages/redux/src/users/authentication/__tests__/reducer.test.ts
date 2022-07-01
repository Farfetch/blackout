import * as actionTypes from '../actionTypes';
import { getInitialState } from '../../../../tests';
import reducer, * as fromReducer from '../reducer';
import type { AuthenticationState } from '../types';

let initialState: AuthenticationState;
const mockAction = { type: 'this_is_a_mock_action' };

describe('authentication reducer', () => {
  beforeEach(() => {
    initialState = getInitialState(reducer(undefined, mockAction));
  });

  describe('userToken() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction).userToken;

      expect(state).toEqual(initialState.userToken);
    });

    it.each([
      actionTypes.DELETE_USER_TOKEN_REQUEST,
      actionTypes.CREATE_USER_TOKEN_REQUEST,
      actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST,
      actionTypes.REFRESH_USER_TOKEN_REQUEST,
    ])('should handle %s action type', actionType => {
      const userToken = {
        result: null,
        error: null,
        isLoading: true,
      };
      expect(
        reducer(undefined, {
          type: actionType,
        }).userToken,
      ).toEqual(userToken);
    });

    it.each([
      actionTypes.DELETE_USER_TOKEN_FAILURE,
      actionTypes.CREATE_USER_TOKEN_FAILURE,
      actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE,
      actionTypes.REFRESH_USER_TOKEN_FAILURE,
    ])('should handle %s action type', actionType => {
      const mockError = 'mocked error';
      const userToken = {
        result: null,
        error: 'mocked error',
        isLoading: false,
      };
      expect(
        reducer(undefined, {
          type: actionType,
          payload: { error: mockError },
        }).userToken,
      ).toEqual(userToken);
    });

    it.each([
      actionTypes.CREATE_USER_TOKEN_SUCCESS,
      actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS,
      actionTypes.REFRESH_USER_TOKEN_SUCCESS,
    ])('should handle %s action type', actionType => {
      const result = {
        accessToken: '04b55bb7-f1af-4b45-aa10-5c4667a48936',
        expiresIn: '1200',
        refreshToken:
          'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
        error: null,
      };
      const userToken = {
        result,
        error: initialState.userToken.error,
        isLoading: false,
      };
      expect(
        reducer(undefined, {
          type: actionType,
          payload: result,
        }).userToken,
      ).toEqual(userToken);
    });

    it(`should handle ${actionTypes.DELETE_USER_TOKEN_SUCCESS} action type`, () => {
      const state = {
        userToken: {
          result: {
            accessToken: '04b55bb7-f1af-4b45-aa10-5c4667a48936',
            expiresIn: '1200',
            refreshToken:
              'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
          },
          error: null,
          isLoading: true,
        },
      };
      const userToken = {
        result: initialState.userToken.result,
        error: initialState.userToken.error,
        isLoading: false,
      };
      const reducerResult = reducer(state as AuthenticationState, {
        type: actionTypes.DELETE_USER_TOKEN_SUCCESS,
      });
      expect(reducerResult.userToken).toEqual(userToken);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        userToken: {
          result: null,
          error: 'error',
          isLoading: false,
        },
      };

      expect(reducer(state as AuthenticationState, mockAction).userToken).toBe(
        state.userToken,
      );
    });
  });

  describe('userImpersonation() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction).userImpersonation;
      expect(state).toEqual(initialState.userImpersonation);
    });

    it.each([
      actionTypes.DELETE_USER_IMPERSONATION_REQUEST,
      actionTypes.CREATE_USER_IMPERSONATION_REQUEST,
    ])('should handle %s action type', actionType => {
      const userImpersonation = {
        result: null,
        error: null,
        isLoading: true,
      };
      expect(
        reducer(undefined, {
          type: actionType,
        }).userImpersonation,
      ).toEqual(userImpersonation);
    });

    it(`should handle ${actionTypes.DELETE_USER_IMPERSONATION_SUCCESS} action type`, () => {
      const userImpersonation = {
        error: null,
        isLoading: false,
        result: null,
      };
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_USER_IMPERSONATION_SUCCESS,
        }).userImpersonation,
      ).toEqual(userImpersonation);
    });

    it(`should handle ${actionTypes.CREATE_USER_IMPERSONATION_SUCCESS} action type`, () => {
      const result = {
        accessToken: '60f9ff83-d723-4c5a-8268-00cee557083b',
        expiresIn: '3600',
        refreshToken: '',
        error: null,
      };
      const userImpersonation = {
        result,
        error: null,
        isLoading: false,
      };

      expect(
        reducer(undefined, {
          payload: result,
          type: actionTypes.CREATE_USER_IMPERSONATION_SUCCESS,
        }).userImpersonation,
      ).toEqual(userImpersonation);
    });

    it.each([
      actionTypes.DELETE_USER_IMPERSONATION_FAILURE,
      actionTypes.CREATE_USER_IMPERSONATION_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'final error';
      const userImpersonation = {
        error,
        isLoading: false,
        result: null,
      };
      expect(
        reducer(undefined, {
          payload: { error },
          type: actionType,
        }).userImpersonation,
      ).toEqual(userImpersonation);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        userImpersonation: {
          result: null,
          error: 'error',
          isLoading: false,
        },
      };

      expect(
        reducer(state as AuthenticationState, mockAction).userImpersonation,
      ).toBe(state.userImpersonation);
    });
  });

  describe('Sub-areas', () => {
    const subAreaResult = {
      error: null,
      isLoading: false,
    };

    const subAreas = {
      login: { ...subAreaResult },
      logout: { ...subAreaResult },
      register: { ...subAreaResult },
      changePassword: { ...subAreaResult },
      recoverPassword: { ...subAreaResult },
      resetPassword: { ...subAreaResult },
      validateEmail: { ...subAreaResult },
      refreshEmailToken: { ...subAreaResult },
      userToken: { ...subAreaResult, result: null },
      userImpersonation: { ...subAreaResult, result: null },
    };

    const extendedSubAreasNames = ['UserToken', 'UserImpersonation'];
    const subAreaNames = [
      'Login',
      'Logout',
      'Register',
      'ChangePassword',
      'RecoverPassword',
      'ResetPassword',
      'ValidateEmail',
      'RefreshEmailToken',
      ...extendedSubAreasNames,
    ];

    it.each(subAreaNames)(
      'return the `%s` property from a given state',
      subArea => {
        const { [`get${subArea}` as keyof typeof subAreas]: reducerSelector } =
          fromReducer;

        extendedSubAreasNames.includes(subArea)
          ? expect(reducerSelector(subAreas, mockAction)).toEqual({
              ...subAreaResult,
              result: null,
            })
          : expect(reducerSelector(subAreas, mockAction)).toEqual(
              subAreaResult,
            );
      },
    );
  });
});
