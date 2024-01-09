import { cleanup, renderHook } from '@testing-library/react';
import {
  draftOrderId,
  mockDraftOrderItemId as itemId,
  mockDraftOrderResponse,
  mockDraftOrderState,
  mockInitialStateDraftOrders,
} from 'tests/__fixtures__/checkout/draftOrders.fixtures.mjs';
import { mockDraftOrdersQuery as query } from 'tests/__fixtures__/checkout/index.mjs';
import { useDraftOrder } from '../../index.js';
import { withStore } from '../../../../tests/helpers/index.js';
import useDraftOrders from '../hooks/useDraftOrders.js';
import type {
  DraftOrder,
  DraftOrderData,
  PatchDraftOrderItemData,
} from '@farfetch/blackout-client';

const mockFetchDraftOrderFn = jest.fn();
const mockUpdateDraftOrderFn = jest.fn();
const mockUpdateDraftOrderItemFn = jest.fn();
const mockRemoveDraftOrderFn = jest.fn();
const mockRemoveDraftOrderItemFn = jest.fn();

jest.mock('../hooks/useDraftOrders', () => {
  return jest.fn(() => {
    return {
      actions: {
        fetchDraftOrder: mockFetchDraftOrderFn,
        updateDraftOrder: mockUpdateDraftOrderFn,
        updateDraftOrderItem: mockUpdateDraftOrderItemFn,
        removeDraftOrder: mockRemoveDraftOrderFn,
        removeDraftOrderItem: mockRemoveDraftOrderItemFn,
      },
    };
  });
});

const mockFetchConfig = {
  myCustomParameter: 10,
};

const defaultReturn = {
  isFetched: true,
  isLoading: false,
  error: null,
  isUpdating: false,
  updateError: null,
  isRemoving: false,
  removeError: null,
  draftOrder: mockDraftOrderResponse,
  actions: {
    fetch: expect.any(Function),
    update: expect.any(Function),
    updateItem: expect.any(Function),
    remove: expect.any(Function),
    removeItem: expect.any(Function),
  },
};

const newDraftOrderId = 'tv92d414-68de-496e-96db-a0c6582b3256';
const newMockDraftOrdersQuery = {
  customerId: '765',
};
const newDataOrder: DraftOrderData = {
  metadata: {
    message: 'Some engraved message within the product',
  },
};

const newDataItem: PatchDraftOrderItemData = {
  quantity: 2,
  ...newDataOrder,
};
const newItemId = '3fa85f64-5717-4562-b3fc-2c963f6qas45';

const getRenderedHook = (
  state = mockInitialStateDraftOrders,
  draftOrderId: DraftOrder['id'],
) => {
  const {
    result: { current },
  } = renderHook(() => useDraftOrder(draftOrderId, query), {
    wrapper: withStore(state),
  });

  return current;
};

