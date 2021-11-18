import * as fromReducer from '../reducer';
import { getInitialState } from '../../../../tests';
import { mockResponse } from '../__fixtures__/authentication.fixtures';
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

    it('should handle @farfetch/blackout-core/LOGOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: '@farfetch/blackout-core/LOGOUT_SUCCESS',
        }).id,
      ).toBe(initialState.id);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { id: 'foo' };

      expect(reducer(state).id).toBe(state.id);
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
      refreshToken: { ...subAreaResult },
      refreshEmailToken: { ...subAreaResult },
    };

    const subAreaNames = [
      'Login',
      'Logout',
      'Register',
      'ChangePassword',
      'RecoverPassword',
      'ResetPassword',
      'ValidateEmail',
      'RefreshToken',
      'RefreshEmailToken',
    ];

    it.each(subAreaNames)(
      'return the `%s` property from a given state',
      subArea => {
        const { [`get${subArea}`]: reducerSelector } = fromReducer;

        expect(reducerSelector(subAreas)).toEqual(subAreaResult);
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
