import * as actionTypes from '../actionTypes.js';
import { generateBrandsHash } from '../utils/index.js';
import {
  mockBrandId,
  mockBrandResponse,
  mockBrandsQuery,
  mockBrandsResponse,
} from 'tests/__fixtures__/brands/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, * as fromReducer from '../reducer.js';
import type { BrandsState } from '../types/index.js';

const { INITIAL_STATE } = fromReducer;
const mockAction = { type: 'foo' };
const hash = generateBrandsHash(mockBrandsQuery);
let initialState: BrandsState;

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
          meta: { hash, query: mockBrandsQuery },
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
          meta: { hash, query: mockBrandsQuery },
        }).error[hash],
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { error: toBlackoutError(new Error('bar')) },
        isLoading: {},
        result: {},
      };

      expect(reducer(state, mockAction).error).toBe(state.error);
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
      ).toBe(true);
    });

    it('should handle FETCH_BRANDS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRANDS_REQUEST,
          meta: { hash, query: mockBrandsQuery },
        }).isLoading[hash],
      ).toBe(true);
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
      ).toBe(false);
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
      ).toBe(false);
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
          meta: { hash, query: mockBrandsQuery },
        }).isLoading[hash],
      ).toBe(false);
    });

    it('should handle FETCH_BRANDS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BRANDS_FAILURE,
          payload: {
            error: {},
          },
          meta: { hash, query: mockBrandsQuery },
        }).isLoading[hash],
      ).toBe(false);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
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
        meta: { hash, query: mockBrandsQuery },
      });

      expect(state.result[hash]).toEqual(mockBrandsResponse);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: {},
        result: {
          [mockBrandId]: {
            entries: [1],
            number: 3,
            totalPages: 1,
            totalItems: 1,
          },
        },
      };

      expect(reducer(state, mockAction).result).toEqual(state.result);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const state = {
        ...initialState,
        error: { error: toBlackoutError(new Error('foo')) },
        isLoading: {},
        result: {},
      };

      expect(fromReducer.getError(state)).toBe(state.error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const state = {
        ...initialState,
        error: { error: toBlackoutError(new Error('foo')) },
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
        error: { error: toBlackoutError(new Error('foo')) },
        isLoading: {},
        result: {
          [mockBrandId]: {
            entries: [1],
            number: 3,
            totalPages: 1,
            totalItems: 1,
          },
        },
      };

      expect(fromReducer.getResult(state)).toEqual(state.result);
    });
  });
});