describe('useDraftOrder', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state and call all hook dependencies with the correct options', () => {
    const {
      result: { current },
    } = renderHook(() => useDraftOrder(draftOrderId, query), {
      wrapper: withStore(mockDraftOrderState),
    });

    expect(current).toStrictEqual(defaultReturn);

    expect(useDraftOrders).toHaveBeenCalledWith(
      { customerId: '' },
      { enableAutoFetch: false },
    );
  });

  it('should return correctly when the draft order is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useDraftOrder(draftOrderId, query), {
      wrapper: withStore(mockDraftOrderState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return the loading state correctly to fetch', () => {
    const { isLoading } = getRenderedHook(mockDraftOrderState, draftOrderId);

    expect(isLoading).toBe(false);
  });

  it('should return the loading state correctly to update', () => {
    const { isUpdating } = getRenderedHook(mockDraftOrderState, draftOrderId);

    expect(isUpdating).toBe(false);
  });

  it('should return the loading state correctly to remove', () => {
    const { isRemoving } = getRenderedHook(mockDraftOrderState, draftOrderId);

    expect(isRemoving).toBe(false);
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
    describe('fetch', () => {
      it('should call `fetch` action with the draftOrderId parameter passed to the hook if no draftOrderId parameter is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        await fetch();

        expect(mockFetchDraftOrderFn).toHaveBeenCalledWith(
          draftOrderId,
          query,
          mockFetchConfig,
        );
      });

      it('should call `fetch` action with the draftOrderId, query and config parameters if they are passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        await fetch(mockFetchConfig, newMockDraftOrdersQuery, newDraftOrderId);

        expect(mockFetchDraftOrderFn).toHaveBeenCalledWith(
          newDraftOrderId,
          newMockDraftOrdersQuery,
          mockFetchConfig,
        );
      });

      it('should fail when draftOrderId and query parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            // @ts-expect-error Force orderId as undefined for the test
            useDraftOrder(undefined, undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        return expect(fetch()).rejects.toThrow(
          'No draft order id was specified.',
        );
      });
    });

    describe('update', () => {
      it('should call `update` action with the draftOrderId parameter passed to the hook if no draftOrderId parameter is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        await update(dataOrder);

        expect(mockUpdateDraftOrderFn).toHaveBeenCalledWith(
          draftOrderId,
          dataOrder,
          mockFetchConfig,
        );
      });

      it('should call `update` action with the draftOrderId, query and config parameters if they are passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        await update(newDataOrder, mockFetchConfig, newDraftOrderId);

        expect(mockUpdateDraftOrderFn).toHaveBeenCalledWith(
          newDraftOrderId,
          newDataOrder,
          mockFetchConfig,
        );
      });

      it('should fail when `update` when draftOrderId and query parameter is not passed to both the hook and the function', async () => {
        const {
          result: {
            current: {
              actions: { update },
            },
          },
        } = renderHook(
          () =>
            // @ts-expect-error Force orderId as undefined for the test
            useDraftOrder(undefined, undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        await expect(update(dataOrder)).rejects.toThrow(
          'No draft order id was specified.',
        );
      });
    });

    describe('updateItem', () => {
      it('should call `updateItem` action with the draftOrderId parameter passed to the hook if no draftOrderId parameter is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { updateItem },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        const dataItem: PatchDraftOrderItemData = {
          quantity: 2,
          ...dataOrder,
        };

        await updateItem(itemId, dataItem);

        expect(mockUpdateDraftOrderItemFn).toHaveBeenCalledWith(
          draftOrderId,
          itemId,
          dataItem,
          mockFetchConfig,
        );
      });

      it('should call `updateItem` action with the draftOrderId, query and config parameters if they are passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { updateItem },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        await updateItem(
          newItemId,
          newDataItem,
          mockFetchConfig,
          newDraftOrderId,
        );

        expect(mockUpdateDraftOrderItemFn).toHaveBeenCalledWith(
          newDraftOrderId,
          newItemId,
          newDataItem,
          mockFetchConfig,
        );
      });

      it('should fail when`updateItem` when draftOrderId and query parameter is not passed to both the hook and the function', async () => {
        const {
          result: {
            current: {
              actions: { updateItem },
            },
          },
        } = renderHook(
          () =>
            // @ts-expect-error Force orderId as undefined for the test
            useDraftOrder(undefined, undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        const dataItem: PatchDraftOrderItemData = {
          quantity: 2,
          ...dataOrder,
        };

        await expect(updateItem(itemId, dataItem)).rejects.toThrow(
          'No draft order id was specified.',
        );
      });
    });

    describe('remove', () => {
      it('should call `remove` action with the draftOrderId parameter passed to the hook if no draftOrderId parameter is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        await remove(dataOrder);

        expect(mockRemoveDraftOrderFn).toHaveBeenCalledWith(
          draftOrderId,
          dataOrder,
        );
      });

      it('should call `remove` action with the draftOrderId, query and config parameters if they are passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        await remove(mockFetchConfig, newDraftOrderId);

        expect(mockRemoveDraftOrderFn).toHaveBeenCalledWith(
          newDraftOrderId,
          mockFetchConfig,
        );
      });

      it('should fail when `remove` when draftOrderId and query parameter is not passed to both the hook and the function', async () => {
        const {
          result: {
            current: {
              actions: { remove },
            },
          },
        } = renderHook(
          () =>
            // @ts-expect-error Force orderId as undefined for the test
            useDraftOrder(undefined, undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        await expect(remove(dataOrder)).rejects.toThrow(
          'No draft order id was specified.',
        );
      });
    });

    describe('removeItem', () => {
      it('should call `removeItem` action with the draftOrderId parameter passed to the hook if no draftOrderId parameter is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { removeItem },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        const dataItem: PatchDraftOrderItemData = {
          quantity: 2,
          ...dataOrder,
        };

        await removeItem(itemId, dataItem);

        expect(mockRemoveDraftOrderItemFn).toHaveBeenCalledWith(
          draftOrderId,
          itemId,
          dataItem,
        );
      });

      it('should call `removeItem` action with the draftOrderId, query and config parameters if they are passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { removeItem },
            },
          },
        } = renderHook(
          () =>
            useDraftOrder(draftOrderId, query, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        await removeItem(newItemId, mockFetchConfig, newDraftOrderId);

        expect(mockRemoveDraftOrderItemFn).toHaveBeenCalledWith(
          newDraftOrderId,
          newItemId,
          mockFetchConfig,
        );
      });

      it('should fail when `removeItem` when draftOrderId and query parameter is not passed to both the hook and the function', async () => {
        const {
          result: {
            current: {
              actions: { removeItem },
            },
          },
        } = renderHook(
          () =>
            // @ts-expect-error Force orderId as undefined for the test
            useDraftOrder(undefined, undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockDraftOrderState),
          },
        );

        const dataOrder: DraftOrderData = {
          metadata: {
            message: 'Some engraved message within the product',
          },
        };

        const dataItem: PatchDraftOrderItemData = {
          quantity: 2,
          ...dataOrder,
        };

        await expect(removeItem(itemId, dataItem)).rejects.toThrow(
          'No draft order id was specified.',
        );
      });
    });
  });
});
