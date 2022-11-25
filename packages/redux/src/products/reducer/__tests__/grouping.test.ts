import { mockProductId } from 'tests/__fixtures__/products';
import { productsActionTypes, ProductsGroupingState } from '../..';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { getError, getIsLoading, INITIAL_STATE } from '../grouping';

const mockAction = { type: 'foo' };
const meta = { productId: mockProductId };
let initialState: ProductsGroupingState;

describe('grouping redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockProductId]: { '?pageindex=1': error },
    };

    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).error;

      expect(state).toEqual(initialState.error);
    });

    it('should handle FETCH_PRODUCT_GROUPING_REQUEST action type', () => {
      const expectedResult = { [mockProductId]: { '?pageindex=1': undefined } };
      const state = reducer(undefined, {
        meta,
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_REQUEST,
        payload: { hash: '?pageindex=1' },
      });

      expect(state.error).toEqual(expectedResult);
    });

    it('should handle FETCH_PRODUCT_GROUPING_FAILURE action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error, hash: '?pageindex=1' },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_FAILURE,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {
          [mockProductId]: {
            '?pageindex=1': toBlackoutError(new Error(error)),
          },
        },
        isLoading: {},
        results: {},
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_PRODUCT_GROUPING_REQUEST action type', () => {
      const expectedIsLoading = {
        [mockProductId]: { '?pageindex=1': true },
      };
      const state = reducer(undefined, {
        meta,
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_REQUEST,
        payload: { hash: '?pageindex=1' },
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_GROUPING_FAILURE action type', () => {
      const expectedIsLoading = {
        [mockProductId]: { '?pageindex=1': false },
      };
      const state = reducer(undefined, {
        meta,
        payload: { error: '', hash: '?pageindex=1' },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_FAILURE,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_GROUPING_SUCCESS action type', () => {
      const expectedIsLoading = {
        [mockProductId]: { '?pageindex=1': false },
      };
      const state = reducer(undefined, {
        meta,
        payload: {
          result: mockProductId,
          hash: '?pageindex=1',
        },
        type: productsActionTypes.FETCH_PRODUCT_GROUPING_SUCCESS,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: { [mockProductId]: { '?pageindex=1': false } },
        results: {},
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('selectors', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = {
          [mockProductId]: {
            '?pageindex=1': toBlackoutError(new Error('234-foo')),
          },
        };
        const state = { ...initialState, error };

        expect(getError(state)).toBe(error);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = { [mockProductId]: { '?pageindex=1': true } };
        const state = { ...initialState, isLoading };

        expect(getIsLoading(state)).toBe(isLoading);
      });
    });
  });
});
