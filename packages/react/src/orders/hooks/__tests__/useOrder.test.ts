import { cleanup, renderHook } from '@testing-library/react';
import {
  mockGuestUserEmail,
  mockOrderShippingAddressChangeRequestsPayload,
  mockState,
  orderEntityDenormalized,
  orderId,
  orderId2,
} from 'tests/__fixtures__/orders/orders.fixtures.mjs';
import { withStore } from '../../../../tests/helpers/index.js';
import useOrder from '../useOrder.js';
import useOrderReturnOptions from '../useOrderReturnOptions.js';
import useOrderShippingAddressChangeRequests from '../useOrderShippingAddressChangeRequests.js';
import useUserOrders from '../useUserOrders.js';
import type { BlackoutError } from '@farfetch/blackout-client';

const mockFetchOrderDetailsFn = jest.fn();
const mockResetOrderDetailsStateFn = jest.fn();
const mockFetchReturnOptions = jest.fn();
const mockResetReturnOptions = jest.fn();
const mockFetchOrderShippingAddressChangeRequests = jest.fn();
const mockCreateOrderShippingAddressChangeRequest = jest.fn();

jest.mock('../useUserOrders', () => {
  return jest.fn(() => {
    return {
      data: undefined,
      actions: {
        fetchOrderDetails: mockFetchOrderDetailsFn,
        resetOrderDetails: mockResetOrderDetailsStateFn,
      },
    };
  });
});

jest.mock('../useOrderReturnOptions', () => {
  return jest.fn(() => {
    return {
      data: undefined,
      isLoading: false,
      isFetched: false,
      error: null,
      actions: {
        fetch: mockFetchReturnOptions,
        reset: mockResetReturnOptions,
      },
    };
  });
});

jest.mock('../useOrderShippingAddressChangeRequests', () => {
  return jest.fn(() => {
    return {
      data: undefined,
      isLoading: false,
      isFetched: false,
      error: null,
      actions: {
        fetch: mockFetchOrderShippingAddressChangeRequests,
        create: mockCreateOrderShippingAddressChangeRequest,
      },
    };
  });
});

const defaultReturn = {
  data: undefined,
  isOrderLoading: false,
  isOrderFetched: false,
  orderError: null,
  returnOptionsError: null,
  areReturnOptionsFetched: false,
  areReturnOptionsLoading: false,
  actions: {
    fetch: expect.any(Function),
    reset: expect.any(Function),
    fetchReturnOptions: expect.any(Function),
    resetReturnOptions: expect.any(Function),
    fetchOrderShippingAddressChangeRequests: expect.any(Function),
    createOrderShippingAddressChangeRequest: expect.any(Function),
  },
};

const mockInitialState = {
  ...mockState,
  orders: {
    ...mockState.orders,
    result: null,
  },
  entities: {
    ...mockState.entities,
    orders: undefined,
    orderItems: undefined,
    returnOptions: undefined,
    courier: undefined,
    labelTracking: undefined,
  },
};

const mockErrorState = {
  ...mockInitialState,
  orders: {
    ...mockInitialState.orders,
    orderDetails: {
      ...mockInitialState.orders.orderDetails,
      error: {
        [orderId]: new Error('dummy error') as BlackoutError,
      },
    },
  },
};

