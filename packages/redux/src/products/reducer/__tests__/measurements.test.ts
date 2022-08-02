import {
  mockProductId,
  mockProductVariantsMeasurements,
} from 'tests/__fixtures__/products';
import { productsActionTypes } from '../..';
import reducer, {
  entitiesMapper,
  getError,
  getIsLoading,
  INITIAL_STATE,
} from '../measurements';
import type { ProductEntity } from '../../../entities/types';

const mockAction = { type: 'foo' };
const meta = { productId: mockProductId };
let initialState;

describe('measurements redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockProductId]: error,
    };

    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).error;

      expect(state).toEqual(initialState.error);
    });

    it('should handle FETCH_PRODUCT_MEASUREMENTS_REQUEST action type', () => {
      const expectedResult = { [mockProductId]: undefined };
      const state = reducer(undefined, {
        meta,
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_REQUEST,
      });

      expect(state.error).toEqual(expectedResult);
    });

    it('should handle FETCH_PRODUCT_MEASUREMENTS_FAILURE action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error },
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { [mockProductId]: error },
        isLoading: {},
      };

      expect(reducer(state, mockAction).error).toEqual(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_PRODUCT_MEASUREMENTS_REQUEST action type', () => {
      const expectedIsLoading = {
        [mockProductId]: true,
      };
      const state = reducer(undefined, {
        meta,
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_MEASUREMENTS_FAILURE action type', () => {
      const expectedIsLoading = {
        [mockProductId]: false,
      };
      const state = reducer(undefined, {
        meta,
        payload: { error: '' },
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCT_MEASUREMENTS_SUCCESS action type', () => {
      const expectedIsLoading = {
        [mockProductId]: false,
      };
      const state = reducer(undefined, {
        meta,
        payload: {
          result: mockProductId,
        },
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_SUCCESS,
      });

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

  describe('entitiesMapper', () => {
    it('should map the FETCH_PRODUCT_MEASUREMENTS_SUCCESS action to a new state', () => {
      const defaultState = { otherState: 'foo' };
      const newMeasurements = {
        products: {
          [mockProductId]: {
            measurements: mockProductVariantsMeasurements,
          } as ProductEntity,
        },
      };
      const state = {
        products: {
          [mockProductId]: {
            measurements: [],
          } as ProductEntity,
        },
        ...defaultState,
      };
      const action = {
        meta: { productId: mockProductId },
        payload: {
          entities: newMeasurements,
          result: mockProductId,
        },
        type: productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_SUCCESS,
      };

      expect(
        entitiesMapper[productsActionTypes.FETCH_PRODUCT_MEASUREMENTS_SUCCESS](
          state,
          action,
        ),
      ).toEqual({ ...newMeasurements, ...defaultState });
    });
  });

  describe('selectors', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = { [mockProductId]: '234-foo' };
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
