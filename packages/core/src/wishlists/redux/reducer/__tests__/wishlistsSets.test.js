import * as fromReducer from '../wishlistsSets';
import { actionTypes } from '../../';
import { entitiesMapper } from '../';
import { mockWishlistSetId } from 'tests/__fixtures__/wishlists';

const reducer = fromReducer.default;
const mockError = 'foo';
let initialState;

describe('wishlistsSets reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state when there are no fields to keep', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: actionTypes.RESET_WISHLIST_SETS_STATE,
        }),
      ).toEqual(initialState);
    });

    it('should only reset to the initial state the fields specified to reset - reducer root (id)', () => {
      const state = {
        id: '123-456-789',
        error: 'Unexpected Error',
        sets: { error: 'Another unexpected error' },
      };
      const expectedState = {
        ...state,
        id: initialState.id,
      };

      expect(
        reducer(state, {
          payload: { fieldsToReset: ['id'] },
          type: actionTypes.RESET_WISHLIST_SETS_STATE,
        }),
      ).toEqual(expectedState);
    });

    it('should only reset to the initial state the fields specified to reset - reducer deep property (error)', () => {
      const state = {
        id: '123-456-789',
        error: 'Unexpected Error',
        sets: { error: 'Another unexpected error' },
      };
      const expectedState = {
        ...state,
        error: initialState.error,
        sets: {
          ...state.sets,
          error: initialState.sets.error,
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
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle GET_WISHLIST_SETS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: mockError },
          type: actionTypes.GET_WISHLIST_SETS_FAILURE,
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
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('ids() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().ids;

      expect(state).toBe(initialState.ids);
      expect(state).toBeNull();
    });

    it('should handle GET_WISHLIST_SETS_SUCCESS action type', () => {
      const expectedResult = [mockWishlistSetId];

      expect(
        reducer(undefined, {
          payload: { result: [mockWishlistSetId] },
          type: actionTypes.GET_WISHLIST_SETS_SUCCESS,
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
            ids: currentSetsIds,
          },
          {
            payload: { result: mockAnotherWishlistSetId },
            type: actionTypes.ADD_WISHLIST_SET_SUCCESS,
          },
        ).ids,
      ).toEqual(expectedResult);
    });

    it('should handle DELETE_WISHLIST_SET_SUCCESS action type', () => {
      const expectedResult = ['3425678756-0000-0000-0000-000000000000'];

      expect(
        reducer(
          {
            ids: [mockWishlistSetId, ...expectedResult],
          },
          {
            meta: { wishlistSetId: mockWishlistSetId },
            type: actionTypes.DELETE_WISHLIST_SET_SUCCESS,
          },
        ).ids,
      ).toEqual(expectedResult);
    });

    it('should handle GET_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: 'b1a13891-6084-489f-96ed-300eed45b948' },
          type: actionTypes.GET_WISHLIST_SUCCESS,
        }).ids,
      ).toBe(initialState.ids);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ids: 'foo' };

      expect(reducer(state).ids).toBe(state.ids);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle GET_WISHLIST_SETS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_WISHLIST_SETS_REQUEST,
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

    it('should handle GET_WISHLIST_SETS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: 'foo' },
          type: actionTypes.GET_WISHLIST_SETS_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle GET_WISHLIST_SETS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: 'bar' },
          type: actionTypes.GET_WISHLIST_SETS_FAILURE,
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
      const state = { isLoading: false };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('sets() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().sets;

      expect(state).toEqual(initialState.sets);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle DELETE_WISHLIST_SET_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_WISHLIST_SET_REQUEST,
          meta: { wishlistSetId: mockWishlistSetId },
        }).sets,
      ).toEqual({
        error: { [mockWishlistSetId]: null },
        isLoading: { [mockWishlistSetId]: true },
      });
    });

    it('should handle GET_WISHLIST_SET_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_WISHLIST_SET_REQUEST,
          meta: { wishlistSetId: mockWishlistSetId },
        }).sets,
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
        }).sets,
      ).toEqual({
        error: { [mockWishlistSetId]: null },
        isLoading: { [mockWishlistSetId]: true },
      });
    });

    it('should handle DELETE_WISHLIST_SET_SUCCESS action type', () => {
      const expectedSetsIds = ['3425678756-0000-0000-0000-000000000000'];

      expect(
        reducer(
          {
            ids: [mockWishlistSetId, ...expectedSetsIds],
          },
          {
            type: actionTypes.DELETE_WISHLIST_SET_SUCCESS,
            meta: { wishlistSetId: mockWishlistSetId },
          },
        ).sets,
      ).toEqual({
        error: initialState.sets.error,
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle GET_WISHLIST_SET_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_WISHLIST_SET_SUCCESS,
          meta: { wishlistSetId: mockWishlistSetId },
        }).sets,
      ).toEqual({
        error: initialState.sets.error,
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle UPDATE_WISHLIST_SET_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_WISHLIST_SET_SUCCESS,
          meta: { wishlistSetId: mockWishlistSetId },
        }).sets,
      ).toEqual({
        error: initialState.sets.error,
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle DELETE_WISHLIST_SET_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_WISHLIST_SET_FAILURE,
          payload: { error: mockError },
          meta: { wishlistSetId: mockWishlistSetId },
        }).sets,
      ).toEqual({
        error: { [mockWishlistSetId]: mockError },
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle GET_WISHLIST_SET_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.GET_WISHLIST_SET_FAILURE,
          payload: { error: mockError },
          meta: { wishlistSetId: mockWishlistSetId },
        }).sets,
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
        }).sets,
      ).toEqual({
        error: { [mockWishlistSetId]: mockError },
        isLoading: { [mockWishlistSetId]: false },
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        sets: {
          error: { mockWishlistSetId: mockError },
          isLoading: { mockWishlistSetId: false },
        },
      };

      expect(reducer(state).sets).toEqual(state.sets);
    });
  });

  describe('entitiesMapper', () => {
    it('should map the DELETE_WISHLIST_SET_SUCCESS action to a new state', () => {
      const state = {
        wishlistSets: {
          [mockWishlistSetId]: { id: mockWishlistSetId },
          '1354986456-0000-0000-0000-000000000000': {
            id: '1354986456-0000-0000-0000-000000000000',
          },
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
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };
      const action = {
        meta: { wishlistSetId: mockWishlistSetId },
        type: actionTypes.DELETE_WISHLIST_SET_SUCCESS,
      };

      expect(
        entitiesMapper[actionTypes.DELETE_WISHLIST_SET_SUCCESS](state, action),
      ).toEqual(expectedResult);
    });
  });

  describe('selectors from reducer', () => {
    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = mockError;

        expect(fromReducer.getError({ error })).toBe(error);
      });
    });

    describe('getIds()', () => {
      it('should return the `ids` property from a given state', () => {
        const ids = [mockWishlistSetId];

        expect(fromReducer.getIds({ ids })).toBe(ids);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = false;

        expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
      });
    });

    describe('getIsSetLoading()', () => {
      it('should return the `sets.isLoading` property from a given state', () => {
        const sets = { isLoading: { [mockWishlistSetId]: true } };

        expect(fromReducer.getIsSetLoading({ sets })).toEqual(sets.isLoading);
      });
    });

    describe('getSetError()', () => {
      it('should return the `sets.error` property from a given state', () => {
        const sets = { error: { [mockWishlistSetId]: mockError } };

        expect(fromReducer.getSetError({ sets })).toEqual(sets.error);
      });
    });
  });
});
