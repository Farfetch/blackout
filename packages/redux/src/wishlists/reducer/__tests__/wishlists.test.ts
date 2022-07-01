import * as actionTypes from '../../actionTypes';
import * as fromReducer from '../wishlists';
import { LOGOUT_SUCCESS } from '../../../users/authentication/actionTypes';
import {
  mockWishlistId,
  mockWishlistItemId,
  mockWishlistsResponse,
} from 'tests/__fixtures__/wishlists';
import reducer, { entitiesMapper } from '../';

const { INITIAL_STATE } = fromReducer;
const mockAction = { type: 'foo' };
let initialState;

describe('wishlists reducer', () => {
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
          type: actionTypes.RESET_WISHLIST_STATE,
        }),
      ).toEqual(initialState);
    });

    it('should return the initial state when is a LOGOUT_SUCCESS action', () => {
      expect(
        reducer(undefined, {
          payload: {
            result: {},
          },
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });

    it('should only reset to the initial state the fields specified to reset - reducer root (id)', () => {
      const state = {
        ...INITIAL_STATE,
        id: '123-456-789',
        error: 'Unexpected Error',
      };
      const expectedState = {
        ...state,
        id: initialState.id,
      };

      expect(
        reducer(state, {
          payload: { fieldsToReset: ['id'] },
          type: actionTypes.RESET_WISHLIST_STATE,
        }),
      ).toEqual(expectedState);
    });

    it('should only reset to the initial state the fields specified to reset - reducer deep property (error)', () => {
      const state = {
        ...INITIAL_STATE,
        id: '123-456-789',
        error: 'Unexpected Error',
        items: {
          ...INITIAL_STATE.items,
          item: {
            ...INITIAL_STATE.items.item,
            ids: [mockWishlistItemId],
            [mockWishlistItemId]: {
              error: 'Another unexpected error',
            },
          },
        },
      };
      const expectedState = {
        ...state,
        error: initialState.error,
        items: {
          ...state.items,
          item: {
            ...state.items.item,
            error: initialState.items.item.error,
          },
        },
      };

      expect(
        reducer(state, {
          payload: { fieldsToReset: ['error'] },
          type: actionTypes.RESET_WISHLIST_STATE,
        }),
      ).toEqual(expectedState);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.result;

      expect(state).toBe(initialState.result);
    });

    it('should handle FETCH_WISHLIST_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: mockWishlistId };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_WISHLIST_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...INITIAL_STATE,
        result: {
          ...mockWishlistsResponse,
          items: [mockWishlistItemId],
        },
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

    it('should handle ADD_WISHLIST_ITEM_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.ADD_WISHLIST_ITEM_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_WISHLIST_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_WISHLIST_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = {
        ...INITIAL_STATE,
        error: 'foo',
      };

      expect(reducer(state, mockAction).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it('should handle FETCH_WISHLIST_SUCCESS action type', () => {
      const result = { id: mockWishlistId };

      expect(
        reducer(undefined, {
          payload: { result },
          type: actionTypes.FETCH_WISHLIST_SUCCESS,
        }).id,
      ).toBe(mockWishlistId);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...INITIAL_STATE,
        id: 'foo',
      };

      expect(reducer(state, mockAction).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle ADD_WISHLIST_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.ADD_WISHLIST_ITEM_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle ADD_WISHLIST_ITEM_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.ADD_WISHLIST_ITEM_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle ADD_WISHLIST_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: {} },
          type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_WISHLIST_REQUEST action type', () => {
      expect(
        reducer(undefined, { type: actionTypes.FETCH_WISHLIST_REQUEST })
          .isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_WISHLIST_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_WISHLIST_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: { id: mockWishlistId } },
          type: actionTypes.FETCH_WISHLIST_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...INITIAL_STATE,
        isLoading: true,
        result: {},
      };

      expect(reducer(state, mockAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('items() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.items;

      expect(state).toEqual(initialState.items);
      expect(state).toEqual({ ids: null, item: { error: {}, isLoading: {} } });
    });

    it('should handle REMOVE_WISHLIST_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_WISHLIST_ITEM_REQUEST,
          meta: { wishlistItemId: 123 },
        }).items,
      ).toEqual({
        ids: null,
        item: { error: { 123: null }, isLoading: { 123: true } },
      });
    });

    it('should handle UPDATE_WISHLIST_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_WISHLIST_ITEM_REQUEST,
          meta: { wishlistItemId: 123 },
        }).items,
      ).toEqual({
        ids: null,
        item: { error: { 123: null }, isLoading: { 123: true } },
      });
    });

    it('should handle REMOVE_WISHLIST_ITEM_FAILURE action type', () => {
      const mockError = 'Delete error';
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_WISHLIST_ITEM_FAILURE,
          payload: { error: mockError },
          meta: { wishlistItemId: 123 },
        }).items,
      ).toEqual({
        ids: null,
        item: {
          error: { 123: mockError },
          isLoading: { 123: false },
        },
      });
    });

    it('should handle REMOVE_WISHLIST_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: { items: [mockWishlistItemId] } },
          type: actionTypes.REMOVE_WISHLIST_ITEM_SUCCESS,
          meta: { wishlistItemId: 123 },
        }).items,
      ).toEqual({
        ids: [mockWishlistItemId],
        item: { error: {}, isLoading: { 123: false } },
      });
    });

    it('should handle ADD_WISHLIST_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: { items: [mockWishlistItemId] } },
          type: actionTypes.ADD_WISHLIST_ITEM_SUCCESS,
          meta: { wishlistItemId: 123 },
        }).items,
      ).toEqual({
        ids: [mockWishlistItemId],
        item: { error: {}, isLoading: {} },
      });
    });

    it('should handle FETCH_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: {
            result: { items: [mockWishlistItemId], id: mockWishlistId },
          },
          type: actionTypes.FETCH_WISHLIST_SUCCESS,
          meta: { wishlistItemId: 123 },
        }).items,
      ).toEqual({
        ids: [mockWishlistItemId],
        item: { error: {}, isLoading: {} },
      });
    });

    it('should handle UPDATE_WISHLIST_ITEM_FAILURE action type', () => {
      const mockError = 'Delete error';
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_WISHLIST_ITEM_FAILURE,
          payload: { error: mockError },
          meta: { wishlistItemId: 123 },
        }).items,
      ).toEqual({
        ids: null,
        item: {
          error: { 123: mockError },
          isLoading: { 123: false },
        },
      });
    });

    it('should handle UPDATE_WISHLIST_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: { items: [mockWishlistItemId] } },
          type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
          meta: { wishlistItemId: 123 },
        }).items,
      ).toEqual({
        ids: [mockWishlistItemId],
        item: { error: {}, isLoading: { 123: false } },
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...INITIAL_STATE,
        items: {
          ...INITIAL_STATE.items,
          item: {
            error: { foo: 'Error' },
            isLoading: { foo: false },
          },
        },
      };

      expect(reducer(state, mockAction).items).toEqual(state.items);
    });
  });

  describe('entitiesMapper', () => {
    const state = {
      products: {
        1: { id: 1 },
      },
      wishlistItems: {
        1: { id: 1 },
      },
      wishlistSets: {
        1: { id: 1 },
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
        1: { id: 1 },
      },
      dummy: {
        1: { id: 1 },
      },
      dummy2: {
        2: { id: 2 },
      },
    };
    it('should map the RESET_WISHLIST_ENTITIES action to a new state', () => {
      expect(
        entitiesMapper[actionTypes.RESET_WISHLIST_ENTITIES](state),
      ).toEqual(expectedResult);
    });

    it('should map the LOGOUT_SUCCESS action to a new state', () => {
      expect(entitiesMapper[LOGOUT_SUCCESS](state)).toEqual(expectedResult);
    });
  });

  describe('selectors from reducer', () => {
    describe('getId()', () => {
      it('should return the `id` property from a given state', () => {
        const id = 123;

        expect(fromReducer.getId({ ...INITIAL_STATE, id })).toBe(id);
      });
    });

    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = 'foo';

        expect(fromReducer.getError({ ...INITIAL_STATE, error })).toBe(error);
      });
    });

    describe('getResult()', () => {
      it('should return the `result` property from a given state', () => {
        const result = {
          ...mockWishlistsResponse,
          items: [mockWishlistItemId],
        };

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

    describe('getAreItemsLoading()', () => {
      it('should return the `items.isLoading` property from a given state', () => {
        const items = {
          ...INITIAL_STATE.items,
          item: {
            ...INITIAL_STATE.items.item,
            isLoading: { 123: true },
          },
        };

        expect(
          fromReducer.getAreItemsLoading({ ...INITIAL_STATE, items }),
        ).toEqual(items.item.isLoading);
      });
    });

    describe('getItemsError()', () => {
      it('should return the `items.error` property from a given state', () => {
        const items = {
          ...INITIAL_STATE.items,
          item: {
            ...INITIAL_STATE.items.item,
            error: { 123: 'Error' },
          },
        };

        expect(fromReducer.getItemsError({ ...INITIAL_STATE, items })).toEqual(
          items.item.error,
        );
      });
    });
  });
});
