import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import { BlackoutError, toBlackoutError } from '@farfetch/blackout-client';
import {
  expectedOrderReturnOptionsNormalizedPayload,
  expectedOrdersResponseNormalizedPayload,
  getExpectedOrderDetailsNormalizedPayload,
  merchantId2,
  mockState,
  orderEntity,
  orderId,
  orderId2,
  returnOptionId,
  returnOptionId2,
} from 'tests/__fixtures__/orders';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../../users/authentication/actionTypes';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import reducer, { entitiesMapper } from '../reducer';
import type { OrdersState } from '../types';

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
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.FETCH_USER_ORDERS_REQUEST,
      actionTypes.FETCH_GUEST_ORDERS_REQUEST,
    ])('should handle %s action type', actionType => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('error')),
      };
      expect(
        reducer(state, {
          type: actionType,
          meta: {
            orderId,
          },
        }).error,
      ).toBe(initialState.error);
    });

    it.each([
      actionTypes.FETCH_USER_ORDERS_FAILURE,
      actionTypes.FETCH_GUEST_ORDERS_FAILURE,
    ])('should handle %s action type', actionType => {
      const error = 'foo';
      expect(
        reducer(undefined, {
          payload: { error },
          type: actionType,
          meta: {
            orderId,
          },
        }).error,
      ).toBe(error);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('error')),
      };

      expect(reducer(state, randomAction).error).toBe(state.error);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it.each([
      actionTypes.FETCH_USER_ORDERS_REQUEST,
      actionTypes.FETCH_GUEST_ORDERS_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
          meta: {
            orderId,
          },
        }).isLoading,
      ).toBe(true);
    });

    it.each([
      actionTypes.FETCH_USER_ORDERS_SUCCESS,
      actionTypes.FETCH_GUEST_ORDERS_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionType,
          meta: {
            orderId,
          },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it.each([
      actionTypes.FETCH_USER_ORDERS_FAILURE,
      actionTypes.FETCH_GUEST_ORDERS_FAILURE,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionType,
          meta: {
            orderId,
          },
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, isLoading: false };

      expect(reducer(state, randomAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('result() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).result;

      expect(state).toBe(initialState.result);
      expect(state).toBe(null);
    });

    it('should update the result when `FETCH_USER_ORDERS_SUCCESS` is dispatched', () => {
      const result = {
        entries: [{ id: 'ORDVX' }],
        totalItems: 1,
        totalPages: 1,
        number: 1,
      };

      const state = reducer(undefined, {
        type: actionTypes.FETCH_USER_ORDERS_SUCCESS,
        payload: { result },
      }).result;

      expect(state).toBe(result);
    });

    it('should update the result when `FETCH_GUEST_ORDERS_SUCCESS` is dispatched', () => {
      const result = [{ id: 'ORDVX' }];

      const state = reducer(undefined, {
        type: actionTypes.FETCH_GUEST_ORDERS_SUCCESS,
        payload: { result },
      }).result;

      expect(state).toBe(result);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { ...initialState, result: ['ORDVX'] };

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
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_REQUEST,
        }).orderDetails,
      ).toEqual({
        error: { [orderId]: null },
        isLoading: { [orderId]: true },
      });
    });

    it('should handle FETCH_ORDER_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_FAILURE,
          payload: { error: '' },
        }).orderDetails,
      ).toEqual({
        error: { [orderId]: '' },
        isLoading: { [orderId]: false },
      });
    });

    it('should handle FETCH_ORDER_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_SUCCESS,
        }).orderDetails,
      ).toEqual({ error: {}, isLoading: { [orderId]: false } });
    });

    it('should handle RESET_ORDER_DETAILS_STATE action type', () => {
      const state = {
        ...mockState.orders,
        orderDetails: {
          error: {
            [orderId]: new Error('dummy_error') as BlackoutError,
            [orderId2]: new Error('dummy_error_2') as BlackoutError,
          },
          isLoading: { [orderId]: true, [orderId2]: true },
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.RESET_ORDER_DETAILS_STATE,
          payload: [orderId, orderId2],
        }).orderDetails,
      ).toEqual(initialState.orderDetails);
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

  describe('orderReturns() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).orderReturns;

      expect(state).toEqual(initialState.orderReturns);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle FETCH_ORDER_RETURNS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURNS_REQUEST,
        }).orderReturns,
      ).toEqual({
        error: { [orderId]: null },
        isLoading: { [orderId]: true },
      });
    });

    it('should handle FETCH_ORDER_RETURNS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURNS_FAILURE,
          payload: { error: '' },
        }).orderReturns,
      ).toEqual({
        error: { [orderId]: '' },
        isLoading: { [orderId]: false },
      });
    });

    it('should handle FETCH_ORDER_RETURNS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURNS_SUCCESS,
        }).orderReturns,
      ).toEqual({ error: {}, isLoading: { [orderId]: false } });
    });

    it('should handle RESET_ORDER_RETURNS_STATE action type', () => {
      const state = {
        ...mockState.orders,
        orderReturns: {
          error: {
            [orderId]: new Error('dummy_error') as BlackoutError,
            [orderId2]: new Error('dummy_error_2') as BlackoutError,
          },
          isLoading: { [orderId]: true, [orderId2]: true },
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.RESET_ORDER_RETURNS_STATE,
          payload: [orderId, orderId2],
        }).orderReturns,
      ).toEqual(initialState.orderReturns);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        orderReturns: { error: {}, isLoading: { [orderId]: false } },
      };

      expect(reducer(state, randomAction).orderReturns).toEqual(
        state.orderReturns,
      );
    });
  });

  describe('orderReturnOptions() reducer', () => {
    it('should return the initial state', () => {
      const state = reducer(undefined, randomAction).orderReturnOptions;

      expect(state).toEqual(initialState.orderReturnOptions);
      expect(state).toEqual({ error: {}, isLoading: {} });
    });

    it('should handle FETCH_ORDER_RETURN_OPTIONS_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST,
        }).orderReturnOptions,
      ).toEqual({
        error: { [orderId]: null },
        isLoading: { [orderId]: true },
      });
    });

    it('should handle FETCH_ORDER_RETURN_OPTIONS_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE,
          payload: { error: '' },
        }).orderReturnOptions,
      ).toEqual({
        error: { [orderId]: '' },
        isLoading: { [orderId]: false },
      });
    });

    it('should handle FETCH_ORDER_RETURN_OPTIONS_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          meta: { orderId },
          type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
        }).orderReturnOptions,
      ).toEqual({ error: {}, isLoading: { [orderId]: false } });
    });

    it('should handle RESET_ORDER_RETURN_OPTIONS_STATE action type', () => {
      const state = {
        ...mockState.orders,
        orderReturnOptions: {
          error: {
            [orderId]: new Error('dummy_error') as BlackoutError,
            [orderId2]: new Error('dummy_error_2') as BlackoutError,
          },
          isLoading: { [orderId]: true, [orderId2]: true },
        },
      };

      expect(
        reducer(state, {
          type: actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE,
          payload: [orderId, orderId2],
        }).orderReturnOptions,
      ).toEqual(initialState.orderReturnOptions);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        orderReturnOptions: { error: {}, isLoading: { [orderId]: false } },
      };

      expect(reducer(state, randomAction).orderReturnOptions).toEqual(
        state.orderReturnOptions,
      );
    });
  });

  describe('entitiesMapper()', () => {
    describe('for FETCH_USER_ORDERS_SUCCESS', () => {
      const state = mockState.entities;
      it('should handle FETCH_USER_ORDERS_SUCCESS action type', () => {
        const expectedEntitiesState = merge(
          {},
          {
            ...state,
            orders: {},
            orderItems: {},
            returnOptions: {},
            returns: {},
          },
          expectedOrdersResponseNormalizedPayload.entities,
        );

        expect(
          entitiesMapper[actionTypes.FETCH_USER_ORDERS_SUCCESS](state, {
            payload: expectedOrdersResponseNormalizedPayload,
            type: actionTypes.FETCH_USER_ORDERS_SUCCESS,
          }),
        ).toEqual(expectedEntitiesState);
      });
    });

    describe('for FETCH_GUEST_ORDERS_SUCCESS', () => {
      const state = mockState.entities;

      it('should handle FETCH_GUEST_ORDERS_SUCCESS action type', () => {
        const expectedEntitiesState = merge(
          {},
          {
            ...state,
            orders: {},
            orderItems: {},
            returnOptions: {},
            returns: {},
          },
          expectedOrdersResponseNormalizedPayload.entities,
        );

        expect(
          entitiesMapper[actionTypes.FETCH_GUEST_ORDERS_SUCCESS](state, {
            payload: expectedOrdersResponseNormalizedPayload,
            type: actionTypes.FETCH_GUEST_ORDERS_SUCCESS,
          }),
        ).toEqual(expectedEntitiesState);
      });
    });

    describe('for FETCH_ORDER_SUCCESS', () => {
      it('should handle FETCH_ORDER_SUCCESS action type when the order exists', () => {
        const state = merge({}, mockState.entities);
        const normalizedPayload = getExpectedOrderDetailsNormalizedPayload();
        const expectedResult = merge({}, state, normalizedPayload.entities);

        expect(
          entitiesMapper[actionTypes.FETCH_ORDER_SUCCESS](state, {
            meta: { orderId },
            payload: normalizedPayload,
            type: actionTypes.FETCH_ORDER_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });

      it('should handle FETCH_ORDER_SUCCESS action type when the order does not exist', () => {
        // Clear orders and order items in state to test
        // when a fetch order details response is received
        // for an order that does not exist in state yet.
        const state = merge(
          {},
          {
            ...mockState.entities,
            orders: {},
            orderItems: {},
            returnOptions: {},
            returns: {},
          },
        );
        const normalizedPayload = getExpectedOrderDetailsNormalizedPayload();
        const expectedResult = merge({}, state, normalizedPayload.entities);

        expect(
          entitiesMapper[actionTypes.FETCH_ORDER_SUCCESS](state, {
            meta: { orderId },
            payload: normalizedPayload,
            type: actionTypes.FETCH_ORDER_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });
    });

    describe('for FETCH_ORDER_RETURN_OPTIONS_SUCCESS', () => {
      const state = merge({}, mockState.entities);

      const expectedMappedEntitiesResult = merge(
        {},
        state,
        {
          ...expectedOrderReturnOptionsNormalizedPayload.entities,
          returnOptions: {},
        },
        {
          orders: {
            [orderId]: merge({}, orderEntity, {
              byMerchant: {
                [merchantId2]: {
                  merchant: merchantId2,
                  returnOptions: [`${orderId}_${returnOptionId2}`],
                },
              },
            }),
          },
          returnOptions: {
            [`${orderId}_${returnOptionId}`]: {
              ...expectedOrderReturnOptionsNormalizedPayload.entities
                .returnOptions[returnOptionId],
              id: `${orderId}_${returnOptionId}`,
            },
            [`${orderId}_${returnOptionId2}`]: {
              ...expectedOrderReturnOptionsNormalizedPayload.entities
                .returnOptions[returnOptionId2],
              id: `${orderId}_${returnOptionId2}`,
            },
          },
        },
      );

      it('should handle FETCH_ORDER_RETURN_OPTIONS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS](
            state,
            {
              meta: { orderId },
              payload: expectedOrderReturnOptionsNormalizedPayload,
              type: actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS,
            },
          ),
        ).toEqual(expectedMappedEntitiesResult);
      });
    });

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
  });

  describe('getError() selector', () => {
    it('should return the `error` property from a given state', () => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('error')),
      };

      expect(fromReducer.getError(state)).toBe(state.error);
    });
  });

  describe('getIsLoading() selector', () => {
    it('should return the `isLoading` property from a given state', () => {
      const state = { ...initialState, isLoading: false };

      expect(fromReducer.getIsLoading(state)).toBe(state.isLoading);
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
      orderReturns: { ...subAreaResult },
      orderReturnOptions: { ...subAreaResult },
      trackings: { ...subAreaResult },
      documents: { ...subAreaResult },
      orderAvailableItemsActivities: { ...subAreaResult },
      orderItemAvailableActivities: { ...subAreaResult },
    };

    const subAreaNames = [
      'OrderDetails',
      'OrderReturns',
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
