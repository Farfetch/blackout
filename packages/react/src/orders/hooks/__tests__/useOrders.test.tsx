import { cleanup, fireEvent, renderHook } from '@testing-library/react';
import {
  fetchGuestOrderLegacy,
  fetchGuestOrders,
  fetchOrder,
  fetchUserOrders,
  resetOrderDetailsState as resetOrderDetailsStateAction,
  resetOrders,
} from '@farfetch/blackout-redux';
import {
  mockGuestUserEmail,
  mockState,
  orderEntityDenormalized,
  orderId,
} from 'tests/__fixtures__/orders/orders.fixtures';
import { mockUserInitialState } from 'tests/__fixtures__/users';
import { Orders } from './__fixtures__/Orders.fixtures';
import { withStore, wrap } from '../../../../tests/helpers';
import useOrders from '../useOrders';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchGuestOrderLegacy: jest.fn(() => ({
      type: 'fetch_guest_order_legacy',
    })),
    fetchGuestOrders: jest.fn(() => ({
      type: 'fetch_guest_orders',
    })),
    fetchOrder: jest.fn(() => ({
      type: 'fetch_order',
    })),
    fetchUserOrders: jest.fn(() => ({
      type: 'fetch_user_orders',
    })),
    resetOrders: jest.fn(() => ({
      type: 'reset_orders',
    })),
    resetOrderDetailsState: jest.fn(() => ({
      type: 'reset_order_details_state',
    })),
  };
});

const defaultReturn = {
  data: undefined,
  isLoading: false,
  isFetched: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    resetOrderDetailsState: expect.any(Function),
    fetchOrderDetails: expect.any(Function),
    reset: expect.any(Function),
  },
};

const mockInitialState = {
  ...mockState,
  orders: {
    ...mockState.orders,
    result: null,
  },
  users: mockUserInitialState,
  entities: {
    ...mockState.entities,
    orders: undefined,
    orderItems: undefined,
    returnOptions: undefined,
    courier: undefined,
    labelTracking: undefined,
  },
};

const mockInitialStateWithData = {
  ...mockInitialState,
  orders: {
    ...mockState.orders,
  },
  entities: {
    ...mockState.entities,
  },
};

const mockInitialStateWithAuthenticatedUser = {
  ...mockInitialState,
  entities: {
    ...mockInitialState.entities,
    user: {
      id: 100000,
      isGuest: false,
    },
  },
};

const mockInitialStateWithDataForAuthenticatedUser = {
  ...mockInitialStateWithData,
  orders: {
    ...mockInitialStateWithData.orders,
  },
  entities: {
    ...mockInitialStateWithAuthenticatedUser.entities,
    ...mockInitialStateWithData.entities,
  },
};

const mockInitialStateWithGuestUser = {
  ...mockInitialState,
  entities: {
    ...mockInitialState.entities,
    user: {
      id: 200000,
      isGuest: true,
    },
  },
};

const mockErrorState = {
  ...mockInitialState,
  orders: {
    ...mockInitialState.orders,
    error: new Error('dummy error'),
  },
};

const mockLoadingState = {
  ...mockInitialState,
  orders: {
    ...mockInitialState.orders,
    isLoading: true,
  },
};

