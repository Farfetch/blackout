import * as fromReducer from '../wishlists';
import { actionTypes } from '../../';
import reducer, { entitiesMapper } from '../';

let initialState;

describe('wishlists reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state when there are no fields to keep', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: actionTypes.RESET_WISHLIST_STATE,
        }),
      ).toEqual(initialState);
    });

    it('should only reset to the initial state the fields specified to reset - reducer root (id)', () => {
      const state = {
        id: '123-456-789',
        error: 'Unexpected Error',
        wishlistItems: { error: 'Another unexpected error' },
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
        id: '123-456-789',
        error: 'Unexpected Error',
        wishlistItems: { error: 'Another unexpected error' },
      };
      const expectedState = {
        ...state,
        error: initialState.error,
        wishlistItems: {
          ...state.wishlistItems,
          error: initialState.wishlistItems.error,
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

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle ADD_ITEM_TO_WISHLIST_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.ADD_ITEM_TO_WISHLIST_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle GET_WISHLIST_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.GET_WISHLIST_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it('should handle GET_WISHLIST_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.GET_WISHLIST_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { id: 'foo' };

      expect(reducer(state).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle ADD_ITEM_TO_WISHLIST_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.ADD_ITEM_TO_WISHLIST_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle ADD_ITEM_TO_WISHLIST_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.ADD_ITEM_TO_WISHLIST_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle ADD_ITEM_TO_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle GET_WISHLIST_REQUEST action type', () => {
      expect(
        reducer(undefined, { type: actionTypes.GET_WISHLIST_REQUEST })
          .isLoading,
      ).toBe(true);
    });

    it('should handle GET_WISHLIST_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.GET_WISHLIST_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle GET_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionTypes.GET_WISHLIST_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('wishlistItems() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().wishlistItems;

      expect(state).toEqual(initialState.wishlistItems);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle DELETE_WISHLIST_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_WISHLIST_ITEM_REQUEST,
          meta: { wishlistItemId: 123 },
        }).wishlistItems,
      ).toEqual({ error: { 123: null }, isLoading: { 123: true } });
    });

    it('should handle UPDATE_WISHLIST_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_WISHLIST_ITEM_REQUEST,
          meta: { wishlistItemId: 123 },
        }).wishlistItems,
      ).toEqual({ error: { 123: null }, isLoading: { 123: true } });
    });

    it('should handle DELETE_WISHLIST_ITEM_FAILURE action type', () => {
      const mockError = 'Delete error';
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_WISHLIST_ITEM_FAILURE,
          payload: { error: mockError },
          meta: { wishlistItemId: 123 },
        }).wishlistItems,
      ).toEqual({
        error: { 123: mockError },
        isLoading: { 123: false },
      });
    });

    it('should handle DELETE_WISHLIST_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_WISHLIST_ITEM_SUCCESS,
          meta: { wishlistItemId: 123 },
        }).wishlistItems,
      ).toEqual({ error: {}, isLoading: { 123: false } });
    });

    it('should handle UPDATE_WISHLIST_ITEM_FAILURE action type', () => {
      const mockError = 'Delete error';
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_WISHLIST_ITEM_FAILURE,
          payload: { error: mockError },
          meta: { wishlistItemId: 123 },
        }).wishlistItems,
      ).toEqual({
        error: { 123: mockError },
        isLoading: { 123: false },
      });
    });

    it('should handle UPDATE_WISHLIST_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
          meta: { wishlistItemId: 123 },
        }).wishlistItems,
      ).toEqual({ error: {}, isLoading: { 123: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        wishlistItems: {
          error: { foo: 'Error' },
          isLoading: { foo: false },
        },
      };

      expect(reducer(state).wishlistItems).toEqual(state.wishlistItems);
    });
  });

  describe('entitiesMapper', () => {
    it('should map the DELETE_WISHLIST_ITEM_SUCCESS action to a new state', () => {
      const defaultState = { otherState: 'foo' };
      const newWishlistState = { wishlist: { 123: { items: ['foo'] } } };
      const state = {
        wishlist: { 123: ['foo', 'bar'] },
        ...defaultState,
      };
      const action = {
        payload: { result: 123, entities: newWishlistState },
        type: actionTypes.DELETE_WISHLIST_ITEM_SUCCESS,
      };

      expect(
        entitiesMapper[actionTypes.DELETE_WISHLIST_ITEM_SUCCESS](state, action),
      ).toEqual({ ...newWishlistState, ...defaultState });
    });

    it('should map the RESET_WISHLIST_ENTITIES action to a new state', () => {
      const state = {
        products: {
          1: { id: 1 },
        },
        wishlist: {
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

      expect(
        entitiesMapper[actionTypes.RESET_WISHLIST_ENTITIES](state),
      ).toEqual(expectedResult);
    });
  });

  describe('selectors from reducer', () => {
    describe('getId()', () => {
      it('should return the `id` property from a given state', () => {
        const id = 123;

        expect(fromReducer.getId({ id })).toBe(id);
      });
    });

    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = 'foo';

        expect(fromReducer.getError({ error })).toBe(error);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = 'foo';

        expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
      });
    });

    describe('getIsItemLoading()', () => {
      it('should return the `wishlistItems.isLoading` property from a given state', () => {
        const wishlistItems = { isLoading: { 123: true } };

        expect(fromReducer.getIsItemLoading({ wishlistItems })).toEqual(
          wishlistItems.isLoading,
        );
      });
    });

    describe('getItemError()', () => {
      it('should return the `wishlistItems.error` property from a given state', () => {
        const wishlistItems = { error: { 123: 'Error' } };

        expect(fromReducer.getItemError({ wishlistItems })).toEqual(
          wishlistItems.error,
        );
      });
    });
  });
});
