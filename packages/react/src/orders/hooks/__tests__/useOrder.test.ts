import { cleanup, renderHook } from '@testing-library/react';
import {
  mockGuestUserEmail,
  mockState,
  orderEntityDenormalized,
  orderId,
  orderId2,
} from 'tests/__fixtures__/orders/orders.fixtures';
import { withStore } from '../../../../tests/helpers';
import useOrder from '../useOrder';
import useOrderReturnOptions from '../useOrderReturnOptions';
import useOrderReturns from '../useOrderReturns';
import useOrders from '../useOrders';
import type { BlackoutError } from '@farfetch/blackout-client';

const mockFetchOrderDetailsFn = jest.fn();
const mockResetOrderDetailsStateFn = jest.fn();
const mockFetchReturnOptions = jest.fn();
const mockFetchReturns = jest.fn();
const mockResetReturnOptions = jest.fn();
const mockResetReturns = jest.fn();

jest.mock('../useOrders', () => {
  return jest.fn(() => {
    return {
      data: undefined,
      actions: {
        fetchOrderDetails: mockFetchOrderDetailsFn,
        resetOrderDetailsState: mockResetOrderDetailsStateFn,
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

jest.mock('../useOrderReturns', () => {
  return jest.fn(() => {
    return {
      data: undefined,
      isLoading: false,
      isFetched: false,
      error: null,
      actions: {
        fetch: mockFetchReturns,
        reset: mockResetReturns,
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
  returnsError: null,
  areReturnOptionsFetched: false,
  areReturnOptionsLoading: false,
  areReturnsFetched: false,
  areReturnsLoading: false,
  actions: {
    fetch: expect.any(Function),
    resetOrderDetailsState: expect.any(Function),
    fetchReturnOptions: expect.any(Function),
    fetchReturns: expect.any(Function),
    resetReturnOptions: expect.any(Function),
    resetReturns: expect.any(Function),
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

    expect(useOrders).toHaveBeenCalledWith({
      enableAutoFetch: false,
    });

    expect(useOrderReturnOptions).toHaveBeenCalledWith(orderId, undefined, {
      enableAutoFetch: false,
    });

    expect(useOrderReturns).toHaveBeenCalledWith(orderId, undefined, {
      enableAutoFetch: false,
    });
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

        await fetch(orderId2, anotherGuestEmail, anotherConfig);

        expect(mockFetchOrderDetailsFn).toHaveBeenCalledWith(
          orderId2,
          anotherGuestEmail,
          anotherConfig,
        );
      });

      it('should fail when orderId parameter is not passed to both the hook and the function', async () => {
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

    describe('resetOrderDetailsState', () => {
      it('should call `resetOrderDetailsState` action with the orderId parameter passed to the hook if no orderId parameter is passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { resetOrderDetailsState },
            },
          },
        } = renderHook(
          () => useOrder(orderId, null, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await resetOrderDetailsState();

        expect(mockResetOrderDetailsStateFn).toHaveBeenCalledWith([orderId]);
      });

      it('should call `resetOrderDetailsState` action with the orderId parameter passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { resetOrderDetailsState },
            },
          },
        } = renderHook(
          () => useOrder(orderId, null, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await resetOrderDetailsState(orderId2);

        expect(mockResetOrderDetailsStateFn).toHaveBeenCalledWith([orderId2]);
      });

      it('should not call `resetOrderDetailsState` when orderId parameter is not passed to both the hook and the function', async () => {
        const {
          result: {
            current: {
              actions: { resetOrderDetailsState },
            },
          },
        } = renderHook(
          // @ts-expect-error Force undefined to orderId
          () => useOrder(undefined, null, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        await resetOrderDetailsState();

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

        await fetchReturnOptions(orderId2, anotherConfig);

        expect(mockFetchReturnOptions).toHaveBeenCalledWith(
          orderId2,
          anotherConfig,
        );
      });
    });

    describe('resetReturnOptions', () => {
      it('should call `reset` from the `useOrderReturnOptions` hook', async () => {
        const {
          result: {
            current: {
              actions: { resetReturnOptions },
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

        await resetReturnOptions(orderId2);

        expect(mockResetReturnOptions).toHaveBeenCalledWith(orderId2);
      });
    });

    describe('fetchReturns', () => {
      it('should call `fetch` from the `useOrderReturns` hook', async () => {
        const {
          result: {
            current: {
              actions: { fetchReturns },
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

        await fetchReturns(orderId2, anotherConfig);

        expect(mockFetchReturns).toHaveBeenCalledWith(orderId2, anotherConfig);
      });
    });

    describe('resetReturns', () => {
      it('should call `reset` from the `useOrderReturns` hook', async () => {
        const {
          result: {
            current: {
              actions: { resetReturns },
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

        await resetReturns(orderId2);

        expect(mockResetReturns).toHaveBeenCalledWith(orderId2);
      });
    });
  });
});
