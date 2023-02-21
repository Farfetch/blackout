import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import { LOGOUT_SUCCESS } from '../../users/authentication/actionTypes';
import { mockProduct } from 'tests/__fixtures__/products';
import {
  mockSharedWishlistId,
  mockSharedWishlistItem,
  mockSharedWishlistsResponse,
} from 'tests/__fixtures__/sharedWishlists';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { entitiesMapper } from '../reducer';
import type { SharedWishlistState } from '../types';

const { INITIAL_STATE } = fromReducer;
const mockAction = { type: 'foo' };
let initialState: SharedWishlistState;

describe('shared wishlists reducer', () => {
  beforeEach(() => {
    initialState = INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state when resetting it', () => {
      expect(
        reducer(undefined, {
          payload: {
            result: {},
          },
          type: actionTypes.RESET_SHARED_WISHLIST_STATE,
        }),
      ).toEqual(initialState);
    });

    it('should return the initial state when it receives a `LOGOUT_SUCCESS` action', () => {
      expect(
        reducer(undefined, {
          payload: {
            result: {},
          },
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.result;

      expect(state).toBe(initialState.result);
    });

    it.each([
      actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
      actionTypes.FETCH_SHARED_WISHLIST_SUCCESS,
      actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS,
    ])('should handle %s action type', actionType => {
      const expectedResult = { bar: 'foo', id: mockSharedWishlistId };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionType,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...INITIAL_STATE,
        result: mockSharedWishlistsResponse.id,
      };

      expect(reducer(state, mockAction).result).toBe(state.result);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_SHARED_WISHLIST_FAILURE,
      actionTypes.FETCH_SHARED_WISHLIST_FAILURE,
      actionTypes.UPDATE_SHARED_WISHLIST_FAILURE,
      actionTypes.REMOVE_SHARED_WISHLIST_FAILURE,
    ])('should handle %s action type', actionType => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionType,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = {
        ...INITIAL_STATE,
        error: toBlackoutError(new Error('foo')),
      };

      expect(reducer(state, mockAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
      actionTypes.CREATE_SHARED_WISHLIST_REQUEST,
      actionTypes.FETCH_SHARED_WISHLIST_REQUEST,
      actionTypes.UPDATE_SHARED_WISHLIST_REQUEST,
      actionTypes.REMOVE_SHARED_WISHLIST_REQUEST,
    ])('should handle %s action type', actionType => {
      const state = {
        ...INITIAL_STATE,
        isLoading: false,
      };

      expect(
        reducer(state, {
          type: actionType,
        }).isLoading,
      ).toBe(true);
    });

    it.each([
      actionTypes.CREATE_SHARED_WISHLIST_FAILURE,
      actionTypes.FETCH_SHARED_WISHLIST_FAILURE,
      actionTypes.UPDATE_SHARED_WISHLIST_FAILURE,
      actionTypes.REMOVE_SHARED_WISHLIST_FAILURE,
    ])('should handle %s action type', actionType => {
      const state = {
        ...INITIAL_STATE,
        isLoading: true,
      };

      expect(
        reducer(state, {
          payload: { error: '' },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it.each([
      actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
      actionTypes.FETCH_SHARED_WISHLIST_SUCCESS,
      actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS,
      actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS,
    ])('should handle %s action type', actionType => {
      const state = {
        ...INITIAL_STATE,
        isLoading: true,
      };
      const expectedResult = 'foo';

      expect(
        reducer(state, {
          payload: { result: expectedResult, isLoading: true },
          type: actionType,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...INITIAL_STATE,
        isLoading: true,
        result: mockSharedWishlistsResponse.id,
      };

      expect(reducer(state, mockAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('entitiesMapper', () => {
    const state = {
      sharedWishlists: {},
      sharedWishlistItems: mockSharedWishlistItem,
      products: mockProduct,
    };

    const expectedResult = {
      products: mockProduct,
    };

    it('should map the RESET_WISHLIST_ENTITIES action to a new state', () => {
      expect(
        entitiesMapper[actionTypes.RESET_SHARED_WISHLIST_ENTITIES](state),
      ).toEqual(expectedResult);
    });

    it('should map the LOGOUT_SUCCESS action to a new state', () => {
      expect(entitiesMapper[LOGOUT_SUCCESS](state)).toEqual(expectedResult);
    });
  });

  describe('selectors from reducer', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = toBlackoutError(new Error('foo'));

        expect(
          fromReducer.getError({
            ...INITIAL_STATE,
            error,
          }),
        ).toBe(error);
      });
    });

    describe('getResult()', () => {
      it('should return the `result` property from a given state', () => {
        const result = mockSharedWishlistsResponse.id;

        expect(fromReducer.getResult({ ...INITIAL_STATE, result })).toBe(
          result,
        );
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = true;

        expect(fromReducer.getIsLoading({ ...INITIAL_STATE, isLoading })).toBe(
          isLoading,
        );
      });
    });
  });
});
