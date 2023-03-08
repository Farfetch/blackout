import * as actionTypes from '../actionTypes.js';
import * as fromReducer from '../reducer.js';
import {
  expectedOrderReturnOptionsNormalizedPayload,
  expectedOrderReturnsNormalizedPayload,
  expectedOrdersResponseNormalizedPayload,
  getExpectedOrderDetailsNormalizedPayload,
  merchantId,
  merchantId2,
  mockState,
  orderEntity,
  orderId,
  orderId2,
  returnEntity2,
  returnId,
  returnId2,
  returnOptionEntity2,
  returnOptionId,
  returnOptionId2,
} from 'tests/__fixtures__/orders/index.mjs';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../../users/authentication/actionTypes.js';
import { merge, omit } from 'lodash-es';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { entitiesMapper } from '../reducer.js';
import type { OrdersState } from '../types/index.js';
import type { StoreState } from '../../types/index.js';

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
      expect(state).toBeNull();
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

    describe('should handle RESET_ORDER_RETURNS_STATE action type', () => {
      const state = {
        ...mockState.orders,
        orderReturns: {
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
            type: actionTypes.RESET_ORDER_RETURNS_STATE,
            payload: [],
          }).orderReturns,
        ).toEqual(initialState.orderReturns);
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
            type: actionTypes.RESET_ORDER_RETURNS_STATE,
            payload: [orderId],
          }).orderReturns,
        ).toEqual(expectedResult);
      });
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

    describe('should handle RESET_ORDER_RETURNS_STATE action type', () => {
      const state = {
        ...mockState.orders,
        orderReturnOptions: {
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
        ).toStrictEqual(expectedResult);
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
        ).toStrictEqual(expectedResult);
      });
    });

    describe('for FETCH_ORDER_RETURN_OPTIONS_SUCCESS', () => {
      const state = merge({}, mockState.entities);
      const returnOptionId1WithOrderId = `${orderId}_${returnOptionId}`;
      const returnOptionId2WithOrderId = `${orderId}_${returnOptionId2}`;

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
                  returnOptions: [returnOptionId2WithOrderId],
                },
              },
              returnOptions: [
                returnOptionId1WithOrderId,
                returnOptionId2WithOrderId,
              ],
            }),
          },
          returnOptions: {
            [returnOptionId1WithOrderId]: {
              ...expectedOrderReturnOptionsNormalizedPayload.entities
                .returnOptions[returnOptionId],
              id: returnOptionId1WithOrderId,
            },
            [returnOptionId2WithOrderId]: {
              ...expectedOrderReturnOptionsNormalizedPayload.entities
                .returnOptions[returnOptionId2],
              id: returnOptionId2WithOrderId,
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
        ).toStrictEqual(expectedMappedEntitiesResult);
      });
    });

    describe('for FETCH_ORDER_RETURNS_SUCCESS', () => {
      const state = merge(
        {},
        {
          ...mockState.entities,
          returns: undefined,
          returnItems: undefined,
        },
      );

      delete state.orders[orderId].byMerchant[merchantId]?.returns;
      delete state.orders[orderId].byMerchant[merchantId2]?.returns;
      delete state.orders[orderId].returns;

      const expectedMappedEntitiesResult = merge({}, mockState.entities);

      it('should handle FETCH_ORDER_RETURNS_SUCCESS action type', () => {
        expect(
          entitiesMapper[actionTypes.FETCH_ORDER_RETURNS_SUCCESS](state, {
            meta: { orderId },
            payload: expectedOrderReturnsNormalizedPayload,
            type: actionTypes.FETCH_ORDER_RETURNS_SUCCESS,
          }),
        ).toStrictEqual(expectedMappedEntitiesResult);
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

      describe('RESET_ORDER_RETURN_OPTIONS_ENTITIES action', () => {
        const otherReturnOptionId = `${orderId2}_${returnOptionId2}`;

        const state: NonNullable<StoreState['entities']> = merge(
          {},
          mockState.entities,
          {
            orders: {
              [orderId2]: {
                ...expectedOrdersResponseNormalizedPayload.entities.orders[
                  orderId2
                ],
                returnOptions: [otherReturnOptionId],
                byMerchant: {
                  [merchantId]: {
                    ...expectedOrdersResponseNormalizedPayload.entities.orders[
                      orderId2
                    ].byMerchant[merchantId],
                    returnOptions: [otherReturnOptionId],
                  },
                },
              },
            },
            returnOptions: {
              [otherReturnOptionId]: returnOptionEntity2,
            },
          },
        );

        it('should delete all order returnOptions properties and its entities when payload is either undefined, null or empty', () => {
          const expectedResult = merge({}, state);

          expectedResult.returnOptions = {};

          delete expectedResult.orders?.[orderId]?.returnOptions;
          delete expectedResult.orders?.[orderId]?.byMerchant[merchantId]
            ?.returnOptions;
          delete expectedResult.orders?.[orderId]?.byMerchant[merchantId2]
            ?.returnOptions;
          delete expectedResult.orders?.[orderId2]?.returnOptions;
          delete expectedResult.orders?.[orderId2]?.byMerchant?.[merchantId]
            ?.returnOptions;

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
          const expectedResult = merge({}, state);
          const returnOptionIdOrder1 = `${orderId}_${returnOptionId}`;
          const returnOptionIdOrder2 = `${orderId}_${returnOptionId2}`;

          delete expectedResult.returnOptions?.[returnOptionIdOrder1];
          delete expectedResult.returnOptions?.[returnOptionIdOrder2];

          delete expectedResult.orders?.[orderId]?.returnOptions;
          delete expectedResult.orders?.[orderId]?.byMerchant[merchantId]
            ?.returnOptions;
          delete expectedResult.orders?.[orderId]?.byMerchant[merchantId2]
            ?.returnOptions;

          const newState = entitiesMapper[
            actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES
          ](state, {
            meta: { orderId },
            type: actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES,
            payload: [orderId],
          });

          expect(newState).toStrictEqual(expectedResult);
          expect(newState.returnOptions?.[otherReturnOptionId]).toBeTruthy();
          expect(newState.returnOptions?.[otherReturnOptionId]).toEqual(
            expect.any(Object),
          );
        });
      });

      describe('RESET_ORDER_RETURNS_ENTITIES action', () => {
        const otherReturnId = returnId2 + 1;

        const state: NonNullable<StoreState['entities']> = merge(
          {},
          mockState.entities,
          {
            orders: {
              [orderId2]: {
                ...expectedOrdersResponseNormalizedPayload.entities.orders[
                  orderId2
                ],
                returns: [otherReturnId],
                byMerchant: {
                  [merchantId]: {
                    ...expectedOrdersResponseNormalizedPayload.entities.orders[
                      orderId2
                    ].byMerchant[merchantId],
                    returns: [otherReturnId],
                  },
                },
              },
            },
            returns: {
              [otherReturnId]: returnEntity2,
            },
          },
        );

        it('should delete all order returns properties and its entities when payload is either undefined, null or empty', () => {
          const expectedResult = merge({}, state);

          expectedResult.returns = {};

          delete expectedResult.orders?.[orderId]?.returns;
          delete expectedResult.orders?.[orderId]?.byMerchant[merchantId]
            ?.returns;
          delete expectedResult.orders?.[orderId]?.byMerchant[merchantId2]
            ?.returns;
          delete expectedResult.orders?.[orderId2]?.returns;
          delete expectedResult.orders?.[orderId2]?.byMerchant?.[merchantId]
            ?.returns;

          expect(
            entitiesMapper[actionTypes.RESET_ORDER_RETURNS_ENTITIES](state, {
              meta: { orderId },
              type: actionTypes.RESET_ORDER_RETURNS_ENTITIES,
              payload: undefined,
            }),
          ).toStrictEqual(expectedResult);

          expect(
            entitiesMapper[actionTypes.RESET_ORDER_RETURNS_ENTITIES](state, {
              meta: { orderId },
              type: actionTypes.RESET_ORDER_RETURNS_ENTITIES,
              payload: null,
            }),
          ).toStrictEqual(expectedResult);

          expect(
            entitiesMapper[actionTypes.RESET_ORDER_RETURNS_ENTITIES](state, {
              meta: { orderId },
              type: actionTypes.RESET_ORDER_RETURNS_ENTITIES,
              payload: [],
            }),
          ).toStrictEqual(expectedResult);
        });

        it('should delete the order returns properties and its entities for the orders passed on the payload', () => {
          const expectedResult = merge({}, state);

          delete expectedResult.returns?.[returnId];
          delete expectedResult.returns?.[returnId2];

          delete expectedResult.orders?.[orderId]?.returns;
          delete expectedResult.orders?.[orderId]?.byMerchant[merchantId]
            ?.returns;
          delete expectedResult.orders?.[orderId]?.byMerchant[merchantId2]
            ?.returns;

          const newState = entitiesMapper[
            actionTypes.RESET_ORDER_RETURNS_ENTITIES
          ](state, {
            meta: { orderId },
            type: actionTypes.RESET_ORDER_RETURNS_ENTITIES,
            payload: [orderId],
          });

          expect(newState).toStrictEqual(expectedResult);
          expect(newState.returns?.[otherReturnId]).toBeTruthy();
          expect(newState.returns?.[otherReturnId]).toEqual(expect.any(Object));
        });
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
