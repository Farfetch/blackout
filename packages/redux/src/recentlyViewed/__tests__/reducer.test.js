import * as fromReducer from '../reducer';
import {
  expectedLocalPayload,
  expectedRemotePayload,
} from 'tests/__fixtures__/recentlyViewed/getRecentlyViewed';
import reducer, { actionTypes } from '..';

let initialState;

describe('Recently Viewed reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('error() reducer', () => {
    const expectedError = 'An error occurred';

    it('should return the initial state', () => {
      const state = reducer();

      expect(state.error).toEqual(initialState.error);
    });

    it(`should handle ${actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE,
        payload: {
          error: expectedError,
        },
      });

      expect(state.error).toEqual(expectedError);
    });

    it(`should handle ${actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE,
        payload: {
          error: expectedError,
        },
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: expectedError,
      };

      expect(reducer(state).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer();

      expect(state.isLoading).toEqual(initialState.isLoading);
    });

    it(`should handle ${actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST} action type`, () => {
      const expectedIsLoading = true;
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST} action type`, () => {
      const expectedIsLoading = true;
      const state = reducer(undefined, {
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS} action type`, () => {
      const expectedIsLoading = false;
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: expectedRemotePayload,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS} action type`, () => {
      const expectedIsLoading = false;
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: expectedRemotePayload,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE} action type`, () => {
      const expectedIsLoading = false;
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_FAILURE,
        payload: {
          error: 'this is an error',
        },
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it(`should handle ${actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE} action type`, () => {
      const expectedIsLoading = false;
      const state = reducer(undefined, {
        type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_FAILURE,
        payload: {
          error: 'this is an error',
        },
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        isLoading: true,
      };

      expect(reducer(state).isLoading).toEqual(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer();

      expect(state.result).toEqual(initialState.result);
    });

    it(`should handle ${actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.FETCH_RECENTLY_VIEWED_PRODUCTS_SUCCESS,
        payload: expectedRemotePayload,
      });

      expect(state.result.remote).toEqual(expectedRemotePayload);
    });

    it(`should handle ${actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT} action type`, () => {
      const state = reducer(undefined, {
        type: actionTypes.SAVE_RECENTLY_VIEWED_PRODUCT,
        payload: expectedLocalPayload,
      });

      expect(state.result.computed).toEqual(expectedLocalPayload);
    });

    it(`should handle ${actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS} action type`, () => {
      const state = {
        ...initialState,
        result: {
          ...initialState,
          remote: expectedRemotePayload,
          computed: expectedLocalPayload,
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
          type: actionTypes.REMOVE_RECENTLY_VIEWED_PRODUCT_SUCCESS,
        }).result,
      ).toEqual(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        result: { foo: 'bar' },
      };

      expect(reducer(state).result).toEqual(state.result);
    });
  });

  describe('getRecentlyViewedProductsError()', () => {
    it('should return the `recentlyViewed.error` property from a given state', () => {
      const state = { error: { message: 'This is an error' } };

      expect(fromReducer.getError(state)).toEqual(state.error);
    });
  });

  describe('getAreRecentlyViewedProductsLoading()', () => {
    it('should return the `recentlyViewed.isLoading` property from a given state', () => {
      const state = { isLoading: true };

      expect(fromReducer.getIsLoading(state)).toEqual(state.isLoading);
    });
  });

  describe('getRecentlyViewedProducts()', () => {
    it('should return the `recentlyViewed.result` property from a given state', () => {
      const state = {
        result: {
          foo: 'bar',
        },
      };

      expect(fromReducer.getResult(state)).toEqual(state.result);
    });
  });
});
