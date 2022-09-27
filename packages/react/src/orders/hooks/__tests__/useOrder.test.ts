import { cleanup, renderHook } from '@testing-library/react';
import {
  mockGuestUserEmail,
  mockState,
  orderEntityDenormalized,
  orderId,
} from 'tests/__fixtures__/orders/orders.fixtures';
import { withStore } from '../../../../tests/helpers';
import useOrder from '../useOrder';
import useOrders from '../useOrders';

const mockFetchOrderDetailsFn = jest.fn();
const mockResetOrderDetailsStateFn = jest.fn();

jest.mock('../useOrders', () => {
  return jest.fn(() => {
    return {
      data: {},
      actions: {
        fetchOrderDetails: mockFetchOrderDetailsFn,
        resetOrderDetailsState: mockResetOrderDetailsStateFn,
      },
    };
  });
});

const defaultReturn = {
  data: undefined,
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    resetOrderDetailsState: expect.any(Function),
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
    orderDetails: {
      ...mockInitialState.orders.orderDetails,
      error: {
        [orderId]: new Error('dummy error'),
      },
    },
  },
};

const mockLoadingState = {
  ...mockInitialState,
  orders: {
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

  it('should return correctly with initial state and call `useOrders` hook with the correct options', () => {
    const {
      result: { current },
    } = renderHook(() => useOrder(orderId), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);

    expect(useOrders).toHaveBeenCalledWith({
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
      isFetched: true,
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
      isFetched: true,
      error: mockErrorState.orders.orderDetails.error[orderId],
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
      isLoading: true,
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

    describe('actions', () => {
      describe('fetch', () => {
        it('should call `fetchOrderDetails` from the `useOrders` hook', async () => {
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
      });

      describe('resetOrderDetailsState', () => {
        it('should call `resetOrderDetailsState` from the `useOrders` hook', async () => {
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
      });
    });
  });
});
