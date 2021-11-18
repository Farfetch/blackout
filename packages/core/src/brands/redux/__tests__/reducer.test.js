import * as fromReducer from '../reducer';
import { generateBrandsHash } from '../utils';
import {
  mockBrandId,
  mockBrandsResponse,
  mockQuery,
} from 'tests/__fixtures__/brands';
import reducer, { actionTypes } from '../';

let initialState;
const hash = generateBrandsHash(mockQuery);

describe('brands redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_BRANDS_STATE,
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

    it('should handle FETCH_BRAND_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRAND_REQUEST,
          meta: { brandId: mockBrandId },
        }).error[mockBrandId],
      ).toBeNull();
    });

    it('should handle FETCH_BRANDS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRANDS_REQUEST,
          meta: { hash, query: mockQuery },
        }).error[hash],
      ).toBeNull();
    });

    it('should handle FETCH_BRAND_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRAND_FAILURE,
          payload: {
            error: expectedResult,
          },
          meta: { brandId: mockBrandId },
        }).error[mockBrandId],
      ).toEqual(expectedResult);
    });

    it('should handle FETCH_BRANDS_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRANDS_FAILURE,
          payload: {
            error: expectedResult,
          },
          meta: { hash, query: mockQuery },
        }).error[hash],
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('hash() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().hash;

      expect(state).toBe(initialState.hash);
      expect(state).toBeNull();
    });

    it('should handle SET_BRANDS_HASH action type', () => {
      const hash = 'foo';
      expect(
        reducer(undefined, {
          type: actionTypes.SET_BRANDS_HASH,
          meta: { hash },
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
      expect(state).toEqual({});
    });

    it('should handle FETCH_BRAND_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRAND_REQUEST,
          meta: { brandId: mockBrandId },
        }).isLoading[mockBrandId],
      ).toEqual(true);
    });

    it('should handle FETCH_BRANDS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRANDS_REQUEST,
          meta: { hash, query: mockQuery },
        }).isLoading[hash],
      ).toEqual(true);
    });

    it('should handle FETCH_BRAND_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRAND_SUCCESS,
          payload: {
            result: {},
          },
          meta: { brandId: mockBrandId },
        }).isLoading[mockBrandId],
      ).toEqual(false);
    });

    it('should handle FETCH_BRAND_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRAND_FAILURE,
          payload: {
            error: {},
          },
          meta: { brandId: mockBrandId },
        }).isLoading[mockBrandId],
      ).toEqual(false);
    });

    it('should handle FETCH_BRANDS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRANDS_SUCCESS,
          payload: {
            result: {},
          },
          meta: { hash, query: mockQuery },
        }).isLoading[hash],
      ).toEqual(false);
    });

    it('should handle FETCH_BRANDS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRANDS_FAILURE,
          payload: {
            error: {},
          },
          meta: { hash, query: mockQuery },
        }).isLoading[hash],
      ).toEqual(false);
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

    it('should handle FETCH_BRANDS_SUCCESS', () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_BRANDS_SUCCESS,
        payload: { result: mockBrandsResponse },
        meta: { hash, query: mockQuery },
      });

      expect(state.result[hash]).toEqual(mockBrandsResponse);
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
