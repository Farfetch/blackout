import { mockProductId } from 'tests/__fixtures__/products/index.mjs';
import { productsActionTypes, type ProductsOutfitsState } from '../../index.js';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { getError, getIsLoading, INITIAL_STATE } from '../outfits.js';

const mockAction = { type: 'foo' };
const meta = { productId: mockProductId };
let initialState: ProductsOutfitsState;

describe('outfits redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('error() reducer', () => {
    const error = new Error('An error occurred');
    const expectedError = {
      [mockProductId]: error,
    };

    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).error;

      expect(state).toEqual(initialState.error);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_REQUEST action type with undefined state', () => {
      const expectedResult = { [mockProductId]: undefined };
      const state = reducer(undefined, {
        meta,
        type: productsActionTypes.FETCH_PRODUCT_OUTFITS_REQUEST,
      });

      expect(state.error).toEqual(expectedResult);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_REQUEST action correctly with a previous state containing the same product id', () => {
      const expectedResult = {
        [mockProductId]: undefined,
      };
      const state = reducer(
        {
          error: { [mockProductId]: toBlackoutError(error) },
          isLoading: { [mockProductId]: false },
        },
        {
          meta,
          type: productsActionTypes.FETCH_PRODUCT_OUTFITS_REQUEST,
        },
      );

      expect(state.error).toEqual(expectedResult);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_FAILURE action type with undefined state', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error },
        type: productsActionTypes.FETCH_PRODUCT_OUTFITS_FAILURE,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_FAILURE action correctly with a previous state containing the same product id', () => {
      const state = reducer(
        {
          error: { [mockProductId]: toBlackoutError(error) },
          isLoading: {},
        },
        {
          meta,
          payload: { error },
          type: productsActionTypes.FETCH_PRODUCT_OUTFITS_FAILURE,
        },
      );

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { [mockProductId]: toBlackoutError(error) },
        isLoading: { [mockProductId]: false },
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_REQUEST action type with undefined state', () => {
      const expectedIsLoading = {
        [mockProductId]: true,
      };
      const state = reducer(undefined, {
        meta,
        type: productsActionTypes.FETCH_PRODUCT_OUTFITS_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_REQUEST action correctly with a previous state containing the same product id', () => {
      const expectedIsLoading = {
        [mockProductId]: true,
      };
      const state = reducer(
        {
          error: {},
          isLoading: { [mockProductId]: false },
        },
        {
          meta,
          type: productsActionTypes.FETCH_PRODUCT_OUTFITS_REQUEST,
        },
      );

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_FAILURE action type with undefined state', () => {
      const expectedIsLoading = {
        [mockProductId]: false,
      };
      const state = reducer(undefined, {
        meta,
        payload: { error: '' },
        type: productsActionTypes.FETCH_PRODUCT_OUTFITS_FAILURE,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_FAILURE action correctly with a previous state containing the same product id', () => {
      const expectedIsLoading = {
        [mockProductId]: false,
      };
      const state = reducer(
        {
          error: {},
          isLoading: { [mockProductId]: true },
        },
        {
          meta,
          payload: { error: '' },
          type: productsActionTypes.FETCH_PRODUCT_OUTFITS_FAILURE,
        },
      );

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_SUCCESS action type with undefined state', () => {
      const expectedIsLoading = {
        [mockProductId]: false,
      };
      const state = reducer(undefined, {
        meta,
        payload: {
          result: mockProductId,
        },
        type: productsActionTypes.FETCH_PRODUCT_OUTFITS_SUCCESS,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_OUTFITS_SUCCESS action type correctly with a previous state containing the same product id', () => {
      const expectedIsLoading = {
        [mockProductId]: false,
      };
      const state = reducer(
        {
          error: {},
          isLoading: { [mockProductId]: true },
        },
        {
          meta,
          payload: {
            result: mockProductId,
          },
          type: productsActionTypes.FETCH_PRODUCT_OUTFITS_SUCCESS,
        },
      );

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: { [mockProductId]: false },
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('selectors', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = {
          [mockProductId]: toBlackoutError(new Error('234-foo')),
        };
        const state = { ...initialState, error };

        expect(getError(state)).toBe(error);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = { [mockProductId]: true };
        const state = { ...initialState, isLoading };

        expect(getIsLoading(state)).toEqual(isLoading);
      });
    });
  });
});
