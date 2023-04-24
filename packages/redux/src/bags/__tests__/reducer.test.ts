import * as actionTypes from '../actionTypes.js';
import {
  FETCH_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from '../../users/authentication/actionTypes.js';
import {
  mockBagId,
  mockBagItemEntity,
  mockBagItemId,
  mockBagOperation,
  mockBagOperationId,
  mockError,
  mockState,
} from 'tests/__fixtures__/bags/index.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, * as fromReducer from '../reducer.js';
import type { BagNormalized, BagsState } from '../types/index.js';

let initialState: BagsState;
const randomAction = { type: 'this_is_a_random_action' };

describe('bags redux reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it('should return the initial state when there are no fields to keep', () => {
      expect(
        reducer(mockState.bag, {
          payload: {},
          type: actionTypes.RESET_BAG_STATE,
        }),
      ).toEqual(initialState);
    });

    it('should return the initial state when there is a LOGOUT_SUCCESS action', () => {
      expect(
        reducer(mockState.bag, {
          payload: {},
          type: LOGOUT_SUCCESS,
        }),
      ).toEqual(initialState);
    });

    describe('resetting when FETCH_USER_SUCCESS is dispatched', () => {
      it("should return the initial state if the user's bag id has changed", () => {
        const newBagId = mockBagId + '1';

        expect(
          reducer(mockState.bag, {
            payload: { entities: { user: { bagId: newBagId } } },
            type: FETCH_USER_SUCCESS,
          }),
        ).toEqual(initialState);
      });

      it("should return the same state if the user's bag id has _NOT_ changed", () => {
        expect(
          reducer(mockState.bag, {
            payload: { entities: { user: { bagId: mockBagId } } },
            type: FETCH_USER_SUCCESS,
          }),
        ).toEqual(mockState.bag);
      });
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

    it.each([
      actionTypes.ADD_BAG_ITEM_FAILURE,
      actionTypes.FETCH_BAG_FAILURE,
      actionTypes.REMOVE_BAG_ITEM_FAILURE,
      actionTypes.UPDATE_BAG_ITEM_FAILURE,
    ])('should handle %s action type', actionType => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionType,
          meta: { bagItemId: mockBagItemId },
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the initial state', () => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('error')),
      };

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

    it.each([
      actionTypes.ADD_BAG_ITEM_SUCCESS,
      actionTypes.FETCH_BAG_SUCCESS,
      actionTypes.REMOVE_BAG_ITEM_SUCCESS,
      actionTypes.UPDATE_BAG_ITEM_SUCCESS,
    ])('should handle %s action type', actionType => {
      const expectedResult = { bar: 'foo', id: mockBagId };

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionType,
          meta: { bagItemId: mockBagItemId },
        }).result,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = mockState?.bag;

      expect(reducer(state, randomAction).result).toBe(state.result);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
      actionTypes.ADD_BAG_ITEM_REQUEST,
      actionTypes.FETCH_BAG_REQUEST,
      actionTypes.REMOVE_BAG_ITEM_REQUEST,
      actionTypes.UPDATE_BAG_ITEM_REQUEST,
    ])(
      'should change `isLoading` to true when %s action type is dispatched',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
            meta: { bagItemId: mockBagItemId },
          }).isLoading,
        ).toBe(true);
      },
    );

    it.each([
      actionTypes.ADD_BAG_ITEM_FAILURE,
      actionTypes.FETCH_BAG_FAILURE,
      actionTypes.REMOVE_BAG_ITEM_FAILURE,
      actionTypes.UPDATE_BAG_ITEM_FAILURE,
    ])(
      'should change `isLoading` to false when %s action type is dispatched',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
            meta: { bagItemId: mockBagItemId },
            payload: { error: new Error('dummy error') },
          }).isLoading,
        ).toBe(false);
      },
    );

    it.each([
      actionTypes.ADD_BAG_ITEM_SUCCESS,
      actionTypes.FETCH_BAG_SUCCESS,
      actionTypes.REMOVE_BAG_ITEM_SUCCESS,
      actionTypes.UPDATE_BAG_ITEM_SUCCESS,
    ])(
      'should change `isLoading` to false when %s action type is dispatched',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
            payload: { result: { id: mockBagId } },
            meta: { bagItemId: mockBagItemId },
          }).isLoading,
        ).toBe(false);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

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
          ids: [mockBagItemId],
          item: {
            error: { [mockBagItemId]: toBlackoutError(new Error('error')) },
            isLoading: { [mockBagItemId]: false },
          },
        },
      };

      expect(reducer(state, randomAction).items).toEqual(state.items);
    });
  });

  describe('bagOperations() reducer', () => {
    it('should handle FETCH_BAG_OPERATION_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_BAG_OPERATION_REQUEST,
          meta: { bagOperationId: mockBagOperationId },
        }).bagOperations,
      ).toEqual({
        error: { [mockBagOperationId]: null },
        isLoading: { [mockBagOperationId]: true },
      });
    });

    it('should handle FETCH_BAG_OPERATION_FAILURE action type', () => {
      expect(
        reducer(
          {
            ...mockState.bag,
            bagOperations: {
              error: {},
              isLoading: { [mockBagOperationId]: true },
            },
          },
          {
            type: actionTypes.FETCH_BAG_OPERATION_FAILURE,
            payload: {
              error: mockError,
            },
            meta: {
              bagOperationId: mockBagOperationId,
            },
          },
        ).bagOperations,
      ).toEqual({
        error: { [mockBagOperationId]: mockError },
        isLoading: { [mockBagOperationId]: false },
      });
    });

    it('should handle FETCH_BAG_OPERATION_SUCCESS action type', () => {
      expect(
        reducer(
          {
            ...mockState.bag,
            bagOperations: {
              error: {},
              isLoading: { [mockBagOperationId]: true },
            },
          },
          {
            type: actionTypes.FETCH_BAG_OPERATION_SUCCESS,
            meta: { bagOperationId: mockBagOperationId },
          },
        ).bagOperations,
      ).toEqual({ error: {}, isLoading: { [mockBagOperationId]: false } });
    });

    it('should handle RESET_BAG_OPERATIONS_STATE action type', () => {
      expect(
        reducer(mockState.bag, {
          type: actionTypes.RESET_BAG_OPERATIONS_STATE,
        }).bagOperations,
      ).toEqual(initialState.bagOperations);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...mockState.bag,
        bagOperations: {
          error: { foo: toBlackoutError(new Error('Error')) },
          isLoading: { foo: false },
        },
      };

      expect(reducer(state, randomAction).bagOperations).toEqual(
        state.bagOperations,
      );
    });
  });

  describe('bagPromocodes() reducer', () => {
    it('should handle SET_BAG_PROMOCODES_REQUEST action type', () => {
      expect(
        reducer(
          {
            ...mockState.bag,
            bagPromocodes: {
              error: toBlackoutError(new Error('dummy')),
              isLoading: false,
              result: {
                promoCodesInformation: [],
              },
            },
          },
          {
            type: actionTypes.SET_BAG_PROMOCODES_REQUEST,
          },
        ).bagPromocodes,
      ).toEqual({
        error: null,
        isLoading: true,
        result: {
          promoCodesInformation: [],
        },
      });
    });

    it('should handle SET_BAG_PROMOCODES_FAILURE action type', () => {
      expect(
        reducer(mockState.bag, {
          type: actionTypes.SET_BAG_PROMOCODES_FAILURE,
          payload: {
            error: mockError,
          },
        }).bagPromocodes,
      ).toEqual({
        error: mockError,
        isLoading: false,
        result: undefined,
      });
    });

    it('should handle SET_BAG_PROMOCODES_SUCCESS action type', () => {
      const bagPromocodesInformation = {
        promoCodesInformation: [
          {
            promoCode: 'ABC',
            isValid: true,
          },
        ],
      };

      expect(
        reducer(
          {
            ...mockState.bag,
            bagPromocodes: {
              error: null,
              isLoading: true,
              result: undefined,
            },
          },
          {
            type: actionTypes.SET_BAG_PROMOCODES_SUCCESS,
            payload: bagPromocodesInformation,
          },
        ).bagPromocodes,
      ).toEqual({
        error: null,
        isLoading: false,
        result: bagPromocodesInformation,
      });
    });

    it('should handle RESET_BAG_PROMOCODES_STATE action type', () => {
      expect(
        reducer(
          {
            ...mockState.bag,
            bagPromocodes: {
              error: toBlackoutError(new Error('dummy')),
              isLoading: false,
              result: {
                promoCodesInformation: [],
              },
            },
          },
          {
            type: actionTypes.RESET_BAG_PROMOCODES_STATE,
          },
        ).bagPromocodes,
      ).toEqual(initialState.bagPromocodes);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...mockState.bag,
        bagPromocodes: {
          error: toBlackoutError(new Error('dummy')),
          isLoading: false,
          result: {
            promoCodesInformation: [],
          },
        },
      };

      expect(reducer(state, randomAction).bagPromocodes).toEqual(
        state.bagPromocodes,
      );
    });
  });

  describe('entitiesMapper()', () => {
    describe('reset bag', () => {
      const state = {
        bagItems: {
          ...mockBagItemEntity,
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

    describe('reset bag operations', () => {
      it('should only reset the bag operations to the initial state', () => {
        const state = {
          bagOperations: {
            [mockBagOperationId]: mockBagOperation,
          },
          dummy: {
            1: { id: 1 },
          },
          dummy2: {
            2: { id: 2 },
          },
        };
        const expectedState = {
          dummy: {
            1: { id: 1 },
          },
          dummy2: {
            2: { id: 2 },
          },
        };

        expect(
          fromReducer.entitiesMapper[actionTypes.RESET_BAG_OPERATIONS_ENTITIES](
            state,
          ),
        ).toEqual(expectedState);
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
      const error = toBlackoutError(new Error('error'));

      expect(fromReducer.getError({ ...initialState, error })).toBe(error);
    });
  });

  describe('getResult()', () => {
    it('should return the `result` property from a given state', () => {
      const result = {
        id: mockBagId,
        bagSummary: {},
        count: 1,
        items: [1],
        hadUnavailableItems: false,
      } as BagNormalized;

      expect(fromReducer.getResult({ ...initialState, result })).toBe(result);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const isLoading = true;

      expect(fromReducer.getIsLoading({ ...initialState, isLoading })).toBe(
        isLoading,
      );
    });
  });

  describe('getAreItemsLoading() selector', () => {
    it('should return the `items.isLoading` property from a given state', () => {
      const items = {
        ids: [mockBagItemId],
        item: {
          isLoading: { [mockBagItemId]: true },
          error: { [mockBagItemId]: toBlackoutError(new Error('error')) },
        },
      };

      expect(
        fromReducer.getAreItemsLoading({ ...initialState, items }),
      ).toEqual(items.item.isLoading);
    });
  });

  describe('getItemsError() selector', () => {
    it('should return the `items.error` property from a given state', () => {
      const items = {
        ids: [mockBagItemId],
        item: {
          isLoading: { [mockBagItemId]: false },
          error: { [mockBagItemId]: toBlackoutError(new Error('error')) },
        },
      };

      expect(fromReducer.getItemsError({ ...initialState, items })).toEqual(
        items.item.error,
      );
    });
  });

  describe('getItemsIds() selector', () => {
    it('should return the `items.ids` property from a given state', () => {
      const items = {
        ids: [mockBagItemId],
        item: {
          isLoading: { [mockBagItemId]: false },
          error: { [mockBagItemId]: toBlackoutError(new Error('error')) },
        },
      };

      expect(fromReducer.getItemsIds({ ...initialState, items })).toEqual(
        items.ids,
      );
    });
  });

  describe('getIsBagOperationLoading() selector', () => {
    it('should return the `bagOperations.isLoading` property from a given state', () => {
      const bagOperations = {
        isLoading: { [mockBagOperationId]: true },
        error: {},
      };

      expect(
        fromReducer.getIsBagOperationLoading({
          ...mockState.bag,
          bagOperations,
        }),
      ).toEqual(bagOperations.isLoading);
    });
  });

  describe('getBagOperationError() selector', () => {
    it('should return the `bagOperations.error` property from a given state', () => {
      const bagOperations = {
        error: { [mockBagOperationId]: toBlackoutError(new Error('error')) },
        isLoading: {},
      };

      expect(
        fromReducer.getBagOperationError({ ...mockState.bag, bagOperations }),
      ).toEqual(bagOperations.error);
    });
  });
});
