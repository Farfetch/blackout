import * as actionTypes from '../actionTypes';
import { toBlackoutError, UserAttribute } from '@farfetch/blackout-client';
import reducer, * as fromReducer from '../reducer';
import type { UserAttributesState } from '../../types';

let initialState: UserAttributesState;

describe('attributes reducers', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const newState = reducer(undefined, { type: 'INIT' }).result;

      expect(newState).toBe(initialState.result);
      expect(newState).toBeNull();
    });

    it('should handle FETCH_USER_ATTRIBUTES_SUCCESS action type', () => {
      const newResult = [{ id: '111' }, { id: '222' }] as UserAttribute[];
      const previousState = {
        result: [{ id: '333' }],
      } as unknown as UserAttributesState;

      const newState = reducer(previousState, {
        payload: newResult,
        type: actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS,
      });

      expect(newState.result).toEqual(newResult);
    });

    it('should handle FETCH_USER_ATTRIBUTE_SUCCESS action type', () => {
      const newResult = { id: '111' } as UserAttribute;

      let previousState = {
        result: [{ id: '333' }],
      } as unknown as UserAttributesState;

      const expectedResult = [{ id: '333' }, { id: '111' }] as UserAttribute[];

      let newState = reducer(previousState, {
        payload: newResult,
        type: actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS,
      });

      expect(newState.result).toEqual(expectedResult);

      previousState = {
        result: initialState.result,
      } as unknown as UserAttributesState;

      newState = reducer(previousState, {
        payload: newResult,
        type: actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS,
      });

      expect(newState.result).toEqual([newResult]);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        result: [{ id: '111' }],
      } as unknown as UserAttributesState;

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
    it.each([
      actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
      actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
      actionTypes.FETCH_USER_ATTRIBUTE_FAILURE,
      actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE,
      actionTypes.SET_USER_ATTRIBUTE_FAILURE,
      actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      const reducerResult = reducer(undefined, {
        payload: { error },
        type: actionType,
      });

      expect(reducerResult.error).toBe(error);
    });

    // Error value on REQUEST
    it.each([
      actionTypes.CREATE_USER_ATTRIBUTES_REQUEST,
      actionTypes.FETCH_USER_ATTRIBUTES_REQUEST,
      actionTypes.FETCH_USER_ATTRIBUTE_REQUEST,
      actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST,
      actionTypes.SET_USER_ATTRIBUTE_REQUEST,
      actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST,
    ])('should handle %s action type', actionType => {
      const previousState = {
        ...initialState,
        error: toBlackoutError(new Error('foo')),
      };
      const reducerResult = reducer(previousState, {
        type: actionType,
      });

      expect(reducerResult.error).toBe(initialState.error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: 'foo',
      } as unknown as UserAttributesState;

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
    it.each([
      actionTypes.CREATE_USER_ATTRIBUTES_REQUEST,
      actionTypes.FETCH_USER_ATTRIBUTES_REQUEST,
      actionTypes.FETCH_USER_ATTRIBUTE_REQUEST,
      actionTypes.REMOVE_USER_ATTRIBUTE_REQUEST,
      actionTypes.SET_USER_ATTRIBUTE_REQUEST,
      actionTypes.UPDATE_USER_ATTRIBUTE_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    // Loading status on SUCCESS
    it.each([
      actionTypes.CREATE_USER_ATTRIBUTES_SUCCESS,
      actionTypes.FETCH_USER_ATTRIBUTES_SUCCESS,
      actionTypes.FETCH_USER_ATTRIBUTE_SUCCESS,
      actionTypes.REMOVE_USER_ATTRIBUTE_SUCCESS,
      actionTypes.SET_USER_ATTRIBUTE_SUCCESS,
      actionTypes.UPDATE_USER_ATTRIBUTE_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    // Loading status on FAILURE
    it.each([
      actionTypes.CREATE_USER_ATTRIBUTES_FAILURE,
      actionTypes.FETCH_USER_ATTRIBUTES_FAILURE,
      actionTypes.FETCH_USER_ATTRIBUTE_FAILURE,
      actionTypes.REMOVE_USER_ATTRIBUTE_FAILURE,
      actionTypes.SET_USER_ATTRIBUTE_FAILURE,
      actionTypes.UPDATE_USER_ATTRIBUTE_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        isLoading: true,
      } as unknown as UserAttributesState;

      const randomAction = {
        type: 'random_action',
      };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });
});
