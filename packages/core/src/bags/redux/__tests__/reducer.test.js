import * as fromReducer from '../reducer';
import { mockBagId, mockError, mockState } from 'tests/__fixtures__/bags';
import reducer, { actionTypes } from '..';

let initialState;

describe('bags redux reducer', () => {
  beforeEach(() => {
    initialState = reducer();
  });

  describe('reset handling', () => {
    it('should return the initial state when there are no fields to keep', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: actionTypes.RESET_BAG_STATE,
        }),
      ).toEqual(initialState);
    });

    it('should only reset to the initial state the fields specified to reset - reducer root (id)', () => {
      const expectedState = {
        ...mockState.bag,
        id: initialState.id,
      };

      expect(
        reducer(mockState.bag, {
          payload: { fieldsToReset: ['id'] },
          type: actionTypes.RESET_BAG_STATE,
        }),
      ).toEqual(expectedState);
    });

    it('should only reset to the initial state the fields specified to reset - reducer deep property (error)', () => {
      const expectedState = {
        ...mockState.bag,
        error: initialState.error,
        bagItems: {
          ...mockState.bag.bagItems,
          error: initialState.bagItems.error,
        },
      };

      expect(
        reducer(mockState.bag, {
          payload: { fieldsToReset: ['error'] },
          type: actionTypes.RESET_BAG_STATE,
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

    it('should handle ADD_ITEM_TO_BAG_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.ADD_ITEM_TO_BAG_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle GET_BAG_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.GET_BAG_FAILURE,
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

    it('should handle GET_BAG_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.GET_BAG_SUCCESS,
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

    it('should handle ADD_ITEM_TO_BAG_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.ADD_ITEM_TO_BAG_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle ADD_ITEM_TO_BAG_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.ADD_ITEM_TO_BAG_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle ADD_ITEM_TO_BAG_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.ADD_ITEM_TO_BAG_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle GET_BAG_REQUEST action type', () => {
      expect(
        reducer(undefined, { type: actionTypes.GET_BAG_REQUEST }).isLoading,
      ).toBe(true);
    });

    it('should handle GET_BAG_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.GET_BAG_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle GET_BAG_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionTypes.GET_BAG_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: 'foo' };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('bagItems() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer().bagItems;

      expect(state).toEqual(initialState.bagItems);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle DELETE_BAG_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_BAG_ITEM_REQUEST,
          payload: { bagItemId: mockBagId },
        }).bagItems,
      ).toEqual({
        error: { [mockBagId]: null },
        isLoading: { [mockBagId]: true },
      });
    });

    it('should handle UPDATE_BAG_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_BAG_ITEM_REQUEST,
          payload: { bagItemId: mockBagId },
        }).bagItems,
      ).toEqual({
        error: { [mockBagId]: null },
        isLoading: { [mockBagId]: true },
      });
    });

    it('should handle DELETE_BAG_ITEM_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_BAG_ITEM_FAILURE,
          payload: { error: mockError, bagItemId: mockBagId },
        }).bagItems,
      ).toEqual({
        error: { [mockBagId]: mockError },
        isLoading: { [mockBagId]: false },
      });
    });

    it('should handle DELETE_BAG_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.DELETE_BAG_ITEM_SUCCESS,
          payload: { bagItemId: mockBagId },
        }).bagItems,
      ).toEqual({ error: {}, isLoading: { [mockBagId]: false } });
    });

    it('should handle UPDATE_BAG_ITEM_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_BAG_ITEM_FAILURE,
          payload: { error: mockError, bagItemId: mockBagId },
        }).bagItems,
      ).toEqual({
        error: { [mockBagId]: mockError },
        isLoading: { [mockBagId]: false },
      });
    });

    it('should handle UPDATE_BAG_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
          payload: { bagItemId: mockBagId },
        }).bagItems,
      ).toEqual({ error: {}, isLoading: { [mockBagId]: false } });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        bagItems: {
          error: { foo: 'Error' },
          isLoading: { foo: false },
        },
      };

      expect(reducer(state).bagItems).toEqual(state.bagItems);
    });
  });

  describe('entitiesMapper()', () => {
    it('should map the DELETE_BAG_ITEM_SUCCESS action to a new state', () => {
      const defaultState = { otherState: 'foo' };
      const newBagState = { bag: { [mockBagId]: { items: ['foo'] } } };
      const state = {
        bag: { [mockBagId]: ['foo', 'bar'] },
        ...defaultState,
      };
      const action = {
        payload: { result: mockBagId, entities: newBagState },
        type: actionTypes.DELETE_BAG_ITEM_SUCCESS,
      };

      expect(
        fromReducer.entitiesMapper[actionTypes.DELETE_BAG_ITEM_SUCCESS](
          state,
          action,
        ),
      ).toEqual({ ...newBagState, ...defaultState });
    });

    describe('reset bag', () => {
      it(`should handle ${actionTypes.RESET_BAG_ENTITIES} action type`, () => {
        const state = {
          bag: {
            [mockBagId]: { id: mockBagId },
          },
          bagItems: {
            1: { id: 1 },
          },
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
          fromReducer.entitiesMapper[actionTypes.RESET_BAG_ENTITIES](state),
        ).toEqual(expectedResult);
      });
    });
  });

  describe('getId() selector', () => {
    it('should return the `id` property from a given state', () => {
      const id = mockBagId;

      expect(fromReducer.getId({ id })).toBe(id);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ error })).toBe(error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = 'foo';

      expect(fromReducer.getIsLoading({ isLoading })).toBe(isLoading);
    });
  });

  describe('getIsBagItemLoading() selector', () => {
    it('should return the `bagItems.isLoading` property from a given state', () => {
      const bagItems = { isLoading: { [mockBagId]: true } };

      expect(fromReducer.getIsBagItemLoading({ bagItems })).toEqual(
        bagItems.isLoading,
      );
    });
  });

  describe('getItemError() selector', () => {
    it('should return the `bagItems.error` property from a given state', () => {
      const bagItems = { error: { [mockBagId]: 'Error' } };

      expect(fromReducer.getItemError({ bagItems })).toEqual(bagItems.error);
    });
  });
});
