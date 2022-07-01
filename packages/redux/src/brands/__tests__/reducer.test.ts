import * as actionTypes from '../actionTypes';
import { generateBrandsHash } from '../utils';
import {
  mockBrandId,
  mockBrandResponse,
  mockBrandsResponse,
  mockQuery,
} from 'tests/__fixtures__/brands';
import reducer, * as fromReducer from '../reducer';

const { INITIAL_STATE } = fromReducer;
const mockAction = { type: 'foo' };
const hash = generateBrandsHash(mockQuery);
let initialState;

describe('brands reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
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
      const state = reducer(INITIAL_STATE, mockAction).error;

      expect(state).toEqual(initialState.error);
      expect(state).toEqual({});
    });

    it('should handle FETCH_BRAND_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRAND_REQUEST,
          meta: { brandId: mockBrandId },
        }).error[mockBrandId],
      ).toBeUndefined();
    });

    it('should handle FETCH_BRANDS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRANDS_REQUEST,
          meta: { hash, query: mockQuery },
        }).error[hash],
      ).toBeUndefined();
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
      const state = {
        error: { foo: 'bar' },
        hash: null,
        isLoading: {},
        result: {},
      };

      expect(reducer(state, mockAction).error).toBe(state.error);
    });
  });

  describe('hash() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).hash;

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
      const state = {
        error: {},
        hash: 'foo',
        isLoading: {},
        result: {},
      };

      expect(reducer(state, mockAction).hash).toBe(state.hash);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isLoading;

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
            entities: {
              brands: {
                [mockBrandId]: mockBrandResponse,
              },
            },
            result: mockBrandId,
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
            entities: {
              brands: {
                [mockBrandId]: mockBrandResponse,
              },
            },
            result: mockBrandsResponse,
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
      const state = {
        error: {},
        hash: null,
        isLoading: { isLoading: false },
        result: {},
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction);

      expect(state.result).toEqual(initialState.result);
    });

    it('should handle FETCH_BRANDS_SUCCESS', () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_BRANDS_SUCCESS,
        payload: {
          entities: {
            brands: {
              [mockBrandId]: mockBrandResponse,
            },
          },
          result: mockBrandsResponse,
        },
        meta: { hash, query: mockQuery },
      });

      expect(state.result[hash]).toEqual(mockBrandsResponse);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        hash: null,
        isLoading: {},
        result: mockBrandId,
      };

      expect(reducer(state, mockAction).result).toEqual(state.result);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const state = {
        error: { foo: 'bar' },
        hash: null,
        isLoading: {},
        result: {},
      };

      expect(fromReducer.getError(state)).toBe(state.error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const state = {
        error: { foo: 'bar' },
        hash: null,
        isLoading: {
          [mockBrandId]: true,
        },
        result: {},
      };

      expect(fromReducer.getIsLoading(state)).toEqual(state.isLoading);
    });
  });

  describe('getResult() selector', () => {
    it('should return the result property from a given state', () => {
      const state = {
        error: { foo: 'bar' },
        hash: null,
        isLoading: {},
        result: mockBrandId,
      };

      expect(fromReducer.getResult(state)).toEqual(state.result);
    });
  });
});
