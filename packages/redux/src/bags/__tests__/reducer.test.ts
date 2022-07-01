import * as actionTypes from '../actionTypes';
import { LOGOUT_SUCCESS } from '../../users/authentication/actionTypes';
import {
  mockBagId,
  mockBagItemId,
  mockError,
  mockState,
} from 'tests/__fixtures__/bags';
import reducer, * as fromReducer from '../reducer';

let initialState;
const randomAction = { type: 'this_is_a_random_action' };

describe('bags redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
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

    it('should return the initial state when is a LOGOUT_SUCCESS action', () => {
      expect(
        reducer(undefined, {
          payload: {},
          type: LOGOUT_SUCCESS,
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
        items: {
          ...mockState.bag.items,
          item: {
            ...mockState.bag.items.item,
            error: initialState.items.item.error,
          },
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
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it('should handle ADD_BAG_ITEM_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.ADD_BAG_ITEM_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_BAG_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_BAG_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = { ...initialState, error: 'foo' };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it('should handle FETCH_BAG_SUCCESS action type', () => {
      const expectedResult = { id: mockBagId };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_BAG_SUCCESS,
        }).id,
      ).toBe(mockBagId);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, id: 'foo' };

      expect(reducer(state, randomAction).id).toBe(state.id);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toBe(initialState.result);
    });

    it('should handle FETCH_BAG_SUCCESS action type', () => {
      const expectedResult = { bar: 'foo', id: mockBagId };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_BAG_SUCCESS,
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, result: { bar: 'foo' } };

      expect(reducer(state, randomAction).result).toBe(state.result);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle ADD_BAG_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.ADD_BAG_ITEM_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle ADD_BAG_ITEM_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.ADD_BAG_ITEM_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle ADD_BAG_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.ADD_BAG_ITEM_SUCCESS,
          payload: { result: { items: [mockBagItemId] } },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_BAG_REQUEST action type', () => {
      expect(
        reducer(undefined, { type: actionTypes.FETCH_BAG_REQUEST }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_BAG_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_BAG_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_BAG_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: { id: mockBagId } },
          type: actionTypes.FETCH_BAG_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: 'foo' };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('items() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).items;

      expect(state).toEqual(initialState.items);
      expect(state).toEqual({ item: { error: {}, isLoading: {} }, ids: null });
    });

    it('should handle REMOVE_BAG_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_BAG_ITEM_REQUEST,
          meta: {
            bagItemId: mockBagItemId,
          },
        }).items,
      ).toEqual({
        ids: null,
        item: {
          error: { [mockBagItemId]: null },
          isLoading: { [mockBagItemId]: true },
        },
      });
    });

    it('should handle UPDATE_BAG_ITEM_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_BAG_ITEM_REQUEST,
          meta: {
            bagItemId: mockBagItemId,
          },
        }).items,
      ).toEqual({
        ids: null,
        item: {
          error: { [mockBagItemId]: null },
          isLoading: { [mockBagItemId]: true },
        },
      });
    });

    it('should handle REMOVE_BAG_ITEM_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_BAG_ITEM_FAILURE,
          payload: { error: mockError },
          meta: {
            bagItemId: mockBagItemId,
          },
        }).items,
      ).toEqual({
        ids: null,
        item: {
          error: { [mockBagItemId]: mockError },
          isLoading: { [mockBagItemId]: false },
        },
      });
    });

    it('should handle REMOVE_BAG_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.REMOVE_BAG_ITEM_SUCCESS,
          payload: {
            result: { items: [mockBagItemId] },
          },
          meta: {
            bagItemId: mockBagItemId,
          },
        }).items,
      ).toEqual({
        item: {
          error: {},
          isLoading: { [mockBagItemId]: false },
        },
        ids: [mockBagItemId],
      });
    });

    it('should handle UPDATE_BAG_ITEM_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_BAG_ITEM_FAILURE,
          payload: { error: mockError },
          meta: {
            bagItemId: mockBagItemId,
          },
        }).items,
      ).toEqual({
        ids: null,
        item: {
          error: { [mockBagItemId]: mockError },
          isLoading: { [mockBagItemId]: false },
        },
      });
    });

    it('should handle UPDATE_BAG_ITEM_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_BAG_ITEM_SUCCESS,
          payload: {
            result: { items: [mockBagItemId] },
          },
          meta: {
            bagItemId: mockBagItemId,
          },
        }).items,
      ).toEqual({
        item: {
          error: {},
          isLoading: { [mockBagItemId]: false },
        },
        ids: [mockBagItemId],
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        items: {
          item: {
            error: { foo: 'Error' },
            isLoading: { foo: false },
          },
        },
      };

      expect(reducer(state, randomAction).items).toEqual(state.items);
    });
  });

  describe('entitiesMapper()', () => {
    describe('reset bag', () => {
      const state = {
        bagItems: {
          1: {
            id: 1,
            customAttributes: '{ a: 1, b: 2, c: { d: 3 } }',
            quantity: 5,
            merchant: 1312,
            size: {
              id: 23,
              scale: 'IT',
              name: '11',
              stock: [{ merchantId: 1, quantity: 7 }],
            },
            sizeId: 23,
            isAvailable: true,
            product: 1,
          },
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

      it(`should handle ${actionTypes.RESET_BAG_ENTITIES} action type`, () => {
        expect(
          fromReducer.entitiesMapper[actionTypes.RESET_BAG_ENTITIES](state),
        ).toEqual(expectedResult);
      });

      it('should handle LOGOUT_SUCCESS action type', () => {
        expect(fromReducer.entitiesMapper[LOGOUT_SUCCESS](state)).toEqual(
          expectedResult,
        );
      });
    });
  });

  describe('getId() selector', () => {
    it('should return the `id` property from a given state', () => {
      const id = mockBagId;

      expect(fromReducer.getId({ ...initialState, id })).toBe(id);
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const error = 'foo';

      expect(fromReducer.getError({ ...initialState, error })).toBe(error);
    });
  });

  describe('getResult()', () => {
    it('should return the `result` property from a given state', () => {
      const result = 'foo';

      expect(fromReducer.getResult({ ...initialState, result })).toBe(result);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = 'foo';

      expect(fromReducer.getIsLoading({ ...initialState, isLoading })).toBe(
        isLoading,
      );
    });
  });

  describe('getAreItemsLoading() selector', () => {
    it('should return the `items.isLoading` property from a given state', () => {
      const items = { item: { isLoading: { [mockBagItemId]: true } } };

      expect(
        fromReducer.getAreItemsLoading({ ...initialState, items }),
      ).toEqual(items.item.isLoading);
    });
  });

  describe('getItemsError() selector', () => {
    it('should return the `items.error` property from a given state', () => {
      const items = { item: { error: { [mockBagItemId]: 'Error' } } };

      expect(fromReducer.getItemsError({ ...initialState, items })).toEqual(
        items.item.error,
      );
    });
  });

  describe('getItemsIds() selector', () => {
    it('should return the `items.ids` property from a given state', () => {
      const items = { ids: [mockBagItemId] };

      expect(fromReducer.getItemsIds({ ...initialState, items })).toEqual(
        items.ids,
      );
    });
  });
});
