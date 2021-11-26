import * as fromReducer from '../reducer';
import { getInitialState } from '../../../tests';
import { mockResponse } from 'tests/__fixtures__/authentication';
import reducer, { actionTypes, entitiesMapper } from '..';

let initialState;

describe('authentication reducer', () => {
  beforeEach(() => {
    initialState = getInitialState(reducer());
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.LOGIN_FAILURE,
      actionTypes.LOGOUT_FAILURE,
      actionTypes.REGISTER_FAILURE,
      actionTypes.PASSWORD_CHANGE_FAILURE,
      actionTypes.PASSWORD_RECOVER_FAILURE,
      actionTypes.PASSWORD_RESET_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      expect(
        reducer(undefined, {
          payload: { error },
          type: actionType,
        }).error,
      ).toBe(error);
    });

    it.each([
      actionTypes.LOGIN_REQUEST,
      actionTypes.LOGOUT_REQUEST,
      actionTypes.REGISTER_REQUEST,
      actionTypes.PASSWORD_CHANGE_REQUEST,
      actionTypes.PASSWORD_RECOVER_REQUEST,
      actionTypes.PASSWORD_RESET_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(
          {
            error: 'previous error',
          },
          {
            type: actionType,
          },
        ).error,
      ).toBe(initialState.error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
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

    it.each([
      actionTypes.LOGIN_SUCCESS,
      actionTypes.LOGOUT_SUCCESS,
      actionTypes.REGISTER_SUCCESS,
      actionTypes.PASSWORD_CHANGE_SUCCESS,
      actionTypes.PASSWORD_RECOVER_SUCCESS,
      actionTypes.PASSWORD_RESET_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it.each([
      actionTypes.LOGIN_FAILURE,
      actionTypes.LOGOUT_FAILURE,
      actionTypes.REGISTER_FAILURE,
      actionTypes.PASSWORD_CHANGE_FAILURE,
      actionTypes.PASSWORD_RECOVER_FAILURE,
      actionTypes.PASSWORD_RESET_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    const mockUserID = 123456;

    it.each([actionTypes.LOGIN_SUCCESS, actionTypes.REGISTER_SUCCESS])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
            payload: { result: mockUserID },
          }).id,
        ).toBe(mockUserID);
      },
    );

    it('should handle @farfetch/blackout-client/LOGOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: '@farfetch/blackout-client/LOGOUT_SUCCESS',
        }).id,
      ).toBe(initialState.id);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { id: 'foo' };

      expect(reducer(state).id).toBe(state.id);
    });
  });

  describe('userToken() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().userToken;

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
      const reducerResult = reducer(state, {
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

      expect(reducer(state).userToken).toBe(state.userToken);
    });
  });

  describe('userImpersonation() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().userImpersonation;
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
      const error = 'final errir';
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

      expect(reducer(state).userImpersonation).toBe(state.userImpersonation);
    });
  });

  describe('getId() selector', () => {
    it('should return the `id` property from a given state', () => {
      const id = 123456;

      expect(fromReducer.getId({ id })).toBe(id);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = 'foo';

      expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
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
        const { [`get${subArea}`]: reducerSelector } = fromReducer;

        extendedSubAreasNames.includes(subArea)
          ? expect(reducerSelector(subAreas)).toEqual({
              ...subAreaResult,
              result: null,
            })
          : expect(reducerSelector(subAreas)).toEqual(subAreaResult);
      },
    );
  });

  describe('entitiesMapper()', () => {
    describe('for LOGOUT_SUCCESS', () => {
      const userEntity = {
        ...mockResponse,
      };
      const state = {
        user: userEntity,
      };
      const newState = {
        user: {},
      };

      it('should handle LOGOUT_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.LOGOUT_SUCCESS](state, {
            type: actionTypes.LOGOUT_SUCCESS,
          }),
        ).toEqual(newState);
      });
    });
  });
});
