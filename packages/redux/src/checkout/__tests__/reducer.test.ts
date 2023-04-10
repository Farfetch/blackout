import * as actionTypes from '../actionTypes.js';
import * as fromReducer from '../reducer.js';
import {
  checkoutEntity,
  checkoutId,
  checkoutOrderId,
  checkoutOrderItemId,
  expectedItemDeliveryProvisioningNormalizedPayload,
  expectedUpgradesNormalizedPayload,
  expectedUpgradesNormalizedProvisioningPayload,
  mockCheckoutDetailsEntity,
  mockCheckoutOrderItemEntity,
  mockCheckoutOrderItemProductsEntity,
  mockCheckoutState,
  mockCollectPoint,
  mockCollectPointsResponse,
  mockDeliveryBundlesResponse,
  mockGetOperationActionPayload,
  mockGetOperationsActionPayload,
  mockItemDeliveryPorvisioningResponse,
  mockResponse,
  mockUpdateCheckoutResponse,
  productId,
} from 'tests/__fixtures__/checkout/index.mjs';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../../users/authentication/actionTypes.js';
import { mockProductsEntity } from 'tests/__fixtures__/products/index.mjs';
import { OrderStatusError, toBlackoutError } from '@farfetch/blackout-client';
import reducer, { entitiesMapper } from '../reducer.js';
import type {
  CheckoutDetailsEntity,
  CheckoutOrderEntity,
  CheckoutOrderItemEntity,
} from '../../entities/types/index.js';
import type {
  CheckoutState,
  RemoveCheckoutOrderItemSuccessAction,
  UpdateCheckoutOrderItemSuccessAction,
} from '../types/index.js';
import type { StoreState } from '../../types/index.js';

let initialState: CheckoutState;
const mockAction = { type: 'foo' };

