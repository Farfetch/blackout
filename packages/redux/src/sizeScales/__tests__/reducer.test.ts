import * as actionTypes from '../actionTypes';
import { mockQuery, mockSizeScaleId } from 'tests/__fixtures__/sizeScales';
import reducer, * as fromReducer from '../reducer';

const randomAction = { type: 'this_is_a_random_action' };
let initialState;

describe('size scales redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SIZE_SCALES_STATE,
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

    it('should handle FETCH_SIZE_SCALES_REQUEST action type', () => {
      const expectedResult = initialState.error;

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALES_REQUEST,
          meta: { query: {} },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle FETCH_SIZE_SCALES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALES_FAILURE,
          payload: {
            error: expectedResult,
          },
          meta: { query: {} },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle FETCH_SIZE_SCALES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALES_REQUEST,
          meta: { query: {} },
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle FETCH_SIZE_SCALES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALES_FAILURE,
          meta: { query: {} },
          payload: { error: 'Error - Not loaded' },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_SIZE_SCALES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALES_SUCCESS,
          meta: { query: {} },
          payload: { result: { foo: 'bar' } },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('sizeScale() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).sizeScale;

      expect(state).toEqual(initialState.sizeScale);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle FETCH_SIZE_SCALE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALE_REQUEST,
          meta: { sizeScaleId: mockSizeScaleId },
        }).sizeScale,
      ).toEqual({
        error: { [mockSizeScaleId]: undefined },
        isLoading: { [mockSizeScaleId]: true },
      });
    });

    it('should handle FETCH_SIZE_SCALES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALES_REQUEST,
          meta: { query: mockQuery },
        }).sizeScale,
      ).toEqual({
        error: { [`categoryId_${mockQuery.categoryId}`]: undefined },
        isLoading: {
          [`categoryId_${mockQuery.categoryId}`]: true,
        },
      });
    });

    it('should handle FETCH_SIZE_SCALE_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALE_SUCCESS,
          meta: { sizeScaleId: mockSizeScaleId },
          payload: { result: { foo: 'bar' } },
        }).sizeScale,
      ).toEqual({ error: {}, isLoading: { [mockSizeScaleId]: false } });
    });

    it('should handle FETCH_SIZE_SCALES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALES_SUCCESS,
          meta: { query: mockQuery },
          payload: { result: { foo: 'bar' } },
        }).sizeScale,
      ).toEqual({
        error: {},
        isLoading: {
          [`categoryId_${mockQuery.categoryId}`]: false,
        },
      });
    });

    it('should handle FETCH_SIZE_SCALE_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALE_FAILURE,
          meta: { sizeScaleId: mockSizeScaleId },
          payload: {
            error: expectedResult,
          },
        }).sizeScale,
      ).toEqual({
        error: { [mockSizeScaleId]: expectedResult },
        isLoading: { [mockSizeScaleId]: undefined },
      });
    });

    it('should handle FETCH_SIZE_SCALES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_SIZE_SCALES_FAILURE,
          meta: { query: mockQuery },
          payload: {
            error: expectedResult,
          },
        }).sizeScale,
      ).toEqual({
        error: {
          [`categoryId_${mockQuery.categoryId}`]: expectedResult,
        },
        isLoading: {
          [`categoryId_${mockQuery.categoryId}`]: undefined,
        },
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        sizeScale: {
          error: { foo: 'Error' },
          isLoading: { foo: false },
        },
      };

      expect(reducer(state, randomAction).sizeScale).toEqual(state.sizeScale);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';
      const state = { ...initialState, error };

      expect(fromReducer.getError(state)).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;
      const state = { ...initialState, isLoading };

      expect(fromReducer.getIsLoading(state)).toEqual(isLoading);
    });
  });
});
