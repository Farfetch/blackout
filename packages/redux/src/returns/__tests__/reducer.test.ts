import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../../users/authentication/actionTypes';
import { returnId } from 'tests/__fixtures__/returns';
import { toBlackoutError } from '@farfetch/blackout-client';
import omit from 'lodash/omit';
import reducer, { entitiesMapper } from '../reducer';
import type { ReturnsState } from '../types';
import type { StoreState } from '../../types';

let initialState: ReturnsState;
const randomAction = { type: 'this_is_a_random_action' };

describe('returns reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it.each([
      actionTypes.RESET_RETURNS,
      LOGOUT_SUCCESS,
      LOGIN_SUCCESS,
      FETCH_USER_SUCCESS,
      REGISTER_SUCCESS,
    ])('should return initial state on %s action', actionType => {
      expect(
        reducer(
          {
            error: null,
            isLoading: true,
            id: null,
            pickupCapabilities: {
              error: null,
              isLoading: true,
            },
            returns: {
              error: null,
              isLoading: false,
            },
          },
          {
            type: actionType,
            payload: {},
          },
        ),
      ).toMatchObject(initialState);
    });
  });

  describe('error() reducer', () => {
    const expectedResult = new Error();

    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_RETURN_REQUEST,
      actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST,
      actionTypes.FETCH_RETURN_REQUEST,
      actionTypes.UPDATE_RETURN_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).error,
      ).toBe(initialState.error);
    });

    it('should handle CREATE_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.CREATE_RETURN_FAILURE,
        }).error,
      ).toStrictEqual(expectedResult);
    });

    it('should handle FETCH_PICKUP_CAPABILITIES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE,
        }).error,
      ).toStrictEqual(expectedResult);
    });

    it('should handle FETCH_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.FETCH_RETURN_FAILURE,
        }).error,
      ).toStrictEqual(expectedResult);
    });

    it('should handle UPDATE_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.UPDATE_RETURN_FAILURE,
        }).error,
      ).toStrictEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('foo')),
      } as ReturnsState;

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it('should handle CREATE_RETURN_SUCCESS action type', () => {
      const expectedResult = {
        result: returnId,
      } as unknown as string as unknown as string;

      expect(
        reducer(undefined, {
          payload: expectedResult,
          type: actionTypes.CREATE_RETURN_SUCCESS,
        }).id,
      ).toBe(returnId);
    });

    it('should handle FETCH_RETURN_SUCCESS action type', () => {
      const expectedResult = {
        result: returnId,
      } as unknown as string as unknown as string;

      expect(
        reducer(undefined, {
          payload: expectedResult,
          type: actionTypes.FETCH_RETURN_SUCCESS,
        }).id,
      ).toBe(returnId);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, id: 32283248 };

      expect(reducer(state, randomAction).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
      actionTypes.CREATE_RETURN_REQUEST,
      actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_REQUEST,
      actionTypes.FETCH_RETURN_REQUEST,
      actionTypes.UPDATE_RETURN_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    it.each([
      actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_SUCCESS,
      actionTypes.UPDATE_RETURN_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_RETURN_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_RETURN_SUCCESS,
          payload: { result: returnId } as unknown as string,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_RETURN_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_RETURN_SUCCESS,
          payload: { result: returnId } as unknown as string,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.CREATE_RETURN_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_PICKUP_CAPABILITIES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.FETCH_RETURN_PICKUP_CAPABILITIES_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.FETCH_RETURN_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_RETURN_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: new Error() },
          type: actionTypes.UPDATE_RETURN_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    const state = {
      error: null,
      id: null,
      isLoading: false,
      returns: {
        error: null,
        isLoading: false,
      },
      returnItems: {
        error: null,
        isLoading: false,
      },
      pickupCapabilities: {
        error: null,
        isLoading: false,
      },
    } as unknown as NonNullable<StoreState['entities']>;

    const expectedResult = {
      error: null,
      id: null,
      isLoading: false,
      pickupCapabilities: {
        error: null,
        isLoading: false,
      },
    };

    it('should handle RESET_RETURNS action WITH reset entities flag ', () => {
      expect(
        entitiesMapper[actionTypes.RESET_RETURNS](state, {
          meta: { resetEntities: true },
          type: actionTypes.RESET_RETURNS,
        }),
      ).toEqual(expectedResult);
    });

    it('should handle RESET_RETURNS action WITHOUT reset entities flag ', () => {
      expect(
        entitiesMapper[actionTypes.RESET_RETURNS](state, {
          meta: { resetEntities: false },
          type: actionTypes.RESET_RETURNS,
        }),
      ).toEqual(state);
    });

    describe('other actions reset handling', () => {
      it.each([
        LOGOUT_SUCCESS,
        LOGIN_SUCCESS,
        FETCH_USER_SUCCESS,
        REGISTER_SUCCESS,
      ])('should return initial state on %s action', actionType => {
        const entitiesState = {
          returns: {},
          returnItems: {},
          dummy: {
            ABCDEF: { id: 'ABCDEF' },
          },
        };

        const expectedResult = omit(entitiesState, ['returns', 'returnItems']);

        expect(
          entitiesMapper[actionType as keyof typeof entitiesMapper](
            entitiesState,
            { type: actionType },
          ),
        ).toEqual(expectedResult);
      });
    });
  });

  describe('getId() selector', () => {
    it('should return the `id` property from a given state', () => {
      const id = 32283248;

      expect(fromReducer.getId({ ...initialState, id })).toBe(id);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = toBlackoutError(new Error('foo'));
      expect(fromReducer.getError({ ...initialState, error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = false;

      expect(fromReducer.getIsLoading({ ...initialState, isLoading })).toBe(
        isLoading,
      );
    });
  });
});
