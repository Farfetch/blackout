import * as actionTypes from '../actionTypes.js';
import reducer, * as fromReducer from '../reducer.js';
import type { AuthenticationState } from '../types/index.js';

let initialState: AuthenticationState;
const mockAction = { type: 'this_is_a_mock_action' };

describe('authentication reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('token() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction).token;

      expect(state).toEqual(initialState.token);
    });

    it.each([
      actionTypes.REMOVE_TOKEN_REQUEST,
      actionTypes.CREATE_USER_TOKEN_REQUEST,
      actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_REQUEST,
      actionTypes.REFRESH_TOKEN_REQUEST,
    ])('should handle %s action type', actionType => {
      const token = {
        result: null,
        error: null,
        isLoading: true,
      };

      expect(
        reducer(undefined, {
          type: actionType,
        }).token,
      ).toEqual(token);
    });

    it.each([
      actionTypes.REMOVE_TOKEN_FAILURE,
      actionTypes.CREATE_USER_TOKEN_FAILURE,
      actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_FAILURE,
      actionTypes.REFRESH_TOKEN_FAILURE,
    ])('should handle %s action type', actionType => {
      const mockError = 'mocked error';
      const token = {
        result: null,
        error: 'mocked error',
        isLoading: false,
      };

      expect(
        reducer(undefined, {
          type: actionType,
          payload: { error: mockError },
        }).token,
      ).toEqual(token);
    });

    it.each([
      actionTypes.CREATE_USER_TOKEN_SUCCESS,
      actionTypes.CREATE_CLIENT_CREDENTIALS_TOKEN_SUCCESS,
      actionTypes.REFRESH_TOKEN_SUCCESS,
    ])('should handle %s action type', actionType => {
      const result = {
        accessToken: '04b55bb7-f1af-4b45-aa10-5c4667a48936',
        expiresIn: '1200',
        refreshToken:
          'd5b4f8e72f652d9e048d7e5c75f1ec97bb9eeaec2b080497eba0965abc0ade4d',
        error: null,
      };
      const token = {
        result,
        error: initialState.token.error,
        isLoading: false,
      };

      expect(
        reducer(undefined, {
          type: actionType,
          payload: result,
        }).token,
      ).toEqual(token);
    });

    it(`should handle ${actionTypes.REMOVE_TOKEN_SUCCESS} action type`, () => {
      const state = {
        token: {
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
      const token = {
        result: initialState.token.result,
        error: initialState.token.error,
        isLoading: false,
      };
      const reducerResult = reducer(state as AuthenticationState, {
        type: actionTypes.REMOVE_TOKEN_SUCCESS,
      });

      expect(reducerResult.token).toEqual(token);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        token: {
          result: null,
          error: 'error',
          isLoading: false,
        },
      } as unknown as AuthenticationState;

      expect(reducer(state, mockAction).token).toBe(state.token);
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
      token: { ...subAreaResult, result: null },
    };

    const extendedSubAreasNames = ['Token'];
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

    type PickSubAreaSelectors<T> = T extends `get${any}` ? T : never;

    type ReducerSubAreaSelectors = PickSubAreaSelectors<
      keyof typeof fromReducer
    >;

    type ReducerSubAreaSelector = (typeof fromReducer)[ReducerSubAreaSelectors];

    function assertSubAreaSelector(
      selector: ReducerSubAreaSelector,
      expectedState: AuthenticationState[keyof AuthenticationState],
    ) {
      expect(selector(subAreas)).toEqual(expectedState);
    }

    it.each(subAreaNames)(
      'return the `%s` property from a given state',
      subArea => {
        const { [`get${subArea}` as keyof typeof subAreas]: reducerSelector } =
          fromReducer;

        expect(reducerSelector).toBeInstanceOf(Function);

        extendedSubAreasNames.includes(subArea)
          ? assertSubAreaSelector(reducerSelector as ReducerSubAreaSelector, {
              ...subAreaResult,
              result: null,
            })
          : assertSubAreaSelector(
              reducerSelector as ReducerSubAreaSelector,
              subAreaResult,
            );
      },
    );
  });
});
