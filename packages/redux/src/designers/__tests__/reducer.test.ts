import * as fromReducer from '../reducer';
import { mockDesigners, mockHash } from 'tests/__fixtures__/designers';
import reducer, { actionTypes } from '../';

let initialState;
const randomAction = { type: 'this_is_a_random_action' };

describe('designers redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_DESIGNERS_STATE,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toEqual(initialState.error);
    });

    it('should handle FETCH_DESIGNERS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_DESIGNERS_REQUEST,
          meta: { hash: 'foo' },
        }).error,
      ).toEqual(initialState.error);
    });

    it('should handle FETCH_DESIGNERS_FAILURE action type', () => {
      const expectedResult = { 123: 'foo' };

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_DESIGNERS_FAILURE,
          payload: { error: 'foo' },
          meta: { hash: 123 },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toEqual(state.error);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toBe(initialState.result);
    });

    it('should handle FETCH_DESIGNERS_SUCCESS action type', () => {
      const result = mockDesigners[0];
      const hash = mockHash;
      const mockPayload = { result };

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_DESIGNERS_SUCCESS,
          payload: mockPayload,
          meta: { hash: mockHash },
        }).result,
      ).toEqual({ [hash]: result });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, result: { foo: 'bar' } };

      expect(reducer(state, randomAction).result).toBe(state.result);
    });
  });

  describe('hash() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).hash;

      expect(state).toBe(initialState.hash);
      expect(state).toBeNull();
    });

    it('should handle SET_DESIGNERS_RESULT_HASH action type', () => {
      const hash = 'foo';
      expect(
        reducer(undefined, {
          type: actionTypes.SET_DESIGNERS_RESULT_HASH,
          meta: { hash },
        }).hash,
      ).toBe(hash);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, hash: 'foo' };

      expect(reducer(state, randomAction).hash).toBe(state.hash);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_DESIGNERS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_DESIGNERS_REQUEST,
          meta: { hash: 'foo' },
        }).isLoading,
      ).toEqual({ foo: true });
    });

    it('should handle FETCH_DESIGNERS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_DESIGNERS_FAILURE,
          payload: { error: '' },
          meta: { hash: 'foo' },
        }).isLoading,
      ).toEqual({ foo: undefined });
    });

    it('should handle FETCH_DESIGNERS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_DESIGNERS_SUCCESS,
          payload: { result: [{ foo: 'bar' }] },
          meta: { hash: 'foo' },
        }).isLoading,
      ).toEqual({ foo: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: { 'foo-biz': false } };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = { [mockHash]: 'foo' };
      const state = { ...initialState, error };

      expect(fromReducer.getError(state)).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = { [mockHash]: true };
      const state = { ...initialState, isLoading };

      expect(fromReducer.getIsLoading(state)).toEqual(isLoading);
    });
  });

  describe('getHash() selector', () => {
    it('should return the `hash` property from a given state', () => {
      const hash = 'foo';
      const state = { ...initialState, hash };

      expect(fromReducer.getHash(state)).toEqual(hash);
    });
  });
});
