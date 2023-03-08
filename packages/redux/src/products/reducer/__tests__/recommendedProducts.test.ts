import { productsActionTypes as actionTypes } from '../../index.js';
import { mockRecommendedProductsStrategy } from 'tests/__fixtures__/products/index.mjs';
import reducer from '../recommendedProducts.js';
import type { RecommendedProductsState } from '../../types/index.js';

let initialState: RecommendedProductsState;
const mockAction = { type: 'this_is_a_mock_action' };

describe('recommendations reducer', () => {
  beforeEach(() => {
    initialState = reducer(undefined, mockAction);
  });

  const meta = { strategyName: mockRecommendedProductsStrategy };

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockRecommendedProductsStrategy]: error,
    };

    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction);

      expect(state.error).toEqual(initialState.error);
    });

    it(`should handle ${actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST} action type`, () => {
      const expectedError = {
        [mockRecommendedProductsStrategy]: undefined,
      };

      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST,
        meta,
      });

      expect(state.error).toEqual(expectedError);
    });

    it(`should handle ${actionTypes.FETCH_RECOMMENDED_PRODUCTS_FAILURE} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_FAILURE,
        payload: {
          error,
        },
        meta,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        isLoading: { [mockRecommendedProductsStrategy]: true },
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction);

      expect(state.isLoading).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST} action type`, () => {
      const expectedIsLoading = {
        [mockRecommendedProductsStrategy]: true,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_REQUEST,
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS} action type`, () => {
      const expectedIsLoading = {
        [mockRecommendedProductsStrategy]: false,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_RECOMMENDED_PRODUCTS_FAILURE} action type`, () => {
      const expectedIsLoading = {
        [mockRecommendedProductsStrategy]: undefined,
      };
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_FAILURE,
        payload: {
          error: 'this is an error',
        },
        meta,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        isLoading: {
          [mockRecommendedProductsStrategy]: false,
        },
        error: {},
        result: {},
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    const payload = {
      id: '0000-0000-0000-000',
      values: [
        {
          id: '12312312',
          score: 0.97,
        },
      ],
    };
    const expectedResult = {
      [mockRecommendedProductsStrategy]: payload,
    };

    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction);

      expect(state.result).toEqual(initialState.result);
    });

    it(`should handle ${actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECOMMENDED_PRODUCTS_SUCCESS,
        payload,
        meta,
      });

      expect(state.result).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        result: {
          [mockRecommendedProductsStrategy]: payload,
        },
        error: {},
        isLoading: {},
      };

      expect(reducer(state, mockAction).result).toEqual(state.result);
    });
  });
});