const mockFetchQuery = {
  page: 1,
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useOrders', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useOrders(), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return correctly when the orders are fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useOrders(), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: {
        ...mockState.orders.result,
        entries: [orderEntityDenormalized],
      },
      isFetched: true,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useOrders(), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.orders.error,
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useOrders(), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      describe('when true', () => {
        it('should call `fetchUserOrders` action if the current user is authenticated', () => {
          renderHook(
            () =>
              useOrders({
                enableAutoFetch: true,
                fetchQuery: mockFetchQuery,
                fetchConfig: mockFetchConfig,
              }),
            {
              wrapper: withStore(mockInitialStateWithAuthenticatedUser),
            },
          );

          expect(fetchUserOrders).toHaveBeenCalledWith(
            mockInitialStateWithAuthenticatedUser.entities.user.id,
            mockFetchQuery,
            mockFetchConfig,
          );
        });

        it('should call `fetchGuestOrders` action if the current user is _NOT_ authenticated', () => {
          renderHook(
            () =>
              useOrders({
                enableAutoFetch: true,
                fetchQuery: mockFetchQuery,
                fetchConfig: mockFetchConfig,
              }),
            {
              wrapper: withStore(mockInitialStateWithGuestUser),
            },
          );

          expect(fetchGuestOrders).toHaveBeenCalledWith(mockFetchConfig);
        });

        describe('refetching', () => {
          it('should refetch if fetch query contents have changed', () => {
            const { container, getByTestId } = wrap(<Orders />)
              .withStore(mockInitialStateWithDataForAuthenticatedUser)
              .render();

            jest.clearAllMocks();

            fireEvent.click(getByTestId('orders-updateFetchQueryButton'));

            expect(fetchUserOrders).toHaveBeenCalledWith(
              100000,
              { page: 2 },
              undefined,
            );

            expect(container).toMatchSnapshot();
          });

          it('should _NOT_ refetch if fetch query contents have not changed', () => {
            const { container, getByTestId } = wrap(<Orders />)
              .withStore(mockInitialStateWithDataForAuthenticatedUser)
              .render();

            jest.clearAllMocks();

            fireEvent.click(
              getByTestId('orders-updateWithSameFetchQueryButton'),
            );

            expect(fetchUserOrders).not.toHaveBeenCalled();

            expect(container).toMatchSnapshot();
          });
        });
      });

      describe('when false', () => {
        it('should not fetch data if it is false and the user is authenticated', () => {
          renderHook(() => useOrders({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialStateWithAuthenticatedUser),
          });

          expect(fetchUserOrders).not.toHaveBeenCalled();
        });

        it('should not fetch data if it is false and the user is _NOT_ authenticated', () => {
          renderHook(() => useOrders({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialStateWithGuestUser),
          });

          expect(fetchGuestOrders).not.toHaveBeenCalled();
        });
      });

      describe('when default value is used', () => {
        it('should call `fetchUserOrders` action if the current user is authenticated', () => {
          renderHook(
            () =>
              useOrders({
                fetchConfig: mockFetchConfig,
                fetchQuery: mockFetchQuery,
              }),
            {
              wrapper: withStore(mockInitialStateWithAuthenticatedUser),
            },
          );

          expect(fetchUserOrders).toHaveBeenCalledWith(
            mockInitialStateWithAuthenticatedUser.entities.user.id,
            mockFetchQuery,
            mockFetchConfig,
          );
        });

        it('should call `fetchGuestOrders` action if the current user is _NOT_ authenticated', () => {
          renderHook(
            () =>
              useOrders({
                fetchConfig: mockFetchConfig,
                fetchQuery: mockFetchQuery,
              }),
            {
              wrapper: withStore(mockInitialStateWithGuestUser),
            },
          );

          expect(fetchGuestOrders).toHaveBeenCalledWith(mockFetchConfig);
        });
      });
    });

    describe('actions', () => {
      describe('fetch', () => {
        it('should call `fetchUserOrders` action if the user is authenticated', async () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(
            () =>
              useOrders({
                enableAutoFetch: false,
                fetchConfig: mockFetchConfig,
                fetchQuery: mockFetchQuery,
              }),
            {
              wrapper: withStore(mockInitialStateWithAuthenticatedUser),
            },
          );

          await fetch();

          expect(fetchUserOrders).toHaveBeenCalledWith(
            mockInitialStateWithAuthenticatedUser.entities.user.id,
            mockFetchQuery,
            mockFetchConfig,
          );
        });

        it('should call `fetchGuestOrders` action if the user is _NOT_ authenticated', async () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(
            () =>
              useOrders({
                enableAutoFetch: false,
                fetchConfig: mockFetchConfig,
                fetchQuery: mockFetchQuery,
              }),
            {
              wrapper: withStore(mockInitialStateWithGuestUser),
            },
          );

          await fetch();

          expect(fetchGuestOrders).toHaveBeenCalledWith(mockFetchConfig);
        });
      });

      describe('fetchOrderDetails', () => {
        it('should call `fetchOrder` action if the user is authenticated', async () => {
          const {
            result: {
              current: {
                actions: { fetchOrderDetails },
              },
            },
          } = renderHook(() => useOrders({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialStateWithAuthenticatedUser),
          });

          await fetchOrderDetails(orderId, null, mockFetchConfig);

          expect(fetchOrder).toHaveBeenCalledWith(orderId, mockFetchConfig);
        });

        it('should call `fetchGuestOrderLegacy` action if the user is _NOT_ authenticated', async () => {
          const {
            result: {
              current: {
                actions: { fetchOrderDetails },
              },
            },
          } = renderHook(() => useOrders({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialStateWithGuestUser),
          });

          await fetchOrderDetails(orderId, mockGuestUserEmail, mockFetchConfig);

          expect(fetchGuestOrderLegacy).toHaveBeenCalledWith(
            orderId,
            mockGuestUserEmail,
            mockFetchConfig,
          );
        });

        it('should return an error if no orderId was passed', () => {
          const {
            result: {
              current: {
                actions: { fetchOrderDetails },
              },
            },
          } = renderHook(() => useOrders({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialStateWithAuthenticatedUser),
          });

          // @ts-expect-error
          return expect(fetchOrderDetails()).rejects.toThrow(
            'Invalid `orderId` parameter was provided for `fetchOrderDetails`',
          );
        });

        it('should return an error if guestUserEmail is passed but the user is authenticated', () => {
          const {
            result: {
              current: {
                actions: { fetchOrderDetails },
              },
            },
          } = renderHook(() => useOrders({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialStateWithAuthenticatedUser),
          });

          return expect(
            fetchOrderDetails(orderId, mockGuestUserEmail, mockFetchConfig),
          ).rejects.toThrow(
            '`guestUserEmail` parameter was provided but the current user is authenticated',
          );
        });
      });

      describe('reset', () => {
        it('should call `resetOrders` action with the correct parameters', async () => {
          const {
            result: {
              current: {
                actions: { reset },
              },
            },
          } = renderHook(() => useOrders({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialState),
          });

          await reset();

          expect(resetOrders).toHaveBeenCalledWith();
        });
      });

      describe('resetOrderDetailsState', () => {
        it('should call `resetOrderDetailsState` action with the correct parameters', async () => {
          const {
            result: {
              current: {
                actions: { resetOrderDetailsState },
              },
            },
          } = renderHook(() => useOrders({ enableAutoFetch: false }), {
            wrapper: withStore(mockInitialState),
          });

          await resetOrderDetailsState(orderId);

          expect(resetOrderDetailsStateAction).toHaveBeenCalledWith(orderId);
        });
      });
    });
  });
});
