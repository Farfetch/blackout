import * as fromReducer from '../reducer';
import reducer, { actionTypes } from '../';

let initialState;

describe('designers redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_DESIGNERS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toEqual(initialState.error);
      expect(state).toEqual({});
    });

    it('should handle GET_DESIGNERS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_DESIGNERS_REQUEST,
          payload: { hash: 'foo' },
        }).error,
      ).toEqual(initialState.error);
    });

    it('should handle GET_DESIGNERS_FAILURE action type', () => {
      const expectedResult = { 123: 'foo' };

      expect(
        reducer(undefined, {
          type: actionTypes.GET_DESIGNERS_FAILURE,
          payload: { hash: 123, error: 'foo' },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toEqual(state.error);
    });
  });

  describe('hash() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().hash;

      expect(state).toBe(initialState.hash);
      expect(state).toBeNull();
    });

    it('should handle SET_DESIGNER_RESULT_HASH action type', () => {
      const hash = 'foo';
      expect(
        reducer(undefined, {
          type: actionTypes.SET_DESIGNER_RESULT_HASH,
          payload: { hash },
        }).hash,
      ).toBe(hash);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { hash: 'foo' };

      expect(reducer(state).hash).toBe(state.hash);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle GET_DESIGNERS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_DESIGNERS_REQUEST,
          payload: { hash: 'foo' },
        }).isLoading,
      ).toEqual({ foo: true });
    });

    it('should handle GET_DESIGNERS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_DESIGNERS_FAILURE,
          payload: { error: '', hash: 'foo' },
        }).isLoading,
      ).toEqual({ foo: undefined });
    });

    it('should handle GET_DESIGNERS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_DESIGNERS_SUCCESS,
          payload: { hash: 'foo', result: [{ foo: 'bar' }] },
        }).isLoading,
      ).toEqual({ foo: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: { 'foo-biz': false } };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
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
      const isLoading = true;

      expect(fromReducer.getIsLoading({ isLoading })).toEqual(isLoading);
    });
  });

  describe('getHash() selector', () => {
    it('should return the `hash` property from a given state', () => {
      const hash = 'foo';

      expect(fromReducer.getHash({ hash })).toEqual(hash);
    });
  });
});
