import * as actionTypes from '../actionTypes';
import * as fromReducer from '../reducer';
import {
  checkoutOrderItemId,
  mockGetOperationActionPayload,
  mockGetOperationsActionPayload,
} from 'tests/__fixtures__/checkout';
import { LOGOUT_SUCCESS } from '../../users/authentication/actionTypes';
import reducer, { entitiesMapper } from '../reducer';
import type { CheckoutOrderItemEntity } from '../../entities/types';
import type {
  CheckoutState,
  RemoveCheckoutOrderItemSuccessAction,
  UpdateCheckoutOrderItemSuccessAction,
} from '../types';
import type { StoreState } from '../../types';

let initialState: CheckoutState;

describe('checkout reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_CHECKOUT_REQUEST,
      actionTypes.FETCH_CHECKOUT_REQUEST,
      actionTypes.UPDATE_CHECKOUT_REQUEST,
      actionTypes.RESET_CHECKOUT_STATE,
      LOGOUT_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(
          {
            error: 'previous error',
          },
          {
            type: actionType,
          },
        ).error,
      ).toBe(initialState.error);
    });

    it('should handle CREATE_CHECKOUT_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.CREATE_CHECKOUT_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_CHECKOUT_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_CHECKOUT_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_CHECKOUT_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.UPDATE_CHECKOUT_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it.each([actionTypes.RESET_CHECKOUT_STATE, LOGOUT_SUCCESS])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(
            {
              error: true,
            },
            {
              type: actionType,
            },
          ).error,
        ).toBe(initialState.error);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = { error: 'foo' };

      expect(reducer(state).error).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it.each([actionTypes.RESET_CHECKOUT_STATE, LOGOUT_SUCCESS])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(
            {
              id: 'previous id',
            },
            {
              type: actionType,
            },
          ).id,
        ).toBe(initialState.id);
      },
    );

    it('should handle CREATE_CHECKOUT_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.CREATE_CHECKOUT_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_CHECKOUT_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_CHECKOUT_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_CHECKOUT_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_CHECKOUT_DETAILS_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle SET_ITEM_TAGS_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.SET_ITEM_TAGS_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle SET_PROMOCODE_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.SET_PROMOCODE_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle SET_TAGS_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.SET_TAGS_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle RESET_CHECKOUT_STATE action type', () => {
      const currentState = { id: 12121 };

      expect(
        reducer(currentState, {
          type: actionTypes.RESET_CHECKOUT_STATE,
        }).id,
      ).toBe(initialState.id);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { id: 'foo' };

      expect(reducer(state).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle CREATE_CHECKOUT_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_CHECKOUT_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_CHECKOUT_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CHECKOUT_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle UPDATE_CHECKOUT_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_CHECKOUT_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle CREATE_CHECKOUT_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.CREATE_CHECKOUT_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_CHECKOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionTypes.CREATE_CHECKOUT_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_CHECKOUT_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.FETCH_CHECKOUT_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_CHECKOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionTypes.FETCH_CHECKOUT_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_CHECKOUT_FAILURE action type', () => {
      expect(
        reducer(undefined, {
          payload: { error: '' },
          type: actionTypes.UPDATE_CHECKOUT_FAILURE,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_CHECKOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          payload: { result: '' },
          type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
        }).isLoading,
      ).toBe(initialState.isLoading);
    });

    it.each([actionTypes.RESET_CHECKOUT_STATE, LOGOUT_SUCCESS])(
      'should handle %s action type',
      actionType => {
        expect(
          reducer(
            {
              isLoading: true,
            },
            {
              type: actionType,
            },
          ).isLoading,
        ).toBe(initialState.isLoading);
      },
    );

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: false };

      expect(reducer(state).isLoading).toBe(state.isLoading);
    });
  });

  describe('charges() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.checkoutOrderCharge;

      expect(state).toEqual(initialState.checkoutOrderCharge);
    });

    it('should handle CREATE_CHECKOUT_ORDER_CHARGE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_REQUEST,
        }).checkoutOrderCharge,
      ).toEqual({
        error: initialState.checkoutOrderCharge.error,
        isLoading: true,
        result: null,
      });
    });

    it('should handle FETCH_CHECKOUT_ORDER_CHARGE_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_REQUEST,
        }).checkoutOrderCharge,
      ).toEqual({
        error: initialState.checkoutOrderCharge.error,
        isLoading: true,
        result: null,
      });
    });

    it('should handle CREATE_CHECKOUT_ORDER_CHARGE_FAILURE action type', () => {
      const mockError = 'mocked error';
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_FAILURE,
          payload: { error: mockError },
        }).checkoutOrderCharge,
      ).toEqual({ error: mockError, isLoading: false, result: null });
    });

    it('should handle FETCH_CHECKOUT_ORDER_CHARGE_FAILURE action type', () => {
      const mockError = 'mocked error';
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_FAILURE,
          payload: { error: mockError },
        }).checkoutOrderCharge,
      ).toEqual({ error: mockError, isLoading: false, result: null });
    });

    it('should handle CREATE_CHECKOUT_ORDER_CHARGE_SUCCESS action type', () => {
      const mockResult = 'mocked result';
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_SUCCESS,
          payload: mockResult,
        }).checkoutOrderCharge,
      ).toEqual({
        error: initialState.checkoutOrderCharge.error,
        isLoading: false,
        result: mockResult,
      });
    });

    it('should handle FETCH_CHECKOUT_ORDER_CHARGE_SUCCESS action type', () => {
      const mockResult = 'mocked result';
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_SUCCESS,
          payload: mockResult,
        }).checkoutOrderCharge,
      ).toEqual({
        error: initialState.checkoutOrderCharge.error,
        isLoading: false,
        result: mockResult,
      });
    });

    it('should handle RESET_CHECKOUT_ORDER_CHARGE_STATE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CHECKOUT_ORDER_CHARGE_STATE,
        }).checkoutOrderCharge,
      ).toEqual(initialState.checkoutOrderCharge);
    });

    it('should handle LOGOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }).checkoutOrderCharge,
      ).toEqual(initialState.checkoutOrderCharge);
    });
  });

  describe('deliveryBundleUpgrades() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.deliveryBundleUpgrades;

      expect(state).toEqual(initialState.deliveryBundleUpgrades);
    });

    it('should handle LOGOUT_SUCCESS action type', () => {
      expect(
        reducer(undefined, {
          type: LOGOUT_SUCCESS,
        }).deliveryBundleUpgrades,
      ).toEqual(initialState.deliveryBundleUpgrades);
    });

    it.each([
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST,
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).deliveryBundleUpgrades,
      ).toEqual({
        error: initialState.deliveryBundleUpgrades.error,
        isLoading: true,
        result: null,
      });
    });

    it.each([
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE,
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_FAILURE,
    ])('should handle %s action type', actionType => {
      const mockError = 'mocked error';
      expect(
        reducer(undefined, {
          type: actionType,
          payload: { error: mockError },
        }).deliveryBundleUpgrades,
      ).toEqual({ error: mockError, isLoading: false, result: null });
    });

    it.each([
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS,
      actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).deliveryBundleUpgrades,
      ).toEqual({
        error: initialState.deliveryBundleUpgrades.error,
        isLoading: false,
        result: null,
      });
    });

    it('should handle @farfetch/blackout-redux/FETCH_DELIVERY_BUNDLE_UPGRADES_SUCCESS action type', () => {
      const mockResult = { result: 'mocked result' };
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
          payload: mockResult,
        }).deliveryBundleUpgrades,
      ).toEqual({
        error: initialState.deliveryBundleUpgrades.error,
        isLoading: false,
        result: mockResult.result,
      });
    });
  });

  describe('operation() reducer', () => {
    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_OPERATION_REQUEST action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_REQUEST,
      };
      const state = reducer(undefined, action);
      expect(state.operation.isLoading).toBe(true);
      expect(state.operation.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_OPERATION_FAILURE action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);
      expect(state.operation.isLoading).toBe(false);
      expect(state.operation.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_OPERATION_SUCCESS action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATION_SUCCESS,
        payload: mockGetOperationActionPayload,
      };
      const state = reducer(undefined, action);
      expect(state.operation.isLoading).toBe(false);
      expect(state.operation.error).toBeNull();
    });
  });

  describe('operations() reducer', () => {
    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS_REQUEST,
      };
      const state = reducer(undefined, action);
      expect(state.operations.isLoading).toBe(true);
      expect(state.operations.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_OPERATIONS_FAILURE action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);
      expect(state.operations.isLoading).toBe(false);
      expect(state.operations.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_OPERATIONS_SUCCESS action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_OPERATIONS_SUCCESS,
        payload: mockGetOperationsActionPayload,
      };
      const state = reducer(undefined, action);
      expect(state.operations.isLoading).toBe(false);
      expect(state.operations.error).toBeNull();
      expect(state.operations.result).toBe(action.payload.result);
    });
  });

  describe('removeOrderItem() reducer', () => {
    it('should handle @farfetch/blackout-redux/REMOVE_CHECKOUT_ORDER_ITEM_REQUEST action', () => {
      const action = {
        type: actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_REQUEST,
      };
      const state = reducer(undefined, action);
      expect(state.removeOrderItem.isLoading).toBe(true);
      expect(state.removeOrderItem.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/REMOVE_CHECKOUT_ORDER_ITEM_FAILURE action', () => {
      const action = {
        type: actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);
      expect(state.removeOrderItem.isLoading).toBe(false);
      expect(state.removeOrderItem.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS action', () => {
      const action = {
        type: actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS,
        payload: { quantity: 2 },
      };
      const state = reducer(undefined, action);
      expect(state.removeOrderItem.isLoading).toBe(false);
      expect(state.removeOrderItem.error).toBeNull();
    });
  });

  describe('updateOrderItem() reducer', () => {
    it('should handle @farfetch/blackout-redux/UPDATE_CHECKOUT_ORDER_ITEM_REQUEST action', () => {
      const action = {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_REQUEST,
      };
      const state = reducer(undefined, action);
      expect(state.updateOrderItem.isLoading).toBe(true);
      expect(state.updateOrderItem.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/UPDATE_CHECKOUT_ORDER_ITEM_FAILURE action', () => {
      const action = {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);
      expect(state.updateOrderItem.isLoading).toBe(false);
      expect(state.updateOrderItem.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS action', () => {
      const action = {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS,
        payload: mockGetOperationActionPayload,
      };
      const state = reducer(undefined, action);
      expect(state.updateOrderItem.isLoading).toBe(false);
      expect(state.updateOrderItem.error).toBeNull();
    });
  });

  describe('entitiesMapper()', () => {
    describe('without convertCheckoutOrder', () => {
      const entities = {
        anotherProp: 123,
        products: {
          1: {
            id: 1,
          },
          2: {
            id: 2,
          },
        },
        checkout: {
          1: { data: 'data' },
        },
        checkoutOrders: {
          1: { checkout: 1 },
        },
      };
      const state = {
        checkout: {
          1: { data: 'data' },
        },
        checkoutOrders: {
          1: { checkout: 1 },
        },
        products: {
          1: {
            id: 1,
          },
          2: {
            id: 2,
          },
        },
      };

      const expectedResult = {
        checkout: {
          1: { data: 'data' },
        },
        checkoutOrders: {
          1: {
            checkout: 1,
            ...entities,
          },
        },
        products: {
          1: {
            id: 1,
          },
          2: {
            id: 2,
          },
        },
      };

      it(`should handle ${actionTypes.FETCH_COLLECT_POINTS_SUCCESS}`, () => {
        expect(
          entitiesMapper[actionTypes.FETCH_COLLECT_POINTS_SUCCESS](state, {
            meta: { id: 1 },
            payload: { entities },
            type: actionTypes.FETCH_COLLECT_POINTS_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });

      it(`should handle ${actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS}`, () => {
        const metaId = 1;
        const payload = {
          entities: {
            ...entities,
            products: {
              3: {
                id: 3,
              },
            },
          },
        };
        expect(
          entitiesMapper[actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS](state, {
            meta: { id: metaId },
            payload,
            type: actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS,
          }),
        ).toEqual({
          ...state,
          ...entities,
          products: {
            ...state.products,
            3: {
              id: 3,
            },
          },
          checkout: {
            1: {
              data: 'data',
              checkoutOrder: 1,
            },
          },
        });
      });

      it(`should handle ${actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS}`, () => {
        const mockState = {
          ...state,
          deliveryBundles: {
            12345678: {
              id: 12345678,
            },
          },
        };
        expect(
          entitiesMapper[actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS](
            mockState,
            {
              meta: { deliveryBundleId: 12345678 },
              payload: {
                entities: {
                  itemDeliveryProvisioning: {
                    123: {
                      itemId: 123,
                    },
                    321: {
                      itemId: 321,
                    },
                  },
                },
                result: [123, 321],
              },
              type: actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS,
            },
          ),
        ).toEqual({
          ...state,
          deliveryBundles: {
            12345678: {
              id: 12345678,
              itemDeliveryProvisioning: {
                123: {
                  itemId: 123,
                },
                321: {
                  itemId: 321,
                },
              },
              itemsIds: [123, 321],
            },
          },
        });
      });

      it(`should handle ${actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS}`, () => {
        const mockState = {
          ...state,
          deliveryBundleUpgrades: {
            123: {
              1234: {
                Estimated: [
                  {
                    id: 1100,
                    itemId: 1234,
                    name: 'Fast',
                  },
                ],
              },
              4321: {
                Estimated: [
                  {
                    id: 1102,
                    itemId: 4321,
                    name: 'Fast',
                  },
                ],
              },
            },
          },
        };
        expect(
          entitiesMapper[
            actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS
          ](mockState, {
            meta: { deliveryBundleId: 123, upgradeId: 5555 },
            payload: {
              entities: {
                itemDeliveryProvisioning: {
                  1234: {
                    itemId: 1234,
                    provisioning: {
                      merchantId: 1,
                      quantity: 3,
                      deliveryDateEstimate: '2020-04-01T15:41:53.776Z',
                    },
                  },
                  4321: {
                    itemId: 4321,
                    provisioning: {
                      merchantId: 2,
                      quantity: 3,
                      deliveryDateEstimate: '2020-04-03T15:41:53.776Z',
                    },
                  },
                },
              },
              result: [1234, 4321],
            },
            type: actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS,
          }),
        ).toEqual({
          ...state,
          deliveryBundleUpgrades: {
            123: {
              1234: {
                Estimated: [
                  {
                    id: 1100,
                    itemId: 1234,
                    name: 'Fast',
                  },
                ],
                provisioning: {
                  merchantId: 1,
                  quantity: 3,
                  deliveryDateEstimate: '2020-04-01T15:41:53.776Z',
                  upgradeId: 5555,
                },
              },
              4321: {
                Estimated: [
                  {
                    id: 1102,
                    itemId: 4321,
                    name: 'Fast',
                  },
                ],
                provisioning: {
                  merchantId: 2,
                  quantity: 3,
                  deliveryDateEstimate: '2020-04-03T15:41:53.776Z',
                  upgradeId: 5555,
                },
              },
            },
          },
        });
      });
    });

    describe('with convertCheckoutOrder', () => {
      const result = {
        checkoutOrders: {
          1: {
            checkout: 123,
            tags: ['NEW_GIFT'],
          },
        },
      };
      const state = {
        checkoutOrders: {
          1: {
            checkout: 123,
            tags: ['GIFT'],
          },
        },
      };

      it.each([
        actionTypes.CREATE_CHECKOUT_SUCCESS,
        actionTypes.SET_PROMOCODE_SUCCESS,
        actionTypes.FETCH_CHECKOUT_SUCCESS,
        actionTypes.SET_ITEM_TAGS_SUCCESS,
        actionTypes.UPDATE_CHECKOUT_SUCCESS,
        actionTypes.SET_TAGS_SUCCESS,
      ])('should handle %s action type', actionType => {
        expect(
          entitiesMapper[actionType](state, {
            meta: { id: 1 },
            payload: { entities: result },
            type: actionType,
          }),
        ).toEqual(result);
      });

      it(`should replace entity checkout child array after ${actionTypes.UPDATE_CHECKOUT_SUCCESS}`, () => {
        const state = {
          checkout: {
            1: {
              shippingOptions: [
                { id: 1, price: 39 },
                { id: 2, price: 40 },
              ],
              paymentMethods: {
                customerAccounts: [{ id: 111 }, { id: 222 }],
              },
            },
          },
        };
        const payload = {
          entities: {
            checkout: {
              1: {
                shippingOptions: [{ id: 3, price: 20 }],
                paymentMethods: {
                  customerAccounts: [{ id: 111 }],
                },
              },
            },
          },
          result: 1,
        };
        const expected = payload.entities;

        expect(
          entitiesMapper[actionTypes.UPDATE_CHECKOUT_SUCCESS](state, {
            payload,
            type: actionTypes.UPDATE_CHECKOUT_SUCCESS,
          }),
        ).toEqual(expected);
      });
    });

    describe('reset checkout', () => {
      it(`should handle ${actionTypes.RESET_CHECKOUT_STATE} action type`, () => {
        const state = {
          checkout: {
            1: { data: 'checkout' },
          },
          checkoutDetails: {
            1: { data: 'checkout details' },
          },
          checkoutOrders: {
            1: { data: 'checkout order' },
          },
          checkoutOrderItems: {
            1: { data: 'checkout order item' },
          },
          checkoutOrderItemProducts: {
            1: { data: 'checkout order item products' },
          },
          dummy: {
            1: { data: 'dummy' },
          },
          dummy2: {
            1: { data: 'dummy2' },
          },
        };

        const expectedResult = {
          dummy: {
            1: { data: 'dummy' },
          },
          dummy2: {
            1: { data: 'dummy2' },
          },
        };

        expect(entitiesMapper[actionTypes.RESET_CHECKOUT_STATE](state)).toEqual(
          expectedResult,
        );
      });
    });

    describe('logout success', () => {
      it(`should handle ${LOGOUT_SUCCESS} action type`, () => {
        const state = {
          checkout: {
            1: { data: 'checkout' },
          },
          checkoutDetails: {
            1: { data: 'checkout details' },
          },
          checkoutOrders: {
            1: { data: 'checkout order' },
          },
          checkoutOrderItems: {
            1: { data: 'checkout order item' },
          },
          dummy: {
            1: { data: 'dummy' },
          },
          dummy2: {
            1: { data: 'dummy2' },
          },
        };

        const expectedResult = {
          dummy: {
            1: { data: 'dummy' },
          },
          dummy2: {
            1: { data: 'dummy2' },
          },
        };

        expect(entitiesMapper[LOGOUT_SUCCESS](state)).toEqual(expectedResult);
      });
    });

    describe('handle UpdateCheckoutOrderItemSuccessAction', () => {
      let state: StoreState['entities'];
      let action: UpdateCheckoutOrderItemSuccessAction;

      beforeEach(() => {
        state = {
          checkoutOrderItems: {
            [checkoutOrderItemId]: {
              id: checkoutOrderItemId,
              quantity: 1,
            } as CheckoutOrderItemEntity,
          },
        };
        action = {
          type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS,
          meta: { id: checkoutOrderItemId },
          payload: { quantity: 2 },
        };
      });

      it('should update existing checkout order item', () => {
        const expectedState = {
          checkoutOrderItems: {
            [checkoutOrderItemId]: {
              id: checkoutOrderItemId,
              quantity: 2,
            },
          },
        };

        expect(
          entitiesMapper[actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS](
            state,
            action,
          ),
        ).toEqual(expectedState);
      });

      it('should do nothing when there is not items on state', () => {
        state = {};
        expect(
          entitiesMapper[actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS](
            state,
            action,
          ),
        ).toBe(state);
      });

      it('should do nothing when item is not on state', () => {
        state = { checkoutOrderItems: {} };
        expect(
          entitiesMapper[actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS](
            state,
            action,
          ),
        ).toBe(state);
      });
    });

    describe('handle RemoveCheckoutOrderItemSuccessAction', () => {
      let state: StoreState['entities'];
      let action: RemoveCheckoutOrderItemSuccessAction;

      beforeEach(() => {
        state = {
          checkoutOrderItems: {
            [checkoutOrderItemId]: {
              id: checkoutOrderItemId,
              quantity: 1,
            } as CheckoutOrderItemEntity,
          },
        };
        action = {
          type: actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS,
          meta: { id: checkoutOrderItemId },
        };
      });

      it('should remove existing checkout order item', () => {
        const expectedState = { checkoutOrderItems: {} };

        expect(
          entitiesMapper[actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS](
            state,
            action,
          ),
        ).toEqual(expectedState);
      });

      it('should do nothing when there is not items on state', () => {
        delete state?.checkoutOrderItems;
        expect(
          entitiesMapper[actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS](
            state,
            action,
          ),
        ).toBe(state);
      });
    });
  });

  describe('getId() selector', () => {
    it('should return the `id` property from a given state', () => {
      const id = 123;

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

  describe('Sub-areas', () => {
    const subAreaResult = {
      error: null,
      isLoading: false,
    };

    const subAreas = {
      checkoutDetails: { ...subAreaResult },
      collectPoints: { ...subAreaResult },
      itemTags: { ...subAreaResult },
      promoCode: { ...subAreaResult },
      tags: { ...subAreaResult },
      giftMessage: { ...subAreaResult },
      checkoutOrderCharge: { ...subAreaResult },
      deliveryBundleUpgrades: { ...subAreaResult },
      itemDeliveryProvisioning: { ...subAreaResult },
      upgradeItemDeliveryProvisioning: { ...subAreaResult },
    };

    const subAreaNames = [
      'CheckoutDetails',
      'CollectPoints',
      'ItemTags',
      'PromoCode',
      'Tags',
      'GiftMessage',
      'CheckoutOrderCharge',
      'DeliveryBundleUpgrades',
      'ItemDeliveryProvisioning',
      'UpgradeItemDeliveryProvisioning',
    ];

    it.each(subAreaNames)(
      'return the `%s` property from a given state',
      subArea => {
        const { [`get${subArea}`]: reducerSelector } = fromReducer;
        expect(reducerSelector(subAreas)).toEqual(subAreaResult);
      },
    );
  });
});