const mockLoadingState = {
  ...mockInitialState,
  orders: {
    ...mockInitialState.orders,
    orderDetails: {
      ...mockInitialState.orders.orderDetails,
      isLoading: {
        [orderId]: true,
      },
    },
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useOrder', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state and call all hook dependencies with the correct options', () => {
    const {
      result: { current },
    } = renderHook(() => useOrder(orderId), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);

    expect(useUserOrders).toHaveBeenCalledWith({
      enableAutoFetch: false,
    });

    expect(useOrderReturnOptions).toHaveBeenCalledWith(orderId, {
      enableAutoFetch: false,
    });

    expect(useOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
      orderId,
      {
        enableAutoFetch: false,
      },
    );
  });

  it('should return correctly when the order is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useOrder(orderId), {
      wrapper: withStore(mockState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: orderEntityDenormalized,
      isOrderFetched: true,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useOrder(orderId), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isOrderFetched: true,
      orderError: mockErrorState.orders.orderDetails.error[orderId],
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useOrder(orderId), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isOrderLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should call fetch data if it is true', () => {
        renderHook(
          () =>
            useOrder(orderId, mockGuestUserEmail, {
              enableAutoFetch: true,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(mockFetchOrderDetailsFn).toHaveBeenCalledWith(
          orderId,
          mockGuestUserEmail,
          mockFetchConfig,
        );
      });

      it('should not fetch data if it is false', () => {
        renderHook(
          () =>
            useOrder(orderId, mockGuestUserEmail, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(mockFetchOrderDetailsFn).not.toHaveBeenCalled();
      });

      it('by default it should be set to true and should fetch data', () => {
        renderHook(
          () =>
            useOrder(orderId, mockGuestUserEmail, {
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        expect(mockFetchOrderDetailsFn).toHaveBeenCalledWith(
          orderId,
          mockGuestUserEmail,
          mockFetchConfig,
        );
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchOrderDetails` action with the orderId parameter passed to the hook if no orderId parameter is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useOrder(orderId, mockGuestUserEmail, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await fetch();

        expect(mockFetchOrderDetailsFn).toHaveBeenCalledWith(
          orderId,
          mockGuestUserEmail,
          mockFetchConfig,
        );
      });

      it('should call `fetchOrderDetails` action with the orderId, guestUserEmail and config parameters if they are passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useOrder(orderId, mockGuestUserEmail, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const anotherGuestEmail = 'test@dummy.com';
        const anotherConfig = {};

        await fetch(anotherConfig, anotherGuestEmail, orderId2);

        expect(mockFetchOrderDetailsFn).toHaveBeenCalledWith(
          orderId2,
          anotherGuestEmail,
          anotherConfig,
        );
      });

      it('should fail when orderId parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            // @ts-expect-error Force orderId as undefined for the test
            useOrder(undefined, undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        return expect(() => fetch()).rejects.toThrow(
          'No order id was specified.',
        );
      });
    });

    describe('reset', () => {
      it('should call `resetOrderDetails` action with the orderId parameter passed to the hook if no orderId parameter is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(
          () => useOrder(orderId, null, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await reset();

        expect(mockResetOrderDetailsStateFn).toHaveBeenCalledWith([orderId]);
      });

      it('should call `resetOrderDetails` action with the orderId parameter passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(
          () => useOrder(orderId, null, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await reset(orderId2);

        expect(mockResetOrderDetailsStateFn).toHaveBeenCalledWith([orderId2]);
      });

      it('should not call `resetOrderDetails` when orderId parameter is not passed to both the hook and the function', async () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(
          // @ts-expect-error Force undefined to orderId
          () => useOrder(undefined, null, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await reset();

        expect(mockResetOrderDetailsStateFn).not.toHaveBeenCalled();
      });
    });

    describe('fetchReturnOptions', () => {
      it('should call `fetch` from the `useOrderReturnOptions` hook', async () => {
        const {
          result: {
            current: {
              actions: { fetchReturnOptions },
            },
          },
        } = renderHook(
          () =>
            useOrder(orderId, mockGuestUserEmail, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const anotherConfig = {};

        await fetchReturnOptions(anotherConfig, orderId2);

        expect(mockFetchReturnOptions).toHaveBeenCalledWith(
          anotherConfig,
          orderId2,
        );
      });
    });

    describe('fetchOrderShippingAddressChangeRequests', () => {
      it('should call `fetch` from the `useOrderShippingAddressChangeRequests` hook', async () => {
        const {
          result: {
            current: {
              actions: { fetchOrderShippingAddressChangeRequests },
            },
          },
        } = renderHook(
          () =>
            useOrder(orderId, mockGuestUserEmail, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const anotherConfig = {};

        await fetchOrderShippingAddressChangeRequests(anotherConfig, orderId2);

        expect(
          mockFetchOrderShippingAddressChangeRequests,
        ).toHaveBeenCalledWith(anotherConfig, orderId2);
      });
    });

    describe('createOrderShippingAddressChangeRequest', () => {
      it('should call `create` from the `useOrderShippingAddressChangeRequests` hook', async () => {
        const {
          result: {
            current: {
              actions: { createOrderShippingAddressChangeRequest },
            },
          },
        } = renderHook(
          () =>
            useOrder(orderId, mockGuestUserEmail, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const anotherConfig = {};

        await createOrderShippingAddressChangeRequest(
          mockOrderShippingAddressChangeRequestsPayload,
          anotherConfig,
          orderId2,
        );

        expect(
          mockCreateOrderShippingAddressChangeRequest,
        ).toHaveBeenCalledWith(
          mockOrderShippingAddressChangeRequestsPayload,
          anotherConfig,
          orderId2,
        );
      });
    });
  });
});
