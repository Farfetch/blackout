import * as actionTypes from '../../actionTypes';
import { entitiesMapper } from '../';
import { LOGOUT_SUCCESS } from '../../../users/authentication/actionTypes';
import {
  mockWishlistItemId,
  mockWishlistSetId,
} from 'tests/__fixtures__/wishlists';
import reducer, {
  getError,
  getIds,
  getIsLoading,
  getIsSetLoading,
  getSetError,
  INITIAL_STATE,
} from '../wishlistsSets';

const mockError = { message: 'Dummy error' };
const mockAction = { type: 'foo' };
let initialState;

describe('wishlistsSets reducer', () => {
  beforeEach(() => {
    initialState = INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state when resetting it', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: actionTypes.RESET_WISHLIST_SETS_STATE,
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
        ids: [mockWishlistSetId],
        error: 'Unexpected Error',
        set: {
          ...INITIAL_STATE.set,
          error: {
            [mockWishlistSetId]: mockError,
          },
        },
      };
      const expectedState = {
        ...state,
        ids: initialState.ids,
      };

      expect(
        reducer(state, {
          payload: { fieldsToReset: ['ids'] },
          type: actionTypes.RESET_WISHLIST_SETS_STATE,
        }),
      ).toEqual(expectedState);
    });

    it('should only reset to the initial state the fields specified to reset - reducer deep property (error)', () => {
      const state = {
        ...INITIAL_STATE,
        ids: [mockWishlistSetId],
        error: 'Unexpected Error',
        set: {
          ...INITIAL_STATE.set,
          error: {
            [mockWishlistSetId]: mockError,
          },
        },
      };
      const expectedState = {
        ...state,
        error: initialState.error,
        set: {
          ...state.set,
          error: initialState.set.error,
        },
      };

      expect(
        reducer(state, {
          payload: { fieldsToReset: ['error'] },
          type: actionTypes.RESET_WISHLIST_SETS_STATE,
        }),
      ).toEqual(expectedState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle FETCH_WISHLIST_SETS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: mockError },
          type: actionTypes.FETCH_WISHLIST_SETS_FAILURE,
        }).error,
      ).toBe(mockError);
    });

    it('should handle ADD_WISHLIST_SET_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: mockError },
          type: actionTypes.ADD_WISHLIST_SET_FAILURE,
        }).error,
      ).toBe(mockError);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = { ...INITIAL_STATE, error: mockError };

      expect(reducer(state, mockAction).error).toBe(state.error);
    });
  });

  describe('ids() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.ids;

      expect(state).toBe(initialState.ids);
      expect(state).toBeNull();
    });

    it('should handle FETCH_WISHLIST_SETS_SUCCESS action type', () => {
      const expectedResult = [mockWishlistSetId];

      expect(
        reducer(undefined, {
          payload: { result: [mockWishlistSetId] },
          type: actionTypes.FETCH_WISHLIST_SETS_SUCCESS,
        }).ids,
      ).toEqual(expectedResult);
    });

    it('should handle ADD_WISHLIST_SET_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: mockWishlistSetId },
          type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
        }).ids,
      ).toEqual([mockWishlistSetId]);
    });

    it('should handle ADD_WISHLIST_SET_SUCCESS action type when the state already has content', () => {
      const mockAnotherWishlistSetId = '11111111-1111-1111-1111-111111111111';
      const currentSetsIds = [
        mockWishlistSetId,
        '3425678756-0000-0000-0000-000000000000',
      ];
      const expectedResult = [...currentSetsIds, mockAnotherWishlistSetId];

      expect(
        reducer(
          {
            ...INITIAL_STATE,
            ids: currentSetsIds,
          },
          {
            payload: { result: mockAnotherWishlistSetId },
            type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
          },
        ).ids,
      ).toEqual(expectedResult);
    });

    it('should handle REMOVE_WISHLIST_SET_SUCCESS action type', () => {
      const expectedResult = ['3425678756-0000-0000-0000-000000000000'];

      expect(
        reducer(
          {
            ...INITIAL_STATE,
            ids: [mockWishlistSetId, ...expectedResult],
          },
          {
            meta: { wishlistSetId: mockWishlistSetId },
            type: actionTypes.REMOVE_WISHLIST_SET_SUCCESS,
          },
        ).ids,
      ).toEqual(expectedResult);
    });

    it('should handle FETCH_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: 'b1a13891-6084-489f-96ed-300eed45b948' },
          type: actionTypes.FETCH_WISHLIST_SUCCESS,
        }).ids,
      ).toBe(initialState.ids);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...INITIAL_STATE, ids: [mockWishlistSetId] };

      expect(reducer(state, mockAction).ids).toBe(state.ids);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle FETCH_WISHLIST_SETS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_WISHLIST_SETS_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle ADD_WISHLIST_SET_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.ADD_WISHLIST_SET_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_WISHLIST_SETS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: 'foo' },
          type: actionTypes.FETCH_WISHLIST_SETS_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_WISHLIST_SETS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: 'bar' },
          type: actionTypes.FETCH_WISHLIST_SETS_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle ADD_WISHLIST_SET_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: 'foo' },
          type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle ADD_WISHLIST_SET_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: 'bar' },
          type: actionTypes.ADD_WISHLIST_SET_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...INITIAL_STATE, isLoading: false };

      expect(reducer(state, mockAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('sets() reducer', () => {
    it('should return the initial state', () => {
      const state = INITIAL_STATE.set;

      expect(state).toEqual(initialState.set);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle REMOVE_WISHLIST_SET_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_WISHLIST_SET_REQUEST,
          meta: { wishlistSetId: mockWishlistSetId },
        }).set,
      ).toEqual({
        error: { [mockWishlistSetId]: null },
        isLoading: { [mockWishlistSetId]: true },
      });
    });

    it('should handle FETCH_WISHLIST_SET_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_WISHLIST_SET_REQUEST,
          meta: { wishlistSetId: mockWishlistSetId },
        }).set,
      ).toEqual({
        error: { [mockWishlistSetId]: null },
        isLoading: { [mockWishlistSetId]: true },
      });
    });

    it('should handle UPDATE_WISHLIST_SET_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_WISHLIST_SET_REQUEST,
          meta: { wishlistSetId: mockWishlistSetId },
        }).set,
      ).toEqual({
        error: { [mockWishlistSetId]: null },
        isLoading: { [mockWishlistSetId]: true },
      });
    });

    it('should handle REMOVE_WISHLIST_SET_SUCCESS action type', () => {
      const expectedSetsIds = ['3425678756-0000-0000-0000-000000000000'];

      expect(
        reducer(
          {
            ...INITIAL_STATE,
            ids: [mockWishlistSetId, ...expectedSetsIds],
          },
          {
            type: actionTypes.REMOVE_WISHLIST_SET_SUCCESS,
            meta: { wishlistSetId: mockWishlistSetId },
          },
        ).set,
      ).toEqual({
        error: initialState.set.error,
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle FETCH_WISHLIST_SET_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_WISHLIST_SET_SUCCESS,
          meta: { wishlistSetId: mockWishlistSetId },
        }).set,
      ).toEqual({
        error: initialState.set.error,
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle UPDATE_WISHLIST_SET_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: { wishlistSetId: mockWishlistSetId },
        }).set,
      ).toEqual({
        error: initialState.set.error,
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle REMOVE_WISHLIST_SET_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_WISHLIST_SET_FAILURE,
          payload: { error: mockError },
          meta: { wishlistSetId: mockWishlistSetId },
        }).set,
      ).toEqual({
        error: { [mockWishlistSetId]: mockError },
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle FETCH_WISHLIST_SET_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_WISHLIST_SET_FAILURE,
          payload: { error: mockError },
          meta: { wishlistSetId: mockWishlistSetId },
        }).set,
      ).toEqual({
        error: { [mockWishlistSetId]: mockError },
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle UPDATE_WISHLIST_SET_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_WISHLIST_SET_FAILURE,
          payload: { error: mockError },
          meta: { wishlistSetId: mockWishlistSetId },
        }).set,
      ).toEqual({
        error: { [mockWishlistSetId]: mockError },
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...INITIAL_STATE,
        set: {
          error: { mockWishlistSetId: mockError },
          isLoading: { mockWishlistSetId: false },
        },
      };

      expect(reducer(state, mockAction).set).toEqual(state.set);
    });
  });

  describe('entitiesMapper', () => {
    it('should map the REMOVE_WISHLIST_SET_SUCCESS action to a new state', () => {
      const state = {
        wishlistSets: {
          [mockWishlistSetId]: { id: mockWishlistSetId },
          '1354986456-0000-0000-0000-000000000000': {
            id: '1354986456-0000-0000-0000-000000000000',
          },
        },
        wishlistItems: {
          [mockWishlistItemId]: { id: mockWishlistItemId },
        },
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };
      const expectedResult = {
        wishlistSets: {
          '1354986456-0000-0000-0000-000000000000': {
            id: '1354986456-0000-0000-0000-000000000000',
          },
        },
        wishlistItems: {
          [mockWishlistItemId]: { id: mockWishlistItemId },
        },
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };
      const action = {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.REMOVE_WISHLIST_SET_SUCCESS,
      };

      expect(
        entitiesMapper[actionTypes.REMOVE_WISHLIST_SET_SUCCESS](state, action),
      ).toEqual(expectedResult);
    });
    it('should map the RESET_WISHLIST_SETS_ENTITIES action to a new state', () => {
      const state = {
        wishlistSets: {
          1: { id: 1 },
        },
        wishlistItems: {
          [mockWishlistItemId]: { id: mockWishlistItemId },
        },
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };
      const expectedResult = {
        wishlistItems: {
          [mockWishlistItemId]: { id: mockWishlistItemId },
        },
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };

      expect(
        entitiesMapper[actionTypes.RESET_WISHLIST_SETS_ENTITIES](state),
      ).toEqual(expectedResult);
    });
  });

  describe('selectors from reducer', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = mockError;

        expect(getError({ ...INITIAL_STATE, error })).toBe(error);
      });
    });

    describe('getIds()', () => {
      it('should return the `ids` property from a given state', () => {
        const ids = [mockWishlistSetId];

        expect(getIds({ ...INITIAL_STATE, ids })).toBe(ids);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = false;

        expect(getIsLoading({ ...INITIAL_STATE, isLoading })).toBe(isLoading);
      });
    });

    describe('getIsSetLoading()', () => {
      it('should return the `sets.set.isLoading` property from a given state', () => {
        const set = {
          ...INITIAL_STATE.set,
          isLoading: { [mockWishlistSetId]: true },
        };

        expect(getIsSetLoading({ ...INITIAL_STATE, set })).toEqual(
          set.isLoading,
        );
      });
    });

    describe('getSetError()', () => {
      it('should return the `sets.set.error` property from a given state', () => {
        const set = {
          ...INITIAL_STATE.set,
          error: { [mockWishlistSetId]: mockError },
        };

        expect(getSetError({ ...INITIAL_STATE, set })).toEqual(set.error);
      });
    });
  });
});
