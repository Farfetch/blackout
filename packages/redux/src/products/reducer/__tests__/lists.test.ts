import { actionTypesProducts } from '../..';
import {
  mockProductId,
  mockProductsListHash,
} from 'tests/__fixtures__/products';
import reducer, {
  entitiesMapper,
  getError,
  getHash,
  getIsHydrated,
  getIsLoading,
  INITIAL_STATE,
} from '../lists';

const mockAction = { type: 'foo' };
const meta = { hash: mockProductsListHash };
let initialState;

describe('lists redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: actionTypesProducts.RESET_PRODUCTS_LISTS_STATE,
        }),
      ).toEqual(initialState);
    });
  });

  describe('error() reducer', () => {
    const error = 'An error occurred';
    const expectedError = {
      [mockProductsListHash]: error,
    };

    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).error;

      expect(state).toEqual(initialState.error);
    });

    it('should handle FETCH_PRODUCTS_LIST_REQUEST action type', () => {
      const expectedResult = { [mockProductsListHash]: undefined };
      const state = reducer(undefined, {
        meta,
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_REQUEST,
      });

      expect(state.error).toEqual(expectedResult);
    });

    it('should handle FETCH_PRODUCTS_LIST_FAILURE action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error },
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_FAILURE,
      });

      expect(state.error).toEqual(expectedError);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { [mockProductsListHash]: error },
        isLoading: {},
        isHydrated: {},
        hash: mockProductsListHash,
      };

      expect(reducer(state, mockAction).error).toBe(state.error);
    });
  });

  describe('hash() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).hash;

      expect(state).toBe(initialState.hash);
    });

    it('should handle SET_PRODUCTS_LIST_HASH action type', () => {
      const state = reducer(undefined, {
        meta,
        type: actionTypesProducts.SET_PRODUCTS_LIST_HASH,
      });

      expect(state.hash).toBe(mockProductsListHash);
    });

    it('should handle FETCH_PRODUCTS_LIST_FAILURE action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error: {} },
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_FAILURE,
      });

      expect(state.hash).toBe(initialState.hash);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: {},
        isHydrated: {},
        hash: mockProductsListHash,
      };
      expect(reducer(state, mockAction).hash).toBe(state.hash);
    });
  });

  describe('isHydrated() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isHydrated;

      expect(state).toEqual(initialState.isHydrated);
    });

    it('should handle DEHYDRATE_PRODUCTS_LIST action type', () => {
      const expectedIsHydrated = { [mockProductsListHash]: false };
      const state = reducer(undefined, {
        meta,
        type: actionTypesProducts.DEHYDRATE_PRODUCTS_LIST,
      });

      expect(state.isHydrated).toEqual(expectedIsHydrated);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: {},
        isHydrated: { [mockProductsListHash]: false },
        hash: mockProductsListHash,
      };

      expect(reducer(state, mockAction).isHydrated).toEqual(state.isHydrated);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(INITIAL_STATE, mockAction).isLoading;

      expect(state).toEqual(initialState.isLoading);
    });

    it('should handle FETCH_PRODUCTS_LIST_REQUEST action type', () => {
      const expectedIsLoading = { [mockProductsListHash]: true };
      const state = reducer(undefined, {
        meta,
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCTS_LIST_FAILURE action type', () => {
      const expectedIsLoading = { [mockProductsListHash]: undefined };
      const state = reducer(undefined, {
        meta,
        payload: { error: '' },
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_FAILURE,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCTS_LIST_SUCCESS action type', () => {
      const expectedIsLoading = { [mockProductsListHash]: false };
      const state = reducer(undefined, {
        meta,
        payload: { result: { foo: 'bar' } },
        type: actionTypesProducts.FETCH_PRODUCTS_LIST_SUCCESS,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: {},
        isLoading: { [mockProductsListHash]: false },
        isHydrated: {},
        hash: mockProductsListHash,
      };

      expect(reducer(state, mockAction).isLoading).toEqual(state.isLoading);
    });
  });

  describe('entitiesMapper()', () => {
    it(`should handle ${actionTypesProducts.RESET_PRODUCTS_LISTS_ENTITIES} action type`, () => {
      const state = {
        productsLists: {
          [mockProductsListHash]: { id: mockProductsListHash },
        },
        products: {
          [mockProductId]: { id: mockProductId },
        },
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };

      const expectedResult = {
        products: {
          [mockProductId]: { id: mockProductId },
        },
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };

      expect(
        entitiesMapper[actionTypesProducts.RESET_PRODUCTS_LISTS_ENTITIES](
          state,
        ),
      ).toEqual(expectedResult);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = { [mockProductsListHash]: 'foo' };
      const state = { ...initialState, error };

      expect(getError(state)).toBe(error);
    });
  });

  describe('getHash() selector', () => {
    it('should return the `hash` property from a given state', () => {
      const hash = mockProductsListHash;
      const state = { ...initialState, hash };

      expect(getHash(state)).toBe(hash);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = { [mockProductsListHash]: true };
      const state = { ...initialState, isLoading };

      expect(getIsLoading(state)).toEqual(isLoading);
    });
  });
  describe('getIsHydrated() selector', () => {
    it('should return the `isHydrated` property from a given state', () => {
      const isHydrated = { [mockProductsListHash]: true };
      const state = { ...initialState, isHydrated };

      expect(getIsHydrated(state)).toEqual(isHydrated);
    });
  });
});
