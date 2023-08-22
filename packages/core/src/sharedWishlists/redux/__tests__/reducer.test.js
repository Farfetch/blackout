import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import reducer, { entitiesMapper } from '../';

let initialState;

describe('shared wishlists reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state when there are no fields to keep', () => {
      const state = {
        error: null,
        isLoading: false,
        result: 'c38ab1af-b4d8-498f-bf8d-a7e1844dd1bc',
      };

      expect(
        reducer(state, {
          payload: {},
          type: actionTypes.RESET_SHARED_WISHLIST_STATE,
        }),
      ).toEqual(initialState);
    });

    it('should only reset to the initial state the fields specified to reset - reducer root (error)', () => {
      const state = {
        error: new Error('Something went wrong'),
        isLoading: true,
        result: null,
      };
      const expectedState = {
        ...state,
        error: initialState.error,
      };

      expect(
        reducer(state, {
          payload: { fieldsToReset: ['error'] },
          type: actionTypes.RESET_SHARED_WISHLIST_STATE,
        }),
      ).toEqual(expectedState);
    });
  });

  describe('error() reducer', () => {
    const currentState = { error: null };

    it('should return the initial state', () => {
      const state = reducer().error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle CREATE_SHARED_WISHLIST_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(currentState, {
          payload: { error: expectedResult },
          type: actionTypes.CREATE_SHARED_WISHLIST_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_SHARED_WISHLIST_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(currentState, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_SHARED_WISHLIST_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle REMOVE_SHARED_WISHLIST_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(currentState, {
          payload: { error: expectedResult },
          type: actionTypes.REMOVE_SHARED_WISHLIST_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_SHARED_WISHLIST_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(currentState, {
          payload: { error: expectedResult },
          type: actionTypes.UPDATE_SHARED_WISHLIST_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    const currentState = { isLoading: false };

    it('should return the initial state', () => {
      const state = reducer().isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle CREATE_SHARED_WISHLIST_REQUEST action type', () => {
      expect(
        reducer(currentState, {
          type: actionTypes.CREATE_SHARED_WISHLIST_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_SHARED_WISHLIST_REQUEST action type', () => {
      expect(
        reducer(currentState, {
          type: actionTypes.FETCH_SHARED_WISHLIST_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle REMOVE_SHARED_WISHLIST_REQUEST action type', () => {
      expect(
        reducer(currentState, {
          type: actionTypes.REMOVE_SHARED_WISHLIST_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle UPDATE_SHARED_WISHLIST_REQUEST action type', () => {
      expect(
        reducer(currentState, {
          type: actionTypes.UPDATE_SHARED_WISHLIST_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle CREATE_SHARED_WISHLIST_FAILURE action type', () => {
      expect(
        reducer(currentState, {
          payload: { error: 'foo' },
          type: actionTypes.CREATE_SHARED_WISHLIST_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_SHARED_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(currentState, {
          payload: { result: 'foo' },
          type: actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_SHARED_WISHLIST_FAILURE action type', () => {
      expect(
        reducer(currentState, {
          payload: { error: 'foo' },
          type: actionTypes.FETCH_SHARED_WISHLIST_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_SHARED_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(currentState, {
          payload: { result: 'foo' },
          type: actionTypes.FETCH_SHARED_WISHLIST_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle REMOVE_SHARED_WISHLIST_FAILURE action type', () => {
      expect(
        reducer(currentState, {
          payload: { error: 'foo' },
          type: actionTypes.REMOVE_SHARED_WISHLIST_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle REMOVE_SHARED_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(currentState, {
          payload: { result: 'foo' },
          type: actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_SHARED_WISHLIST_FAILURE action type', () => {
      expect(
        reducer(currentState, {
          payload: { error: 'foo' },
          type: actionTypes.UPDATE_SHARED_WISHLIST_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_SHARED_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(currentState, {
          payload: { result: 'foo' },
          type: actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    const currentState = { result: null };

    it('should return the initial state', () => {
      const state = reducer().result;

      expect(state).toBe(initialState.result);
      expect(state).toBeNull();
    });

    it('should handle FETCH_SHARED_WISHLIST_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(currentState, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_SHARED_WISHLIST_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle CREATE_SHARED_WISHLIST_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(currentState, {
          payload: { result: expectedResult },
          type: actionTypes.CREATE_SHARED_WISHLIST_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_SHARED_WISHLIST_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(currentState, {
          payload: { result: expectedResult },
          type: actionTypes.UPDATE_SHARED_WISHLIST_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle REMOVE_SHARED_WISHLIST_SUCCESS action type', () => {
      expect(
        reducer(currentState, {
          type: actionTypes.REMOVE_SHARED_WISHLIST_SUCCESS,
        }).result,
      ).toBe(initialState.result);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { result: 'foo' };

      expect(reducer(state).result).toBe(state.result);
    });
  });

  describe('entitiesMapper', () => {
    it('should map the RESET_SHARED_WISHLIST_ENTITIES action to a new state', () => {
      const state = {
        sharedWishlists: {
          1: { id: 1 },
        },
        sharedWishlistItems: {
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
        dummy: {
          1: { id: 1 },
        },
        dummy2: {
          2: { id: 2 },
        },
      };

      expect(
        entitiesMapper[actionTypes.RESET_SHARED_WISHLIST_ENTITIES](state),
      ).toEqual(expectedResult);
    });
  });

  describe('selectors from reducer', () => {
    describe('getResult()', () => {
      it('should return the `result` property from a given state', () => {
        const result = '123';

        expect(fromReducer.getResult({ result })).toBe(result);
      });
    });

    describe('getError()', () => {
      it('should return the `error` property from a given state', () => {
        const error = new Error('Something went wrong');

        expect(fromReducer.getError({ error })).toBe(error);
      });
    });

    describe('getIsLoading()', () => {
      it('should return the `isLoading` property from a given state', () => {
        const isLoading = 'foo';

        expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
      });
    });
  });

  describe('reducer', () => {
    describe('if action type is RESET_SHARED_WISHLIST_STATE', () => {
      it('should reset state with RESET_SHARED_WISHLIST_STATE action', () => {
        const state = {
          error: null,
          isLoading: true,
          result: 'foo',
        };

        expect(
          reducer(state, {
            payload: { fieldsToReset: ['isLoading', 'result'] },
            type: actionTypes.RESET_SHARED_WISHLIST_STATE,
          }),
        ).toEqual(initialState);
      });
      it('should return the initial state if there are not fields to reset', () => {
        const state = {
          error: null,
          isLoading: true,
          result: 'foo',
        };

        expect(
          reducer(state, {
            payload: {},
            type: actionTypes.RESET_SHARED_WISHLIST_STATE,
          }),
        ).toEqual(initialState);
      });
    });
  });
});
