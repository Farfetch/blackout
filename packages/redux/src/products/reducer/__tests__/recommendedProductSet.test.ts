import * as actionTypes from '../../actionTypes/index.js';
import {
  mockRecommendedProductSet,
  mockRecommendedProductSetId,
} from 'tests/__fixtures__/products/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import recommendedSetsReducer, {
  getError,
  getIsLoading,
  getResult,
  INITIAL_STATE,
} from '../recommendedProductSet.js';
import type { RecommendedProductSetState } from '../../types/index.js';

describe('recommended product set reducer', () => {
  let initialState: RecommendedProductSetState;
  const randomAction = { type: 'this_is_a_random_action' };

  beforeEach(() => {
    initialState = INITIAL_STATE;
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = recommendedSetsReducer(undefined, randomAction).error;

      expect(state).toEqual(initialState.error);
    });

    it('should handle FETCH_RECOMMENDED_PRODUCT_SET_REQUEST action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedProductSetId: mockRecommendedProductSetId },
          type: actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_REQUEST,
        }).error,
      ).toEqual(initialState.error);
    });

    it('should handle FETCH_RECOMMENDED_PRODUCT_SET_FAILURE action type', () => {
      const expectedResult = { [mockRecommendedProductSetId]: 'foo' };

      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedProductSetId: mockRecommendedProductSetId },
          payload: { error: 'foo' },
          type: actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_FAILURE,
        }).error,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: {
          code: 1,
        },
      };

      expect(recommendedSetsReducer(state, randomAction).error).toEqual(
        state.error,
      );
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = recommendedSetsReducer(undefined, randomAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_RECOMMENDED_PRODUCT_SET_REQUEST action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedProductSetId: mockRecommendedProductSetId },
          type: actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_REQUEST,
        }).isLoading,
      ).toEqual({ [mockRecommendedProductSetId]: true });
    });

    it('should handle FETCH_RECOMMENDED_PRODUCT_SET_FAILURE action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedProductSetId: mockRecommendedProductSetId },
          payload: { error: '' },
          type: actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_FAILURE,
        }).isLoading,
      ).toEqual({ [mockRecommendedProductSetId]: undefined });
    });

    it('should handle FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedProductSetId: mockRecommendedProductSetId },
          payload: {
            result: mockRecommendedProductSetId,
          },
          type: actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS,
        }).isLoading,
      ).toEqual({ [mockRecommendedProductSetId]: false });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        isLoading: { [mockRecommendedProductSetId]: false },
      };

      expect(recommendedSetsReducer(state, randomAction).isLoading).toEqual(
        state.isLoading,
      );
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = recommendedSetsReducer(undefined, randomAction).result;

      expect(state).toEqual(initialState.result);
    });

    it('should handle FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS action type', () => {
      expect(
        recommendedSetsReducer(undefined, {
          meta: { recommendedProductSetId: mockRecommendedProductSetId },
          payload: {
            result: mockRecommendedProductSet,
          },
          type: actionTypes.FETCH_RECOMMENDED_PRODUCT_SET_SUCCESS,
        }).result,
      ).toEqual({ [mockRecommendedProductSetId]: mockRecommendedProductSet });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        result: { [mockRecommendedProductSetId]: mockRecommendedProductSet },
      };

      expect(recommendedSetsReducer(state, randomAction).result).toEqual(
        state.result,
      );
    });
  });

  describe('selectors', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = {
          [mockRecommendedProductSetId]: toBlackoutError(new Error('234-foo')),
        };
        const state = { ...initialState, error };

        expect(getError(state)).toBe(error);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = { [mockRecommendedProductSetId]: true };
        const state = { ...initialState, isLoading };

        expect(getIsLoading(state)).toEqual(isLoading);
      });
    });

    describe('getResult()', () => {
      it('should return the `result` property from a given state', () => {
        const result = {
          [mockRecommendedProductSetId]: mockRecommendedProductSet,
        };
        const state = { ...initialState, result };

        expect(getResult(state)).toEqual(result);
      });
    });
  });
});
