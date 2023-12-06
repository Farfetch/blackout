import * as actionTypes from '../actionTypes.js';
import { cloneDeep } from 'lodash-es';
import {
  draftOrderId,
  draftOrderQuery,
  mockDraftOrderItemId as itemId,
  mockFetchDraftOrderNormalizedPayload,
  mockFetchDraftOrdersNormalizedPayload,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { checkoutId as orderId } from 'tests/__fixtures__/checkout/checkout.fixtures.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import reducer, { INITIAL_STATE } from '../reducer.js';
import type { DraftOrdersState } from '../types/index.js';

let initialState: DraftOrdersState;

describe('draftOrders reducer', () => {
  beforeEach(() => {
    initialState = INITIAL_STATE;
  });

  describe('reset handling', () => {
    const mockState = {
      draftOrder: {
        [orderId]: {
          isLoading: false,
          error: null,
        },
      },
      allDraftOrders: {
        [draftOrderQuery]: {
          result: {
            entries: [draftOrderId],
            pageSize: 0,
            pageNumber: 0,
            totalPages: 0,
            totalItems: 0,
          },
          isLoading: false,
          error: null,
        },
      },
      draftOrderCreations: {
        [orderId]: {
          isLoading: false,
          error: null,
        },
      },
      updateDraftOrder: {
        [draftOrderId]: {
          isLoading: false,
          error: null,
        },
      },
      removeDraftOrder: {
        [draftOrderId]: {
          isLoading: false,
          error: null,
        },
      },
    };

    describe('when its the first time it is invoked and receive an undefined state', () => {
      it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'this_is_a_random_action' })).toEqual(
          initialState,
        );
      });
    });

    describe(`when is a ${actionTypes.RESET_DRAFT_ORDERS_STATE} action`, () => {
      it('should return the initial state', () => {
        const state = reducer(mockState, {
          type: actionTypes.RESET_DRAFT_ORDERS_STATE,
        });

        expect(state).toEqual(initialState);
      });
    });
  });

  describe('draftOrderCreations reducer', () => {
    const expectedError = new Error('fetch draft order creation error');

    it(`should handle ${actionTypes.CREATE_DRAFT_ORDER_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.draftOrderCreations[orderId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.CREATE_DRAFT_ORDER_REQUEST,
        meta: { orderId },
      });

      expect(state.draftOrderCreations[orderId]?.isLoading).toBe(true);
      expect(state.draftOrderCreations[orderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.CREATE_DRAFT_ORDER_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.draftOrderCreations[orderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.CREATE_DRAFT_ORDER_SUCCESS,
        payload: mockFetchDraftOrderNormalizedPayload,
        meta: { orderId },
      });

      expect(state.draftOrderCreations[orderId]?.isLoading).toBe(false);
      expect(state.draftOrderCreations[orderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.CREATE_DRAFT_ORDER_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.draftOrderCreations[orderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.CREATE_DRAFT_ORDER_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { orderId },
      });

      expect(state.draftOrderCreations[orderId]?.isLoading).toBe(false);
      expect(state.draftOrderCreations[orderId]?.error).toBe(expectedError);
    });
  });

  describe('allDraftOrders reducer', () => {
    const expectedError = new Error('fetch all draft orders error');

    it(`should handle ${actionTypes.FETCH_DRAFT_ORDERS_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);
      const hash = 'hashAllDraftOrdersQuery';

      mockState.allDraftOrders[hash] = {
        isLoading: false,
        error: null,
        result: mockFetchDraftOrdersNormalizedPayload.result,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_DRAFT_ORDERS_REQUEST,
        meta: { hash },
      });

      expect(state.allDraftOrders[hash]?.isLoading).toBe(true);
      expect(state.allDraftOrders[hash]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_DRAFT_ORDERS_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);
      const hash = 'hashAllDraftOrdersQuery';

      mockState.allDraftOrders[hash] = {
        isLoading: false,
        error: null,
        result: mockFetchDraftOrdersNormalizedPayload.result,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_DRAFT_ORDERS_SUCCESS,
        payload: mockFetchDraftOrdersNormalizedPayload,
        meta: { hash },
      });

      expect(state.allDraftOrders[hash]?.isLoading).toBe(false);
      expect(state.allDraftOrders[hash]?.error).toBeNull();
      expect(state.allDraftOrders[hash]?.result).toEqual(
        mockFetchDraftOrdersNormalizedPayload.result,
      );
    });

    it(`should handle ${actionTypes.FETCH_DRAFT_ORDERS_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);
      const hash = 'hashAllDraftOrdersQuery';

      mockState.allDraftOrders[hash] = {
        isLoading: true,
        error: null,
        result: mockFetchDraftOrdersNormalizedPayload.result,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_DRAFT_ORDERS_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { hash },
      });

      expect(state.allDraftOrders[hash]?.isLoading).toBe(false);
      expect(state.allDraftOrders[hash]?.error).toBe(expectedError);
    });
  });

  describe('draftOrder reducer', () => {
    const expectedError = new Error('fetch draft order o error');

    it(`should handle ${actionTypes.FETCH_DRAFT_ORDER_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.draftOrder[draftOrderId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_DRAFT_ORDER_REQUEST,
        meta: { draftOrderId },
      });

      expect(state.draftOrder[draftOrderId]?.isLoading).toBe(true);
      expect(state.draftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_DRAFT_ORDER_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.draftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_DRAFT_ORDER_SUCCESS,
        payload: mockFetchDraftOrderNormalizedPayload,
        meta: { draftOrderId },
      });

      expect(state.draftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.draftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.FETCH_DRAFT_ORDER_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.draftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.FETCH_DRAFT_ORDER_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { draftOrderId },
      });

      expect(state.draftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.draftOrder[draftOrderId]?.error).toBe(expectedError);
    });
  });

  describe('updateDraftOrder reducer', () => {
    const expectedError = new Error('update draft order o error');

    it(`should handle ${actionTypes.UPDATE_DRAFT_ORDER_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.updateDraftOrder[draftOrderId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.UPDATE_DRAFT_ORDER_REQUEST,
        meta: { draftOrderId },
      });

      expect(state.updateDraftOrder[draftOrderId]?.isLoading).toBe(true);
      expect(state.updateDraftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.UPDATE_DRAFT_ORDER_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.updateDraftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.UPDATE_DRAFT_ORDER_SUCCESS,
        meta: { draftOrderId },
      });

      expect(state.updateDraftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.updateDraftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.UPDATE_DRAFT_ORDER_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.updateDraftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.UPDATE_DRAFT_ORDER_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { draftOrderId },
      });

      expect(state.updateDraftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.updateDraftOrder[draftOrderId]?.error).toBe(expectedError);
    });

    // Update draft order item
    it(`should handle ${actionTypes.UPDATE_DRAFT_ORDER_ITEM_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.updateDraftOrder[draftOrderId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_REQUEST,
        meta: { draftOrderId, itemId },
      });

      expect(state.updateDraftOrder[draftOrderId]?.isLoading).toBe(true);
      expect(state.updateDraftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.UPDATE_DRAFT_ORDER_ITEM_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.updateDraftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_SUCCESS,
        meta: { draftOrderId, itemId },
      });

      expect(state.updateDraftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.updateDraftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.UPDATE_DRAFT_ORDER_ITEM_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.updateDraftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.UPDATE_DRAFT_ORDER_ITEM_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { draftOrderId, itemId },
      });

      expect(state.updateDraftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.updateDraftOrder[draftOrderId]?.error).toBe(expectedError);
    });
  });

  describe('removeDraftOrder reducer', () => {
    const expectedError = new Error('delete draft order o error');

    it(`should handle ${actionTypes.REMOVE_DRAFT_ORDER_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.removeDraftOrder[draftOrderId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.REMOVE_DRAFT_ORDER_REQUEST,
        meta: { draftOrderId },
      });

      expect(state.removeDraftOrder[draftOrderId]?.isLoading).toBe(true);
      expect(state.removeDraftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.REMOVE_DRAFT_ORDER_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.removeDraftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.REMOVE_DRAFT_ORDER_SUCCESS,
        meta: { draftOrderId },
      });

      expect(state.removeDraftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.removeDraftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.REMOVE_DRAFT_ORDER_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.removeDraftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.REMOVE_DRAFT_ORDER_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { draftOrderId },
      });

      expect(state.removeDraftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.removeDraftOrder[draftOrderId]?.error).toBe(expectedError);
    });

    // // Delete draft order item
    it(`should handle ${actionTypes.REMOVE_DRAFT_ORDER_ITEM_REQUEST} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.removeDraftOrder[draftOrderId] = {
        isLoading: false,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_REQUEST,
        meta: { draftOrderId, itemId },
      });

      expect(state.removeDraftOrder[draftOrderId]?.isLoading).toBe(true);
      expect(state.removeDraftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.REMOVE_DRAFT_ORDER_ITEM_SUCCESS} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.removeDraftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_SUCCESS,
        meta: { draftOrderId, itemId },
      });

      expect(state.removeDraftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.removeDraftOrder[draftOrderId]?.error).toBeNull();
    });

    it(`should handle ${actionTypes.REMOVE_DRAFT_ORDER_ITEM_FAILURE} action type`, () => {
      const mockState = cloneDeep(initialState);

      mockState.removeDraftOrder[draftOrderId] = {
        isLoading: true,
        error: null,
      };

      const state = reducer(mockState, {
        type: actionTypes.REMOVE_DRAFT_ORDER_ITEM_FAILURE,
        payload: { error: toBlackoutError(expectedError) },
        meta: { draftOrderId, itemId },
      });

      expect(state.removeDraftOrder[draftOrderId]?.isLoading).toBe(false);
      expect(state.removeDraftOrder[draftOrderId]?.error).toBe(expectedError);
    });
  });
});