describe('checkout reducer', () => {
  beforeEach(() => {
    initialState = fromReducer.INITIAL_STATE;
  });

  describe('reset handling', () => {
    it.each([
      actionTypes.RESET_CHECKOUT,
      LOGOUT_SUCCESS,
      LOGIN_SUCCESS,
      FETCH_USER_SUCCESS,
      REGISTER_SUCCESS,
    ])('should return initial state on %s action', actionType => {
      expect(
        // As there is not a checkout mock state available that is
        // different than the initialState and it is too extensive,
        // and not important for this specific test, we force the
        // cast of an empty object to the CheckoutState type.
        reducer({} as CheckoutState, {
          type: actionType,
          payload: {},
        }),
      ).toMatchObject(initialState);
    });
  });

  describe('error() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.error;

      expect(state).toBe(initialState.error);
      expect(state).toBeNull();
    });

    it.each([
      actionTypes.CREATE_CHECKOUT_ORDER_REQUEST,
      actionTypes.FETCH_CHECKOUT_ORDER_REQUEST,
      actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST,
      actionTypes.RESET_CHECKOUT,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(
          { ...initialState, error: toBlackoutError(new Error('dummy error')) },
          {
            type: actionType,
          },
        ).error,
      ).toBe(initialState.error);
    });

    it('should handle CREATE_CHECKOUT_ORDER_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.CREATE_CHECKOUT_ORDER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_CHECKOUT_ORDER_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.FETCH_CHECKOUT_ORDER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_CHECKOUT_ORDER_FAILURE action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { error: expectedResult },
          type: actionTypes.UPDATE_CHECKOUT_ORDER_FAILURE,
        }).error,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = {
        ...initialState,
        error: toBlackoutError(new Error('error')),
      };

      expect(
        reducer(state, {
          type: mockAction,
        }).error,
      ).toBe(state.error);
    });
  });

  describe('id() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.id;

      expect(state).toBe(initialState.id);
      expect(state).toBeNull();
    });

    it('should handle CREATE_CHECKOUT_ORDER_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle UPDATE_CHECKOUT_ORDER_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_CHECKOUT_ORDER_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle SET_CHECKOUT_ORDER_PROMOCODE_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle SET_CHECKOUT_ORDER_TAGS_SUCCESS action type', () => {
      const expectedResult = 'foo';

      expect(
        reducer(undefined, {
          payload: { result: expectedResult },
          type: actionTypes.SET_CHECKOUT_ORDER_TAGS_SUCCESS,
        }).id,
      ).toBe(expectedResult);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { id: 12121 } as CheckoutState;

      expect(reducer(state, mockAction).id).toBe(state.id);
    });
  });

  describe('isLoading() reducer', () => {
    it('should return the initial state', () => {
      const state = fromReducer.INITIAL_STATE.isLoading;

      expect(state).toBe(initialState.isLoading);
      expect(state).toBe(false);
    });

    it('should handle CREATE_CHECKOUT_ORDER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.CREATE_CHECKOUT_ORDER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle FETCH_CHECKOUT_ORDER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CHECKOUT_ORDER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle UPDATE_CHECKOUT_ORDER_REQUEST action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST,
        }).isLoading,
      ).toBe(true);
    });

    it('should handle CREATE_CHECKOUT_ORDER_FAILURE action type', () => {
      expect(
        reducer(
          { ...initialState, isLoading: true },
          {
            payload: { error: '' },
            type: actionTypes.CREATE_CHECKOUT_ORDER_FAILURE,
          },
        ).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle CREATE_CHECKOUT_ORDER_SUCCESS action type', () => {
      expect(
        reducer(
          { ...initialState, isLoading: true },
          {
            payload: { result: '' },
            type: actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS,
          },
        ).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_CHECKOUT_ORDER_FAILURE action type', () => {
      expect(
        reducer(
          { ...initialState, isLoading: true },
          {
            payload: { error: '' },
            type: actionTypes.FETCH_CHECKOUT_ORDER_FAILURE,
          },
        ).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle FETCH_CHECKOUT_ORDER_SUCCESS action type', () => {
      expect(
        reducer(
          { ...initialState, isLoading: true },
          {
            payload: { result: '' },
            type: actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS,
          },
        ).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_CHECKOUT_ORDER_FAILURE action type', () => {
      expect(
        reducer(
          { ...initialState, isLoading: true },
          {
            payload: { error: '' },
            type: actionTypes.UPDATE_CHECKOUT_ORDER_FAILURE,
          },
        ).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle UPDATE_CHECKOUT_ORDER_SUCCESS action type', () => {
      expect(
        reducer(
          { ...initialState, isLoading: true },
          {
            payload: { result: '' },
            type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
          },
        ).isLoading,
      ).toBe(initialState.isLoading);
    });

    it('should handle other actions by returning the previous state', () => {
      const state = { isLoading: false } as CheckoutState;

      expect(reducer(state, mockAction).isLoading).toBe(state.isLoading);
    });
  });

  describe('checkoutOrderCharge() reducer', () => {
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
  });

  describe('checkoutOrderDeliveryBundleUpgrades() reducer', () => {
    it('should return the initial state', () => {
      const state =
        fromReducer.INITIAL_STATE.checkoutOrderDeliveryBundleUpgrades;

      expect(state).toEqual(initialState.checkoutOrderDeliveryBundleUpgrades);
    });

    it.each([
      actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_REQUEST,
      actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST,
      actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).checkoutOrderDeliveryBundleUpgrades,
      ).toEqual({
        error: initialState.checkoutOrderDeliveryBundleUpgrades.error,
        isLoading: true,
        result: null,
      });
    });

    it.each([
      actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_FAILURE,
      actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE,
      actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE,
    ])('should handle %s action type', actionType => {
      const mockError = 'mocked error';

      expect(
        reducer(undefined, {
          type: actionType,
          payload: { error: mockError },
        }).checkoutOrderDeliveryBundleUpgrades,
      ).toEqual({ error: mockError, isLoading: false, result: null });
    });

    it.each([
      actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_SUCCESS,
      actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
    ])('should handle %s action type', actionType => {
      expect(
        reducer(undefined, {
          type: actionType,
        }).checkoutOrderDeliveryBundleUpgrades,
      ).toEqual({
        error: initialState.checkoutOrderDeliveryBundleUpgrades.error,
        isLoading: false,
        result: null,
      });
    });

    it('should handle FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS action type', () => {
      const mockResult = { result: 'mocked result' };

      expect(
        reducer(undefined, {
          type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS,
          payload: mockResult,
        }).checkoutOrderDeliveryBundleUpgrades,
      ).toEqual({
        error: initialState.checkoutOrderDeliveryBundleUpgrades.error,
        isLoading: false,
        result: mockResult.result,
      });
    });

    it('should handle RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_STATE action type', () => {
      expect(
        reducer(undefined, {
          type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_STATE,
        }).checkoutOrderDeliveryBundleUpgrades,
      ).toEqual(initialState.checkoutOrderDeliveryBundleUpgrades);
    });
  });

  describe('checkoutOrderDetails() reducer', () => {
    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_DETAILS_REQUEST action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_REQUEST,
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderDetails.isLoading).toBe(true);
      expect(state.checkoutOrderDetails.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_DETAILS_FAILURE action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderDetails.isLoading).toBe(false);
      expect(state.checkoutOrderDetails.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS,
        payload: { result: 'foo' },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderDetails.isLoading).toBe(false);
      expect(state.checkoutOrderDetails.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/RESET_CHECKOUT_ORDER_DETAILS_STATE action', () => {
      const action = {
        type: actionTypes.RESET_CHECKOUT_ORDER_DETAILS_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          checkoutOrderDetails: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

      expect(state.checkoutOrderDetails.isLoading).toBe(false);
      expect(state.checkoutOrderDetails.error).toBeNull();
    });
  });

  describe('collectPoints() reducer', () => {
    it('should handle @farfetch/blackout-redux/FETCH_COLLECT_POINTS_REQUEST action', () => {
      const action = {
        type: actionTypes.FETCH_COLLECT_POINTS_REQUEST,
      };
      const state = reducer(undefined, action);

      expect(state.collectPoints.isLoading).toBe(true);
      expect(state.collectPoints.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/FETCH_COLLECT_POINTS_FAILURE action', () => {
      const action = {
        type: actionTypes.FETCH_COLLECT_POINTS_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);

      expect(state.collectPoints.isLoading).toBe(false);
      expect(state.collectPoints.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/FETCH_COLLECT_POINTS_SUCCESS action', () => {
      const action = {
        type: actionTypes.FETCH_COLLECT_POINTS_SUCCESS,
        payload: {},
      };
      const state = reducer(undefined, action);

      expect(state.collectPoints.isLoading).toBe(false);
      expect(state.collectPoints.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/RESET_COLLECT_POINTS_STATE action', () => {
      const action = {
        type: actionTypes.RESET_COLLECT_POINTS_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          collectPoints: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

      expect(state.collectPoints.isLoading).toBe(false);
      expect(state.collectPoints.error).toBeNull();
    });
  });

  describe('checkoutOrderTags() reducer', () => {
    it('should handle @farfetch/blackout-redux/SET_CHECKOUT_ORDER_TAGS_REQUEST action', () => {
      const action = {
        type: actionTypes.SET_CHECKOUT_ORDER_TAGS_REQUEST,
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderTags.isLoading).toBe(true);
      expect(state.checkoutOrderTags.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/SET_CHECKOUT_ORDER_TAGS_FAILURE action', () => {
      const action = {
        type: actionTypes.SET_CHECKOUT_ORDER_TAGS_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderTags.isLoading).toBe(false);
      expect(state.checkoutOrderTags.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/SET_CHECKOUT_ORDER_TAGS_SUCCESS action', () => {
      const action = {
        type: actionTypes.SET_CHECKOUT_ORDER_TAGS_SUCCESS,
        payload: { result: 'foo' },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderTags.isLoading).toBe(false);
      expect(state.checkoutOrderTags.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/RESET_CHECKOUT_ORDER_TAGS_STATE action', () => {
      const action = {
        type: actionTypes.RESET_CHECKOUT_ORDER_TAGS_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          checkoutOrderTags: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

      expect(state.checkoutOrderTags.isLoading).toBe(false);
      expect(state.checkoutOrderTags.error).toBeNull();
    });
  });

  describe('checkoutOrderItemTags() reducer', () => {
    it('should handle @farfetch/blackout-redux/SET_CHECKOUT_ORDER_ITEM_TAGS_REQUEST action', () => {
      const action = {
        type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_REQUEST,
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderItemTags.isLoading).toBe(true);
      expect(state.checkoutOrderItemTags.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/SET_CHECKOUT_ORDER_ITEM_TAGS_FAILURE action', () => {
      const action = {
        type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderItemTags.isLoading).toBe(false);
      expect(state.checkoutOrderItemTags.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS action', () => {
      const action = {
        type: actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS,
        payload: { result: 'foo' },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderItemTags.isLoading).toBe(false);
      expect(state.checkoutOrderItemTags.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/RESET_CHECKOUT_ORDER_ITEM_TAGS_STATE action', () => {
      const action = {
        type: actionTypes.RESET_CHECKOUT_ORDER_ITEM_TAGS_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          checkoutOrderItemTags: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

      expect(state.checkoutOrderItemTags.isLoading).toBe(false);
      expect(state.checkoutOrderItemTags.error).toBeNull();
    });
  });

  describe('checkoutOrderPromocode() reducer', () => {
    it('should handle @farfetch/blackout-redux/SET_CHECKOUT_ORDER_PROMOCODE_REQUEST action', () => {
      const action = {
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_REQUEST,
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderPromocode.isLoading).toBe(true);
      expect(state.checkoutOrderPromocode.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/SET_CHECKOUT_ORDER_PROMOCODE_FAILURE action', () => {
      const action = {
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderPromocode.isLoading).toBe(false);
      expect(state.checkoutOrderPromocode.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/SET_CHECKOUT_ORDER_PROMOCODE_SUCCESS action', () => {
      const action = {
        type: actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_SUCCESS,
        payload: { result: 'foo' },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderPromocode.isLoading).toBe(false);
      expect(state.checkoutOrderPromocode.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/RESET_CHECKOUT_ORDER_PROMOCODE_STATE action', () => {
      const action = {
        type: actionTypes.RESET_CHECKOUT_ORDER_PROMOCODE_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          checkoutOrderPromocode: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

      expect(state.checkoutOrderPromocode.isLoading).toBe(false);
      expect(state.checkoutOrderPromocode.error).toBeNull();
    });
  });

  describe('checkoutOrderItems() reducer', () => {
    it('should handle @farfetch/blackout-redux/UPDATE_CHECKOUT_ORDER_ITEMS_REQUEST action', () => {
      const action = {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_REQUEST,
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderItems.isLoading).toBe(true);
      expect(state.checkoutOrderItems.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/UPDATE_CHECKOUT_ORDER_ITEMS_FAILURE action', () => {
      const action = {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderItems.isLoading).toBe(false);
      expect(state.checkoutOrderItems.error).toBe(action.payload.error);
    });

    it('should handle @farfetch/blackout-redux/UPDATE_CHECKOUT_ORDER_ITEMS_SUCCESS action', () => {
      const action = {
        type: actionTypes.UPDATE_CHECKOUT_ORDER_ITEMS_SUCCESS,
        payload: {},
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderItems.isLoading).toBe(false);
      expect(state.checkoutOrderItems.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/RESET_CHECKOUT_ORDER_ITEMS_STATE action', () => {
      const action = {
        type: actionTypes.RESET_CHECKOUT_ORDER_ITEMS_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          checkoutOrderItems: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

      expect(state.checkoutOrderItems.isLoading).toBe(false);
      expect(state.checkoutOrderItems.error).toBeNull();
    });
  });

  describe('checkoutOrderDeliveryBundleProvisioning() reducer', () => {
    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_REQUEST action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_REQUEST,
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderDeliveryBundleProvisioning.isLoading).toBe(
        true,
      );
      expect(state.checkoutOrderDeliveryBundleProvisioning.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_FAILURE action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderDeliveryBundleProvisioning.isLoading).toBe(
        false,
      );
      expect(state.checkoutOrderDeliveryBundleProvisioning.error).toBe(
        action.payload.error,
      );
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS,
        payload: {},
      };
      const state = reducer(undefined, action);

      expect(state.checkoutOrderDeliveryBundleProvisioning.isLoading).toBe(
        false,
      );
      expect(state.checkoutOrderDeliveryBundleProvisioning.error).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_STATE action', () => {
      const action = {
        type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          checkoutOrderDeliveryBundleProvisioning: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

      expect(state.checkoutOrderDeliveryBundleProvisioning.isLoading).toBe(
        false,
      );
      expect(state.checkoutOrderDeliveryBundleProvisioning.error).toBeNull();
    });
  });

  describe('checkoutOrderDeliveryBundleUpgradeProvisioning() reducer', () => {
    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_REQUEST action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_REQUEST,
      };
      const state = reducer(undefined, action);

      expect(
        state.checkoutOrderDeliveryBundleUpgradeProvisioning.isLoading,
      ).toBe(true);
      expect(
        state.checkoutOrderDeliveryBundleUpgradeProvisioning.error,
      ).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_FAILURE action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_FAILURE,
        payload: {
          error: 'error',
        },
      };
      const state = reducer(undefined, action);

      expect(
        state.checkoutOrderDeliveryBundleUpgradeProvisioning.isLoading,
      ).toBe(false);
      expect(state.checkoutOrderDeliveryBundleUpgradeProvisioning.error).toBe(
        action.payload.error,
      );
    });

    it('should handle @farfetch/blackout-redux/FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS action', () => {
      const action = {
        type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS,
        payload: {},
      };
      const state = reducer(undefined, action);

      expect(
        state.checkoutOrderDeliveryBundleUpgradeProvisioning.isLoading,
      ).toBe(false);
      expect(
        state.checkoutOrderDeliveryBundleUpgradeProvisioning.error,
      ).toBeNull();
    });

    it('should handle @farfetch/blackout-redux/RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_STATE action', () => {
      const action = {
        type: actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          checkoutOrderDeliveryBundleUpgradeProvisioning: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

      expect(
        state.checkoutOrderDeliveryBundleUpgradeProvisioning.isLoading,
      ).toBe(false);
      expect(
        state.checkoutOrderDeliveryBundleUpgradeProvisioning.error,
      ).toBeNull();
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

    it('should handle @farfetch/blackout-redux/RESET_CHECKOUT_ORDER_OPERATION_STATE action', () => {
      const action = {
        type: actionTypes.RESET_CHECKOUT_ORDER_OPERATION_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          operation: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

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

    it('should handle @farfetch/blackout-redux/RESET_CHECKOUT_ORDER_OPERATIONS_STATE action', () => {
      const action = {
        type: actionTypes.RESET_CHECKOUT_ORDER_OPERATIONS_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          operations: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
            result: mockGetOperationsActionPayload.result,
          },
        },
        action,
      );

      expect(state.operations.isLoading).toBe(false);
      expect(state.operations.error).toBeNull();
      expect(state.operations.result).toBeNull();
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

    it('should handle @farfetch/blackout-redux/RESET_REMOVE_CHECKOUT_ORDER_ITEM_STATE action', () => {
      const action = {
        type: actionTypes.RESET_REMOVE_CHECKOUT_ORDER_ITEM_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          removeOrderItem: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

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

    it('should handle @farfetch/blackout-redux/RESET_UPDATE_CHECKOUT_ORDER_ITEM_STATE action', () => {
      const action = {
        type: actionTypes.RESET_UPDATE_CHECKOUT_ORDER_ITEM_STATE,
      };
      const state = reducer(
        {
          ...initialState,
          updateOrderItem: {
            isLoading: true,
            error: toBlackoutError(new Error('dummy error')),
          },
        },
        action,
      );

      expect(state.updateOrderItem.isLoading).toBe(false);
      expect(state.updateOrderItem.error).toBeNull();
    });
  });

  describe('entitiesMapper()', () => {
    const mockCheckoutResponse = {
      [checkoutId]: {
        ...checkoutEntity,
        id: 12,
        orderStatus: OrderStatusError.NoError,
      },
    };

    const mockCheckoutOrdersResponse = {
      [checkoutOrderId]: {
        ...mockResponse.checkoutOrder,
        items: [checkoutOrderItemId],
        collectpoints: mockCollectPointsResponse,
      },
    };

    describe('without convertCheckoutOrder', () => {
      const entities = {
        anotherProp: 123,
        products: { [productId]: { id: productId } },
        checkout: mockCheckoutResponse,
        checkoutOrders: mockCheckoutOrdersResponse,
      };
      const state = {
        checkout: mockCheckoutResponse,
        checkoutOrders: mockCheckoutOrdersResponse,
        products: mockProductsEntity,
      };

      const expectedResult = {
        checkout: mockCheckoutResponse,
        checkoutOrders: {
          1: {
            ...entities,
            checkout: mockCheckoutResponse,
          },
        },
        products: mockProductsEntity,
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

      it(`should handle ${actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS}`, () => {
        const metaId = 1;
        const payload = {
          entities: {
            ...entities,
            products: {
              3: mockCheckoutResponse,
            },
          },
        };

        expect(
          entitiesMapper[actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS](
            state,
            {
              meta: { id: metaId },
              payload,
              type: actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS,
            },
          ),
        ).toEqual({
          ...state,
          ...entities,
          products: {
            ...state.products,
            3: mockCheckoutResponse,
          },
          checkout: {
            1: {
              checkoutOrder: 1,
            },
          },
        });
      });

      it(`should handle ${actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS}`, () => {
        const mockState = {
          ...state,
          deliveryBundles: {
            12345678: mockDeliveryBundlesResponse[0]!,
          },
        } as NonNullable<StoreState['entities']>;

        expect(
          entitiesMapper[
            actionTypes
              .FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS
          ](mockState, {
            meta: { deliveryBundleId: 12345678 },
            payload: {
              entities: {
                itemDeliveryProvisioning: mockItemDeliveryPorvisioningResponse,
              },
              result: [123, 321],
            },
            type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS,
          }),
        ).toEqual({
          ...state,
          deliveryBundles: {
            12345678: {
              ...mockDeliveryBundlesResponse[0],
              itemsIds: [123, 321],
            },
          },
        });
      });

      it(`should handle ${actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS}`, () => {
        const mockState = {
          ...state,
          deliveryBundleUpgrades: {
            123: expectedUpgradesNormalizedPayload.entities
              .deliveryBundleUpgrades[12345678],
          },
        };

        expect(
          entitiesMapper[
            actionTypes
              .FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS
          ](mockState, {
            meta: { deliveryBundleId: 123, upgradeId: 5555 },
            payload: expectedItemDeliveryProvisioningNormalizedPayload,
            type: actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS,
          }),
        ).toEqual({
          ...state,
          deliveryBundleUpgrades:
            expectedUpgradesNormalizedProvisioningPayload.deliveryBundleUpgrades,
        });
      });
    });

    describe('with convertCheckoutOrder', () => {
      const result = {
        checkoutOrders: {
          1: {
            ...mockCheckoutState.entities.checkoutOrders[checkoutOrderId],
            checkout: 123,
            tags: ['NEW_GIFT'],
          },
        },
      };
      const state = {
        checkoutOrders: {
          1: {
            ...mockCheckoutState.entities.checkoutOrders[checkoutOrderId],
            checkout: 123,
            tags: ['GIFT'],
          },
        },
      };

      it.each<keyof typeof entitiesMapper>([
        actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS,
        actionTypes.SET_CHECKOUT_ORDER_PROMOCODE_SUCCESS,
        actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS,
        actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS,
        actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
        actionTypes.SET_CHECKOUT_ORDER_TAGS_SUCCESS,
      ])('should handle %s action type', actionType => {
        expect(
          entitiesMapper[actionType](state, {
            meta: { id: 1 },
            payload: { entities: result },
            type: actionType,
          }),
        ).toEqual(result);
      });

      it('should reset address state code and name if they are not filled', () => {
        const result = {
          checkoutOrders: {
            1: {
              checkout: 123,
              tags: ['NEW_GIFT'],
              shippingAddress: {
                state: {},
              },
              billingAddress: {
                state: {},
              },
            },
          },
        };
        const state = {
          checkoutOrders: {
            1: {
              checkout: 123,
              tags: ['GIFT'],
              shippingAddress: {
                state: {
                  code: 'code',
                  name: 'name',
                },
              },
              billingAddress: {
                state: {},
              },
            },
          },
        };

        expect(
          // @ts-expect-error Simplified state for testing purposes
          entitiesMapper[actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS](state, {
            payload: { entities: result, result: 1 },
            type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
          }),
        ).toEqual(result);
      });

      it('should reset click and collect if it is not filled', () => {
        const result = {
          checkoutOrders: {
            1: {
              checkout: 123,
              tags: ['NEW_GIFT'],
            },
          },
        };

        const expectedResult = {
          checkoutOrders: {
            1: {
              checkout: 123,
              tags: ['NEW_GIFT'],
              collectPoints: [mockCollectPoint],
            },
          },
        };

        const state = {
          checkoutOrders: {
            1: {
              checkout: 123,
              tags: ['GIFT'],
              clickAndCollect: {
                collectPointId: 123,
              },
              collectPoints: [mockCollectPoint],
            },
          },
        };

        expect(
          // @ts-expect-error Simplified state for testing purposes
          entitiesMapper[actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS](state, {
            payload: { entities: result, result: 1 },
            type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
          }),
        ).toEqual(expectedResult);
      });

      it(`should replace entity checkout child array after ${actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS}`, () => {
        const state = {
          checkout: mockUpdateCheckoutResponse.checkout,
        };
        const payload = {
          entities: mockUpdateCheckoutResponse,
          result: 1,
        };
        const expected = payload.entities;

        expect(
          entitiesMapper[actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS](state, {
            payload,
            type: actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS,
          }),
        ).toEqual(expected);
      });
    });

    describe('reset handling', () => {
      it.each([actionTypes.RESET_CHECKOUT, LOGOUT_SUCCESS])(
        'should return initial state on %s action',
        actionType => {
          const state = {
            checkout: {
              [checkoutId]: {
                ...checkoutEntity,
                id: 12,
                orderStatus: OrderStatusError.NoError,
              },
            },
            checkoutDetails: {
              [checkoutId]: {
                ...mockCheckoutDetailsEntity,
                id: 15338084,
              } as CheckoutDetailsEntity,
            },
            checkoutOrders: {
              [checkoutId]: {
                ...mockResponse.checkoutOrder,
                items: [2],
                collectpoints: mockCollectPointsResponse,
              } as CheckoutOrderEntity,
            },
            checkoutOrderItems: mockCheckoutOrderItemEntity,
            checkoutOrderItemProducts: mockCheckoutOrderItemProductsEntity,
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

          expect(
            entitiesMapper[actionType as keyof typeof entitiesMapper](state, {
              type: actionType,
            }),
          ).toEqual(expectedResult);
        },
      );
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
            state as NonNullable<typeof state>,
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
            state as NonNullable<typeof state>,
            action,
          ),
        ).toEqual(expectedState);
      });

      it('should do nothing when there is not items on state', () => {
        delete state?.checkoutOrderItems;
        expect(
          entitiesMapper[actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS](
            state as NonNullable<typeof state>,
            action,
          ),
        ).toBe(state);
      });
    });
  });

  describe('getId() selector', () => {
    it('should return the `id` property from a given state', () => {
      const id = 123;
      const state = { ...initialState, id };

      expect(fromReducer.getId(state)).toBe(state.id);
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
      const state = {
        ...initialState,
        isLoading: true,
      };

      expect(fromReducer.getIsLoading(state)).toBe(state.isLoading);
    });
  });

  describe('Sub-areas', () => {
    const subAreaResult = {
      error: null,
      isLoading: false,
    };

    const subAreas = {
      checkoutOrderDetails: { ...subAreaResult },
      collectPoints: { ...subAreaResult },
      checkoutOrderItemTags: { ...subAreaResult },
      checkoutOrderPromocode: { ...subAreaResult },
      checkoutOrderTags: { ...subAreaResult },
      checkoutOrderItems: { ...subAreaResult },
      checkoutOrderCharge: { ...subAreaResult },
      checkoutOrderDeliveryBundleUpgrades: { ...subAreaResult },
      checkoutOrderDeliveryBundleProvisioning: { ...subAreaResult },
      checkoutOrderDeliveryBundleUpgradeProvisioning: { ...subAreaResult },
    };

    const subAreaNames = [
      'CheckoutOrderDetails',
      'CollectPoints',
      'CheckoutOrderItemTags',
      'CheckoutOrderPromocode',
      'CheckoutOrderTags',
      'CheckoutOrderItems',
      'CheckoutOrderCharge',
      'CheckoutOrderDeliveryBundleUpgrades',
      'CheckoutOrderDeliveryBundleProvisioning',
      'CheckoutOrderDeliveryBundleUpgradeProvisioning',
    ];

    it.each(subAreaNames)(
      'return the `%s` property from a given state',
      subArea => {
        const { [`get${subArea}` as keyof typeof subAreas]: reducerSelector } =
          fromReducer;

        expect(reducerSelector(subAreas, mockAction)).toEqual(subAreaResult);
      },
    );
  });
});
