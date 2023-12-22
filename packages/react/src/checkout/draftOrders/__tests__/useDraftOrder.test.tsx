import { cleanup, renderHook } from '@testing-library/react';
import {
  draftOrderId,
  mockDraftOrderItemId as itemId,
  mockDraftOrderResponse,
  mockDraftOrderState,
  mockInitialStateDraftOrders,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import {
  fetchDraftOrder,
  removeDraftOrder,
  removeDraftOrderItem,
  updateDraftOrder,
  updateDraftOrderItem,
} from '@farfetch/blackout-redux';
import { mockDraftOrdersQuery as query } from 'tests/__fixtures__/checkout/index.mjs';
import { useDraftOrder } from '../../index.js';
import { withStore } from '../../../../tests/helpers/index.js';
import type {
  DraftOrder,
  DraftOrderData,
  PatchDraftOrderItemData,
} from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchDraftOrder: jest.fn(() => () => Promise.resolve()),
  updateDraftOrder: jest.fn(() => () => Promise.resolve()),
  updateDraftOrderItem: jest.fn(() => () => Promise.resolve()),
  removeDraftOrder: jest.fn(() => () => Promise.resolve()),
  removeDraftOrderItem: jest.fn(() => () => Promise.resolve()),
}));

const getRenderedHook = (
  state = mockInitialStateDraftOrders,
  draftOrderId: DraftOrder['id'],
) => {
  const {
    result: { current },
  } = renderHook(() => useDraftOrder(draftOrderId), {
    wrapper: withStore(state),
  });

  return current;
};

describe('useDraftOrder', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook(mockDraftOrderState, draftOrderId);

    expect(current).toStrictEqual({
      isLoading: false,
      error: null,
      updateIsLoading: false,
      updateError: null,
      removeIsLoading: false,
      removeError: null,
      draftOrder: mockDraftOrderResponse,
      actions: {
        fetch: expect.any(Function),
        update: expect.any(Function),
        updateItem: expect.any(Function),
        remove: expect.any(Function),
        removeItem: expect.any(Function),
      },
    });
  });

  it('should return the loading state correctly to fetch', () => {
    const { isLoading } = getRenderedHook(mockDraftOrderState, draftOrderId);

    expect(isLoading).toBe(false);
  });

  it('should return the loading state correctly to update', () => {
    const { updateIsLoading } = getRenderedHook(
      mockDraftOrderState,
      draftOrderId,
    );

    expect(updateIsLoading).toBe(false);
  });

  it('should return the loading state correctly to remove', () => {
    const { removeIsLoading } = getRenderedHook(
      mockDraftOrderState,
      draftOrderId,
    );

    expect(removeIsLoading).toBe(false);
  });

  it('should return the error state correctly to fetch', () => {
    const { error } = getRenderedHook(mockDraftOrderState, draftOrderId);

    expect(error).toBeNull();
  });

  it('should return the error state correctly to update', () => {
    const { updateError } = getRenderedHook(mockDraftOrderState, draftOrderId);

    expect(updateError).toBeNull();
  });

  it('should return the error state correctly to remove', () => {
    const { removeError } = getRenderedHook(mockDraftOrderState, draftOrderId);

    expect(removeError).toBeNull();
  });

  it('should return the a draft order state correctly', () => {
    const { draftOrder } = getRenderedHook(mockDraftOrderState, draftOrderId);

    expect(draftOrder).toStrictEqual(mockDraftOrderResponse);
  });

  describe('actions', () => {
    it('should call `fetch`, `update`, `updateItem`, `remove` and `removeItem` action', () => {
      const {
        actions: { fetch, update, updateItem, remove, removeItem },
      } = getRenderedHook(mockDraftOrderState, draftOrderId);

      const dataOrder: DraftOrderData = {
        metadata: {
          message: 'Some engraved message within the product',
        },
      };

      const dataItem: PatchDraftOrderItemData = {
        quantity: 2,
        ...dataOrder,
      };

      fetch(draftOrderId, query);
      update(draftOrderId, dataOrder);
      updateItem(draftOrderId, itemId, dataItem);
      remove(draftOrderId);
      removeItem(draftOrderId, itemId);

      expect(fetchDraftOrder).toHaveBeenCalled();
      expect(updateDraftOrder).toHaveBeenCalled();
      expect(updateDraftOrderItem).toHaveBeenCalled();
      expect(removeDraftOrderItem).toHaveBeenCalled();
      expect(removeDraftOrder).toHaveBeenCalled();
    });
  });
});
