import * as actionTypes from '../actionTypes.js';
import * as fromReducer from '../reducer.js';
import {
  defaultHashedQuery,
  merchantOrderId,
  merchantOrderId2,
  merchantOrderId3,
  mockState,
  orderId,
  orderId2,
} from 'tests/__fixtures__/orders/index.mjs';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../../users/authentication/actionTypes.js';
import { omit } from 'lodash-es';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { entitiesMapper } from '../reducer.js';
import type { OrdersState } from '../types/index.js';

let initialState: OrdersState;
const randomAction = { type: 'this_is_a_random_action' };

describe('orders reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it.each([
      actionTypes.RESET_ORDERS,
      LOGOUT_SUCCESS,
      LOGIN_SUCCESS,
      FETCH_USER_SUCCESS,
      REGISTER_SUCCESS,
    ])('should return initial state on %s action', actionType => {
      expect(
        reducer(mockState.orders, { type: actionType, payload: {} }),
      ).toMatchObject(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).error;

      expect(state).toBe(initialState.error);
    });

    it.each([actionTypes.FETCH_USER_ORDERS_REQUEST])(
      'should handle %s action type',
      actionType => {
        const state = {
          ...initialState,
          error: { [defaultHashedQuery]: toBlackoutError(new Error('error')) },
        };

        expect(
          reducer(state, {
            type: actionType,
            meta: { hash: defaultHashedQuery },
          }).error[defaultHashedQuery],
        ).toBeNull();
      },
    );

    it.each([actionTypes.FETCH_USER_ORDERS_FAILURE])(
      'should handle %s action type',
      actionType => {
        const error = toBlackoutError(new Error('foo'));

        expect(
          reducer(undefined, {
            payload: { error },
            type: actionType,
            meta: { hash: defaultHashedQuery },
          }).error[defaultHashedQuery],
        ).toBe(error);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: { [defaultHashedQuery]: toBlackoutError(new Error('error')) },
      };

      expect(reducer(state, randomAction).error[defaultHashedQuery]).toBe(
        state.error[defaultHashedQuery],
      );
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
    });

    it.each([actionTypes.FETCH_USER_ORDERS_REQUEST])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(undefined, {
            type: actionType,
            meta: { hash: defaultHashedQuery },
          }).isLoading[defaultHashedQuery],
        ).toBe(true);
      },
    );

    it.each([actionTypes.FETCH_USER_ORDERS_SUCCESS])(
      'should handle %s action type',
      actionType => {
        const state = {
          ...initialState,
          isLoading: {
            [defaultHashedQuery]: true,
          },
        };

        expect(
          reducer(state, {
            payload: { result: '' },
            type: actionType,
            meta: { hash: defaultHashedQuery },
          }).isLoading[defaultHashedQuery],
        ).toBe(false);
      },
    );

    it.each([actionTypes.FETCH_USER_ORDERS_FAILURE])(
      'should handle %s action type',
      actionType => {
        const state = {
          ...initialState,
          isLoading: {
            [defaultHashedQuery]: true,
          },
        };

        expect(
          reducer(state, {
            payload: { error: '' },
            type: actionType,
            meta: { hash: defaultHashedQuery },
          }).isLoading[defaultHashedQuery],
        ).toBe(false);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        isLoading: { [defaultHashedQuery]: false },
      };

      expect(reducer(state, randomAction).isLoading[defaultHashedQuery]).toBe(
        state.isLoading[defaultHashedQuery],
      );
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toBe(initialState.result);
      expect(state).toStrictEqual({});
    });

    it('should update the result when `FETCH_USER_ORDERS_SUCCESS` is dispatched', () => {
      const payload = {
        entries: [{ id: 'ORDVX' }],
        totalItems: 1,
        totalPages: 1,
        number: 1,
      };
      const result = {
        [defaultHashedQuery]: payload,
      };

      const state = reducer(undefined, {
        type: actionTypes.FETCH_USER_ORDERS_SUCCESS,
        payload: { result: payload },
        meta: { hash: defaultHashedQuery },
      }).result;

      expect(state).toStrictEqual(result);
    });

    it('should handle other actions by returning the previous state', () => {
      const result = {
        [defaultHashedQuery]: {
          entries: ['PZ1129361393'],
          totalItems: 1,
          totalPages: 1,
          number: 1,
        },
      };
      const state = { ...initialState, result };

      expect(reducer(state, randomAction).result).toBe(state.result);
    });
  });

  describe('orderDetails() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).orderDetails;

      expect(state).toEqual(initialState.orderDetails);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle FETCH_ORDER_REQUEST action type', () => {
      const state = {
        ...initialState,
        orderDetails: {
          error: {
            [orderId]: toBlackoutError(new Error('error')),
          },
          isLoading: {
            [orderId]: false,
          },
        },
      };

      expect(
        reducer(state, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_REQUEST,
        }).orderDetails,
      ).toEqual({
        error: { [orderId]: null },
        isLoading: { [orderId]: true },
      });
    });

    it('should handle FETCH_ORDER_FAILURE action type', () => {
      const state = {
        ...initialState,
        orderDetails: {
          error: {
            [orderId]: null,
          },
          isLoading: {
            [orderId]: true,
          },
        },
      };

      const error = toBlackoutError(new Error('error'));

      expect(
        reducer(state, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_FAILURE,
          payload: { error },
        }).orderDetails,
      ).toEqual({
        error: { [orderId]: error },
        isLoading: { [orderId]: false },
      });
    });

    it('should handle FETCH_ORDER_SUCCESS action type', () => {
      const state = {
        ...initialState,
        orderDetails: {
          error: {
            [orderId]: null,
          },
          isLoading: {
            [orderId]: true,
          },
        },
      };

      expect(
        reducer(state, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_SUCCESS,
        }).orderDetails,
      ).toEqual({
        error: state.orderDetails.error,
        isLoading: { [orderId]: false },
      });
    });

    describe('should handle RESET_ORDER_DETAILS_STATE action type', () => {
      const state = {
        ...mockState.orders,
        orderDetails: {
          error: {
            [orderId]: toBlackoutError(new Error('dummy_error')),
            [orderId2]: toBlackoutError(new Error('dummy_error_2')),
          },
          isLoading: { [orderId]: true, [orderId2]: true },
        },
      };

      it('should reset the state of all entries when payload is empty', () => {
        expect(
          reducer(state, {
            type: actionTypes.RESET_ORDER_DETAILS_STATE,
            payload: [],
          }).orderDetails,
        ).toEqual(initialState.orderDetails);
      });

      it('should reset the state of the selected entries in payload only', () => {
        const expectedResult = {
          error: {
            [orderId2]: expect.any(Error),
          },
          isLoading: {
            [orderId2]: true,
          },
        };

        expect(
          reducer(state, {
            type: actionTypes.RESET_ORDER_DETAILS_STATE,
            payload: [orderId],
          }).orderDetails,
        ).toEqual(expectedResult);
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        orderDetails: { error: {}, isLoading: { [orderId]: false } },
      };

      expect(reducer(state, randomAction).orderDetails).toEqual(
        state.orderDetails,
      );
    });
  });

  describe('orderReturnOptions() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).orderReturnOptions;

      expect(state).toEqual(initialState.orderReturnOptions);
      expect(state).toEqual({ error: {}, isLoading: {}, result: {} });
    });

    it('should handle FETCH_ORDER_RETURN_OPTIONS_REQUEST action type', () => {
      const state = {
        ...initialState,
        orderReturnOptions: {
          error: {
            [orderId]: toBlackoutError(new Error('error')),
          },
          isLoading: {
            [orderId]: false,
          },
          result: {},
        },
      };

      expect(
        reducer(state, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST,
        }).orderReturnOptions,
      ).toEqual({
        error: { [orderId]: null },
        isLoading: { [orderId]: true },
        result: {},
      });
    });

    it('should handle FETCH_ORDER_RETURN_OPTIONS_FAILURE action type', () => {
      const state = {
        ...initialState,
        orderReturnOptions: {
          error: {
            [orderId]: null,
          },
          isLoading: {
            [orderId]: true,
          },
          result: {},
        },
      };

      const error = toBlackoutError(new Error('error'));

      expect(
        reducer(state, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE,
          payload: { error },
        }).orderReturnOptions,
      ).toEqual({
        error: { [orderId]: error },
        isLoading: { [orderId]: false },
        result: {},
      });
    });

    it('should handle FETCH_ORDER_RETURN_OPTIONS_SUCCESS action type', () => {
      const state = {
        ...initialState,
        orderReturnOptions: {
          error: {
            [orderId]: null,
          },
          isLoading: {
            [orderId]: true,
          },
          result: {},
        },
      };

      expect(
        reducer(state, {
          meta: { orderId },
          payload: {
            result: [merchantOrderId, merchantOrderId2],
          },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
        }).orderReturnOptions,
      ).toEqual({
        error: state.orderReturnOptions.error,
        isLoading: { [orderId]: false },
        result: { [orderId]: [merchantOrderId, merchantOrderId2] },
      });
    });

    describe('should handle RESET_ORDER_RETURNS_STATE action type', () => {
      const state = {
        ...mockState.orders,
        orderReturnOptions: {
          error: {
            [orderId]: toBlackoutError(new Error('dummy_error')),
            [orderId2]: toBlackoutError(new Error('dummy_error_2')),
          },
          isLoading: { [orderId]: true, [orderId2]: true },
          result: {},
        },
      };

      it('should reset the state of all entries when payload is empty', () => {
        expect(
          reducer(state, {
            type: actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE,
            payload: [orderId, orderId2],
          }).orderReturnOptions,
        ).toEqual(initialState.orderReturnOptions);
      });

      it('should reset the state of the selected entries in payload only', () => {
        const expectedResult = {
          error: {
            [orderId2]: expect.any(Error),
          },
          isLoading: {
            [orderId2]: true,
          },
          result: {},
        };

        expect(
          reducer(state, {
            type: actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE,
            payload: [orderId],
          }).orderReturnOptions,
        ).toEqual(expectedResult);
      });
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        orderReturnOptions: {
          error: {},
          isLoading: { [orderId]: false },
          result: {},
        },
      };

      expect(reducer(state, randomAction).orderReturnOptions).toEqual(
        state.orderReturnOptions,
      );
    });
  });

  describe('entitiesMapper()', () => {
    describe('reset handling', () => {
      it.each([
        actionTypes.RESET_ORDERS,
        LOGOUT_SUCCESS,
        LOGIN_SUCCESS,
        FETCH_USER_SUCCESS,
        REGISTER_SUCCESS,
      ])('should return initial state on %s action', actionType => {
        const state = mockState.entities;
        const expectedResult = {
          ...omit(state, [
            'orders',
            'orderItems',
            'orderSummaries',
            'labelTracking',
            'returnOptions',
            'returns',
          ]),
        };

        expect(
          entitiesMapper[actionType as keyof typeof entitiesMapper](state, {
            type: actionType,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('RESET_ORDER_RETURN_OPTIONS_ENTITIES action', () => {
      const state = mockState.entities;

      it('should delete all order returnOptions properties and its entities when payload is either undefined, null or empty', () => {
        const expectedResult = {
          ...state,
          returnOptions: {},
        };

        expect(
          entitiesMapper[actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES](
            state,
            {
              meta: { orderId },
              type: actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES,
              payload: undefined,
            },
          ),
        ).toStrictEqual(expectedResult);

        expect(
          entitiesMapper[actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES](
            state,
            {
              meta: { orderId },
              type: actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES,
              payload: null,
            },
          ),
        ).toStrictEqual(expectedResult);

        expect(
          entitiesMapper[actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES](
            state,
            {
              meta: { orderId },
              type: actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES,
              payload: [],
            },
          ),
        ).toStrictEqual(expectedResult);
      });

      it('should delete the order returnOptions properties and its entities for the orders passed on the payload', () => {
        const expectedResult = {
          ...omit(state, [
            `returnOptions.${merchantOrderId}`,
            `returnOptions.${merchantOrderId2}`,
          ]),
        };

        const newState = entitiesMapper[
          actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES
        ](state, {
          meta: { orderId },
          type: actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES,
          payload: [orderId],
        });

        expect(newState).toStrictEqual(expectedResult);
        expect(newState.returnOptions?.[merchantOrderId3]).toBeTruthy();
        expect(newState.returnOptions?.[merchantOrderId3]).toEqual(
          expect.any(Object),
        );
      });
    });
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const state = {
        ...initialState,
        error: {
          [defaultHashedQuery]: toBlackoutError(new Error('error')),
        },
      };

      expect(fromReducer.getError(state)[defaultHashedQuery]).toBe(
        state.error[defaultHashedQuery],
      );
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const state = {
        ...initialState,
        isLoading: { [defaultHashedQuery]: false },
      };

      expect(fromReducer.getIsLoading(state)[defaultHashedQuery]).toBe(
        state.isLoading[defaultHashedQuery],
      );
    });
  });

  describe('getResult() selector', () => {
    it('should return the `result` property from a given state', () => {
      const state = { ...initialState, result: {} as OrdersState['result'] };

      expect(fromReducer.getResult(state)).toBe(state.result);
    });
  });

  describe('Sub-areas', () => {
    const subAreaResult = {
      error: {},
      isLoading: {},
    };

    const subAreas = {
      orderDetails: { ...subAreaResult },
      orderReturnOptions: { ...subAreaResult },
      trackings: { ...subAreaResult },
      documents: { ...subAreaResult },
      orderAvailableItemsActivities: { ...subAreaResult },
      orderItemAvailableActivities: { ...subAreaResult },
    };

    const subAreaNames = [
      'OrderDetails',
      'OrderReturnOptions',
      'ShipmentTrackings',
      'Documents',
      'OrderAvailableItemsActivities',
      'OrderItemAvailableActivities',
    ];

    it.each(subAreaNames)(
      'return the `%s` property from a given state',
      subArea => {
        const { [`get${subArea}` as keyof typeof subAreas]: reducerSelector } =
          fromReducer;

        expect(reducerSelector(subAreas, randomAction)).toEqual(subAreaResult);
      },
    );
  });
});
