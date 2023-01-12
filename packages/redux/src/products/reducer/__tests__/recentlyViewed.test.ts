import {
  expectedRecentlyViewedLocalPayload,
  expectedRecentlyViewedRemotePayload,
} from 'tests/__fixtures__/products';
import { productsActionTypes } from '../..';
import reducer, {
  getError,
  getIsLoading,
  getResult,
} from '../recentlyViewedProducts';
import type { RecentlyViewedState } from '../../types';

let initialState: RecentlyViewedState;
const mockAction = { type: 'this_is_a_mock_action' };

describe('Recently Viewed reducer', () => {
  beforeEach(() => {
    initialState = reducer(undefined, mockAction);
  });

  describe('error() reducer', () => {
    const expectedError = {
      message: 'An error occurred',
      name: 'error',
      code: '-1',
    };

    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction);

      expect(state.error).toEqual(initialState.error);
    });

    it(`should handle ${productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE} action type`, () => {
      const state = reducer(undefined, {
        type: productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE,
        payload: {
          error: expectedError,
        },
      });

      expect(state.error).toEqual(expectedError);
    });

    it(`should handle ${productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE} action type`, () => {
      const state = reducer(undefined, {
        type: productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE,
        payload: {
          error: expectedError,
        },
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: expectedError,
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    const mockIsLoadingState = {
      error: null,
      isLoading: true,
      result: null,
    };

    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction);

      expect(state.isLoading).toEqual(initialState.isLoading);
    });

    it(`should handle ${productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST} action type`, () => {
      const expectedIsLoading = true;
      const state = reducer(undefined, {
        type: productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST} action type`, () => {
      const expectedIsLoading = true;
      const state = reducer(undefined, {
        type: productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS} action type`, () => {
      const expectedIsLoading = false;
      const state = reducer(mockIsLoadingState, {
        type: productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: expectedRecentlyViewedRemotePayload,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS} action type`, () => {
      const expectedIsLoading = false;
      const state = reducer(mockIsLoadingState, {
        type: productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: expectedRecentlyViewedRemotePayload,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE} action type`, () => {
      const expectedIsLoading = false;
      const state = reducer(mockIsLoadingState, {
        type: productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE,
        payload: {
          error: 'this is an error',
        },
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE} action type`, () => {
      const expectedIsLoading = false;
      const state = reducer(mockIsLoadingState, {
        type: productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE,
        payload: {
          error: 'this is an error',
        },
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        isLoading: true,
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, mockAction);

      expect(state.result).toEqual(initialState.result);
    });

    it(`should handle ${productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS} action type`, () => {
      const state = reducer(undefined, {
        type: productsActionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: expectedRecentlyViewedRemotePayload,
      });

      expect(state.result?.remote).toEqual(expectedRecentlyViewedRemotePayload);
    });

    it(`should handle ${productsActionTypes.SAVE_RECENTLY_VIEWED_PRODUCT} action type`, () => {
      const state = reducer(undefined, {
        type: productsActionTypes.SAVE_RECENTLY_VIEWED_PRODUCT,
        payload: expectedRecentlyViewedLocalPayload,
      });

      expect(state.result?.computed).toEqual(
        expectedRecentlyViewedLocalPayload,
      );
    });

    it(`should handle ${productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS} action type`, () => {
      const state = {
        ...initialState,
        result: {
          pagination: initialState.result?.pagination,
          remote: expectedRecentlyViewedRemotePayload,
          computed: expectedRecentlyViewedLocalPayload,
        },
      };
      const productId = 33333333;
      const expectedResult = {
        ...state.result,
        computed: [
          {
            productId: 22222222,
            lastVisitDate: '2020-02-03T11:08:50.010Z',
          },
        ],
      };

      expect(
        reducer(state, {
          meta: { productId },
          type: productsActionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS,
        }).result,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
      };

      expect(reducer(state, mockAction).result).toEqual(state.result);
    });
  });

  describe('getRecentlyViewedProductsError()', () => {
    it('should return the `recentlyViewed.error` property from a given state', () => {
      const state = {
        ...initialState,
        error: { message: 'This is an error', name: 'error', code: '-1' },
      };

      expect(getError(state)).toEqual(state.error);
    });
  });

  describe('getAreRecentlyViewedProductsLoading()', () => {
    it('should return the `recentlyViewed.isLoading` property from a given state', () => {
      const state = { ...initialState, isLoading: true };

      expect(getIsLoading(state)).toEqual(state.isLoading);
    });
  });

  describe('getRecentlyViewedProducts()', () => {
    it('should return the `recentlyViewed.result` property from a given state', () => {
      const state = {
        ...initialState,
      };

      expect(getResult(state)).toEqual(state.result);
    });
  });
});
