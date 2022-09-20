import { BlackoutError, toBlackoutError } from '@farfetch/blackout-client';
import {
  mockProductsEntity,
  mockProductsListEntity,
  mockProductsListHash,
  mockProductsListsEntity,
} from 'tests/__fixtures__/products';
import { productsActionTypes, ProductsListsState } from '../..';
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
let initialState: ProductsListsState;

describe('lists redux reducer', () => {
  beforeEach(() => {
    initialState = reducer(INITIAL_STATE, mockAction);
  });

  describe('reset handling', () => {
    it('should return the initial state', () => {
      expect(
        reducer(undefined, {
          type: productsActionTypes.RESET_PRODUCTS_LISTS_STATE,
        }),
      ).toEqual(initialState);

      expect(
        reducer(undefined, {
          type: productsActionTypes.RESET_PRODUCTS_LISTS_STATE,
          payload: [],
        }),
      ).toEqual(initialState);
    });

    it('should return the same state if a payload with at least one products list hash is provided and it is not in state', () => {
      const anotherProductsListHash = mockProductsListHash + '2';

      const state = {
        error: {
          [anotherProductsListHash]: new Error('dummy error') as BlackoutError,
        },
        isLoading: { [anotherProductsListHash]: false },
        isHydrated: { [anotherProductsListHash]: true },
        hash: null,
      };

      expect(
        reducer(state, {
          type: productsActionTypes.RESET_PRODUCTS_LISTS_STATE,
          payload: [mockProductsListHash],
        }),
      ).toEqual(state);
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
        type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      });

      expect(state.error).toEqual(expectedResult);
    });

    it('should handle FETCH_PRODUCTS_LIST_FAILURE action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_FAILURE,
      });

      expect(state.error).toEqual(expectedError);
    });

    describe('should handle RESET_PRODUCTS_LISTS_STATE action type', () => {
      const defaultErrorState = {
        error: {
          [mockProductsListHash]: new Error(),
          dummy_list_hash_1: new Error(),
          dummy_list_hash_2: new Error(),
          dummy_list_hash_3: new Error(),
        },
      };

      it('should handle a partial reset request', () => {
        // @ts-expect-error
        const state = reducer(defaultErrorState, {
          type: productsActionTypes.RESET_PRODUCTS_LISTS_STATE,
          payload: [
            'dummy_list_hash_1',
            'dummy_list_hash_2',
            'dummy_list_hash_3',
          ],
        });

        // Full reset product lists state requests are handled by the outer reducer
        expect(state.error).toStrictEqual({
          [mockProductsListHash]: expect.any(Error),
        });
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        error: { [mockProductsListHash]: toBlackoutError(new Error(error)) },
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
        type: productsActionTypes.SET_PRODUCTS_LIST_HASH,
      });

      expect(state.hash).toBe(mockProductsListHash);
    });

    it('should handle FETCH_PRODUCTS_LIST_FAILURE action type', () => {
      const state = reducer(undefined, {
        meta,
        payload: { error: {} },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_FAILURE,
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
        type: productsActionTypes.DEHYDRATE_PRODUCTS_LIST,
      });

      expect(state.isHydrated).toEqual(expectedIsHydrated);
    });

    describe('should handle RESET_PRODUCTS_LISTS_STATE action type', () => {
      const defaultIsHydratedState = {
        isHydrated: {
          [mockProductsListHash]: false,
          dummy_list_hash_1: true,
          dummy_list_hash_2: true,
          dummy_list_hash_3: true,
        },
      };

      it('should handle a partial reset request', () => {
        // @ts-expect-error
        const state = reducer(defaultIsHydratedState, {
          type: productsActionTypes.RESET_PRODUCTS_LISTS_STATE,
          payload: [
            'dummy_list_hash_1',
            'dummy_list_hash_2',
            'dummy_list_hash_3',
          ],
        });

        // Full reset product lists state requests are handled by the outer reducer
        expect(state.isHydrated).toStrictEqual({
          [mockProductsListHash]: false,
        });
      });
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
        type: productsActionTypes.FETCH_PRODUCTS_LIST_REQUEST,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCTS_LIST_FAILURE action type', () => {
      const expectedIsLoading = { [mockProductsListHash]: false };
      const state = reducer(undefined, {
        meta,
        payload: { error: '' },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_FAILURE,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    it('should handle FETCH_PRODUCTS_LIST_SUCCESS action type', () => {
      const expectedIsLoading = { [mockProductsListHash]: false };
      const state = reducer(undefined, {
        meta,
        payload: { result: { foo: 'bar' } },
        type: productsActionTypes.FETCH_PRODUCTS_LIST_SUCCESS,
      });

      expect(state.isLoading).toEqual(expectedIsLoading);
    });

    describe('should handle RESET_PRODUCTS_LISTS_STATE action type', () => {
      const defaultIsLoadingState = {
        isLoading: {
          [mockProductsListHash]: false,
          dummy_list_hash_1: true,
          dummy_list_hash_2: false,
          dummy_list_hash_3: true,
        },
      };

      it('should handle a partial reset request', () => {
        // @ts-expect-error
        const state = reducer(defaultIsLoadingState, {
          type: productsActionTypes.RESET_PRODUCTS_LISTS_STATE,
          payload: [
            'dummy_list_hash_1',
            'dummy_list_hash_2',
            'dummy_list_hash_3',
          ],
        });

        // Full reset product lists state requests are handled by the outer reducer
        expect(state.isLoading).toStrictEqual({
          [mockProductsListHash]: false,
        });
      });
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
    describe(`should handle ${productsActionTypes.RESET_PRODUCTS_LISTS_ENTITIES} action type`, () => {
      const state = {
        productsLists: {
          ...mockProductsListsEntity,
          dummy_list_hash_1: {
            ...mockProductsListEntity,
            hash: 'dummy_list_hash_1',
          },
          dummy_list_hash_2: {
            ...mockProductsListEntity,
            hash: 'dummy_list_hash_2',
          },
          dummy_list_hash_3: {
            ...mockProductsListEntity,
            hash: 'dummy_list_hash_3',
          },
        },
        products: mockProductsEntity,
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };

      it('should handle full reset', () => {
        const expectedResult = {
          products: mockProductsEntity,
          dummy: {
            1: { id: 1 },
          },
          dummy2: {
            2: { id: 2 },
          },
        };

        expect(
          entitiesMapper[productsActionTypes.RESET_PRODUCTS_LISTS_ENTITIES](
            state,
            { type: productsActionTypes.RESET_PRODUCTS_LISTS_ENTITIES },
          ),
        ).toEqual(expectedResult);

        expect(
          entitiesMapper[productsActionTypes.RESET_PRODUCTS_LISTS_ENTITIES](
            state,
            {
              type: productsActionTypes.RESET_PRODUCTS_LISTS_ENTITIES,
              payload: [],
            },
          ),
        ).toEqual(expectedResult);
      });

      it('should handle partial reset', () => {
        const expectedResult = {
          productsLists: mockProductsListsEntity,
          products: mockProductsEntity,
          dummy: {
            1: { id: 1 },
          },
          dummy2: {
            2: { id: 2 },
          },
        };

        expect(
          entitiesMapper[productsActionTypes.RESET_PRODUCTS_LISTS_ENTITIES](
            state,
            {
              type: productsActionTypes.RESET_PRODUCTS_LISTS_ENTITIES,
              payload: [
                'dummy_list_hash_1',
                'dummy_list_hash_2',
                'dummy_list_hash_3',
              ],
            },
          ),
        ).toEqual(expectedResult);
      });
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = {
        [mockProductsListHash]: toBlackoutError(new Error('foo')),
      };
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
