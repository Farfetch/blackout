import * as fromReducer from '../reducer';
import {
  mockBrandsIds,
  mockCategoriesIds,
} from 'tests/__fixtures__/sizeguides';
import reducer, { actionTypes } from '../';

let initialState;

describe('sizeguides redux reducer', () => {
  const mockQuery = {
    brand: mockBrandsIds,
    categories: mockCategoriesIds,
  };

  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_SIZEGUIDES,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toEqual(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle GET_SIZEGUIDES_REQUEST action type', () => {
      const expectedResult = initialState.error;
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZEGUIDES_REQUEST,
          meta: mockQuery,
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle GET_SIZEGUIDES_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZEGUIDES_FAILURE,
          meta: mockQuery,
          payload: {
            error: expectedResult,
          },
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toEqual(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle GET_SIZEGUIDES_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZEGUIDES_REQUEST,
          meta: mockQuery,
        }).isLoading,
      ).toEqual(true);
    });

    it('should handle GET_SIZEGUIDES_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZEGUIDES_FAILURE,
          meta: mockQuery,
          payload: { error: 'Error - Not loaded' },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle GET_SIZEGUIDES_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_SIZEGUIDES_SUCCESS,
          meta: mockQuery,
          payload: { result: { foo: 'bar' } },
        }).isLoading,
      ).toEqual(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: false };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer();

      expect(state.result).toEqual(initialState.result);
    });

    it('should handle GET_SIZEGUIDES_SUCCESS', () => {
      const expectedResult = { foo: 'bar' };
      const state = reducer(undefined, {
        type: actionTypes.GET_SIZEGUIDES_SUCCESS,
        meta: mockQuery,
        payload: { result: expectedResult },
      });

      expect(state.result).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        result: { foo: 'bar' },
      };

      expect(reducer(state).result).toEqual(state.result);
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

  describe('getResult() selector', () => {
    it('should return the result property from a given state', () => {
      const result = { foo: 'bar' };

      expect(fromReducer.getResult({ result })).toEqual(result);
    });
  });
});
