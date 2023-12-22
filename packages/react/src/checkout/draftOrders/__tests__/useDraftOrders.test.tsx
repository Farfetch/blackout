import { cleanup, renderHook } from '@testing-library/react';
import { createDraftOrder, fetchDraftOrders } from '@farfetch/blackout-redux';
import {
  mockDraftOrderResponse,
  mockDraftOrderState,
  mockInitialStateDraftOrders,
  mockDraftOrdersQuery as query,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { checkoutId as orderId } from 'tests/__fixtures__/checkout/checkout.fixtures.mjs';
import { useDraftOrders } from '../../index.js';
import { withStore } from '../../../../tests/helpers/index.js';
import type {
  CheckoutOrder,
  DraftOrdersQuery,
  PostDraftOrderData,
} from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchDraftOrders: jest.fn(() => () => Promise.resolve()),
  createDraftOrder: jest.fn(() => () => Promise.resolve()),
}));

const getRenderedHook = (
  state = mockInitialStateDraftOrders,
  query: DraftOrdersQuery,
  orderId: CheckoutOrder['id'],
) => {
  const {
    result: { current },
  } = renderHook(() => useDraftOrders(query, orderId), {
    wrapper: withStore(state),
  });

  return current;
};

describe('useDraftOrders', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook(mockDraftOrderState, query, orderId);

    expect(current).toStrictEqual({
      isLoading: false,
      createIsLoading: false,
      error: null,
      createError: null,
      draftOrders: [mockDraftOrderResponse],
      actions: {
        fetch: expect.any(Function),
        create: expect.any(Function),
      },
    });
  });

  it('should return the loading state correctly to draft orders', () => {
    const { isLoading } = getRenderedHook(mockDraftOrderState, query, orderId);

    expect(isLoading).toBe(false);
  });

  it('should return the loading state correctly to create draft order', () => {
    const { createIsLoading } = getRenderedHook(
      mockDraftOrderState,
      query,
      orderId,
    );

    expect(createIsLoading).toBe(false);
  });

  it('should return the error state correctly to draft orders', () => {
    const { error } = getRenderedHook(mockDraftOrderState, query, orderId);

    expect(error).toBeNull();
  });

  it('should return the error state correctly to create draft order', () => {
    const { createError } = getRenderedHook(
      mockDraftOrderState,
      query,
      orderId,
    );

    expect(createError).toBeNull();
  });

  it('should return the a draft orders state correctly to draft orders', () => {
    const { draftOrders } = getRenderedHook(
      mockDraftOrderState,
      query,
      orderId,
    );

    expect(draftOrders).toStrictEqual([mockDraftOrderResponse]);
  });

  describe('actions', () => {
    it('should call `fetch` all draft orders and `create` draft order action', () => {
      const {
        actions: { fetch, create },
      } = getRenderedHook(mockDraftOrderState, query, orderId);

      const data: PostDraftOrderData = {
        orderId: 12343243,
        customerId: '123',
      };

      fetch(query);
      create(data);

      expect(fetchDraftOrders).toHaveBeenCalled();
      expect(createDraftOrder).toHaveBeenCalled();
    });
  });
});
