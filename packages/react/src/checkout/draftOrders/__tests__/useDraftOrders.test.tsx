import { cleanup, renderHook } from '@testing-library/react';
import {
  createDraftOrder,
  fetchDraftOrder as fetchDraftOrderAction,
  fetchDraftOrders,
  removeDraftOrder as removeDraftOrderAction,
  removeDraftOrderItem as removeDraftOrderItemAction,
  resetDraftOrders,
  updateDraftOrder as updateDraftOrderAction,
  updateDraftOrderItem as updateDraftOrderItemAction,
} from '@farfetch/blackout-redux';
import {
  draftOrderId,
  mockDraftOrderItemId as itemId,
  mockDraftOrderResponse,
  mockDraftOrderState,
  mockInitialStateDraftOrders,
  mockDraftOrdersQuery as query,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { checkoutId as orderId } from 'tests/__fixtures__/checkout/checkout.fixtures.mjs';
import { useDraftOrders } from '../../index.js';
import { withStore } from '../../../../tests/helpers/index.js';
import type {
  DraftOrderData,
  DraftOrdersQuery,
  PatchDraftOrderItemData,
  PostDraftOrderData,
} from '@farfetch/blackout-client';
import type { UseDraftOrdersOptions } from '../hooks/types/useDraftOrders.js';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchDraftOrder: jest.fn(() => () => Promise.resolve()),
  fetchDraftOrders: jest.fn(() => () => Promise.resolve()),
  createDraftOrder: jest.fn(() => () => Promise.resolve()),
  updateDraftOrder: jest.fn(() => () => Promise.resolve()),
  updateDraftOrderItem: jest.fn(() => () => Promise.resolve()),
  removeDraftOrder: jest.fn(() => () => Promise.resolve()),
  removeDraftOrderItem: jest.fn(() => () => Promise.resolve()),
  resetDraftOrders: jest.fn(() => () => Promise.resolve()),
}));

const options = {
  enableAutoFetch: true,
  fetchConfig: { myCustomParameter: 10 },
  orderId,
};

const defaultReturn = {
  isFetched: true,
  isLoading: false,
  createIsLoading: false,
  error: null,
  createError: null,
  draftOrders: [mockDraftOrderResponse],
  actions: {
    fetch: expect.any(Function),
    fetchDraftOrder: expect.any(Function),
    create: expect.any(Function),
    removeDraftOrder: expect.any(Function),
    removeDraftOrderItem: expect.any(Function),
    updateDraftOrder: expect.any(Function),
    updateDraftOrderItem: expect.any(Function),
    reset: expect.any(Function),
  },
};

const getRenderedHook = (
  state = mockInitialStateDraftOrders,
  query: DraftOrdersQuery,
  options?: UseDraftOrdersOptions,
) => {
  const {
    result: { current },
  } = renderHook(() => useDraftOrders(query, options), {
    wrapper: withStore(state),
  });

  return current;
};

describe('useDraftOrders', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook(mockDraftOrderState, query, options);

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return correctly when the all draft orders is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useDraftOrders(query, options), {
      wrapper: withStore(mockDraftOrderState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return the loading state correctly to draft orders', () => {
    const { isLoading } = getRenderedHook(mockDraftOrderState, query, options);

    expect(isLoading).toBe(false);
  });

  it('should return the loading state correctly to create draft order', () => {
    const { createIsLoading } = getRenderedHook(
      mockDraftOrderState,
      query,
      options,
    );

    expect(createIsLoading).toBe(false);
  });

  it('should return the error state correctly to draft orders', () => {
    const { error } = getRenderedHook(mockDraftOrderState, query, options);

    expect(error).toBeNull();
  });

  it('should return the error state correctly to create draft order', () => {
    const { createError } = getRenderedHook(
      mockDraftOrderState,
      query,
      options,
    );

    expect(createError).toBeNull();
  });

  it('should return the a draft orders state correctly to draft orders', () => {
    const { draftOrders } = getRenderedHook(
      mockDraftOrderState,
      query,
      options,
    );

    expect(draftOrders).toStrictEqual([mockDraftOrderResponse]);
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetch` all draft orders action', () => {
        const {
          actions: { fetch },
        } = getRenderedHook(mockDraftOrderState, query, options);

        fetch(query);

        expect(fetchDraftOrders).toHaveBeenCalled();
      });
    });

    describe('fetchDraftOrder', () => {
      it('should call `fetchDraftOrder` of a draft order action', () => {
        const {
          actions: { fetchDraftOrder },
        } = getRenderedHook(mockDraftOrderState, query, options);

        fetchDraftOrder(draftOrderId, query, options.fetchConfig);

        expect(fetchDraftOrderAction).toHaveBeenCalled();
      });
    });

    describe('create', () => {
      it('should call `create` a draft order action', () => {
        const {
          actions: { create },
        } = getRenderedHook(mockDraftOrderState, query, options);

        const data: PostDraftOrderData = {
          orderId: 12343243,
          customerId: '123',
        };

        create(data);

        expect(createDraftOrder).toHaveBeenCalled();
      });
    });

    describe('removeDraftOrder', () => {
      it('should call `removeDraftOrder` of a draft order action', () => {
        const {
          actions: { removeDraftOrder },
        } = getRenderedHook(mockDraftOrderState, query, options);

        removeDraftOrder(draftOrderId, options.fetchConfig);

        expect(removeDraftOrderAction).toHaveBeenCalled();
      });
    });

    describe('removeDraftOrderItem', () => {
      it('should call `removeDraftOrderItem` of a draft order action', () => {
        const {
          actions: { removeDraftOrderItem },
        } = getRenderedHook(mockDraftOrderState, query, options);

        removeDraftOrderItem(draftOrderId, itemId, options.fetchConfig);

        expect(removeDraftOrderItemAction).toHaveBeenCalled();
      });
    });

    describe('update', () => {
      it('should call `update` of a draft order action', () => {
        const {
          actions: { updateDraftOrder },
        } = getRenderedHook(mockDraftOrderState, query, options);

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        updateDraftOrder(draftOrderId, dataOrder, options.fetchConfig);

        expect(updateDraftOrderAction).toHaveBeenCalled();
      });
    });

    describe('updateDraftOrderItem', () => {
      it('should call `updateDraftOrderItem` of a draft order action', () => {
        const {
          actions: { updateDraftOrderItem },
        } = getRenderedHook(mockDraftOrderState, query, options);

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        const dataItem: PatchDraftOrderItemData = {
          quantity: 2,
          ...dataOrder,
        };

        updateDraftOrderItem(
          draftOrderId,
          itemId,
          dataItem,
          options.fetchConfig,
        );

        expect(updateDraftOrderItemAction).toHaveBeenCalled();
      });
    });

    it('should call `reset` all draft orders action', () => {
      const {
        actions: { reset },
      } = getRenderedHook(mockDraftOrderState, query, options);

      reset();

      expect(resetDraftOrders).toHaveBeenCalled();
    });
  });
});
