import { act, cleanup, renderHook } from '@testing-library/react';
import {
  getOrderShippingAddressChangeRequests,
  postOrderShippingAddressChangeRequest,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  mockOrderShippingAddressChangeRequestsPayload,
  mockOrderShippingAddressChangeRequestsResponse,
  orderId,
  orderId2,
} from 'tests/__fixtures__/orders/orders.fixtures.mjs';
import { useOrderShippingAddressChangeRequests } from '../../../index.js';
import flushPromises from 'tests/flushPromises.mjs';

jest.mock('@farfetch/blackout-client', () => {
  const original = jest.requireActual('@farfetch/blackout-client');

  return {
    ...original,
    getOrderShippingAddressChangeRequests: jest.fn(() =>
      Promise.resolve(mockOrderShippingAddressChangeRequestsResponse),
    ),
    postOrderShippingAddressChangeRequest: jest.fn(),
  };
});

const mockFetchOrderShippingAddressChangeRequestsError = toBlackoutError(
  new Error('dummy error'),
);

const defaultOrderShippingAddressChangeRequests = {
  data: undefined,
  isLoading: false,
  error: null,
  isFetched: false,
  actions: {
    fetch: expect.any(Function),
    create: expect.any(Function),
  },
};

const defaultOrderShippingAddressChangeRequestsFetched = {
  ...defaultOrderShippingAddressChangeRequests,
  isFetched: true,
  data: mockOrderShippingAddressChangeRequestsResponse,
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useOrderShippingAddressChangeRequests', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() =>
      useOrderShippingAddressChangeRequests(orderId, {
        enableAutoFetch: false,
        fetchConfig: mockFetchConfig,
      }),
    );

    expect(current).toStrictEqual(defaultOrderShippingAddressChangeRequests);

    expect(getOrderShippingAddressChangeRequests).not.toHaveBeenCalled();
  });

  it('should return correctly when the order shipping address change requests is fetched', async () => {
    const { result } = renderHook(() =>
      useOrderShippingAddressChangeRequests(orderId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultOrderShippingAddressChangeRequestsFetched,
    });
  });

  it('should return correctly when there is an error', async () => {
    (getOrderShippingAddressChangeRequests as jest.Mock).mockRejectedValueOnce(
      mockFetchOrderShippingAddressChangeRequestsError,
    );

    const { result } = renderHook(() =>
      useOrderShippingAddressChangeRequests(orderId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    // Awaits for the microtasks to finish so we can assure that all the promises
    // were completed and the reference updated.
    await act(() => flushPromises());

    expect(result.current).toStrictEqual({
      ...defaultOrderShippingAddressChangeRequests,
      isLoading: false,
      isFetched: true,
      error: mockFetchOrderShippingAddressChangeRequestsError,
    });
  });

  it('should return correctly when it is loading', () => {
    const { result } = renderHook(() =>
      useOrderShippingAddressChangeRequests(orderId, {
        enableAutoFetch: true,
        fetchConfig: mockFetchConfig,
      }),
    );

    expect(result.current).toStrictEqual({
      ...defaultOrderShippingAddressChangeRequests,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(() =>
          useOrderShippingAddressChangeRequests(orderId, {
            enableAutoFetch: true,
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(getOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
          orderId,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is not passed', () => {
        renderHook(() =>
          useOrderShippingAddressChangeRequests(orderId, {
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(getOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
          orderId,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(() =>
          useOrderShippingAddressChangeRequests(orderId, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        expect(getOrderShippingAddressChangeRequests).not.toHaveBeenCalled();
      });
    });

    describe('actions', () => {
      describe('fetch', () => {
        it('should call `getOrderShippingAddressChangeRequests` action with the order id parameter passed to the hook if no parameters are passed to the action', () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(() =>
            useOrderShippingAddressChangeRequests(orderId, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          fetch();

          expect(getOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
            orderId,
            mockFetchConfig,
          );
        });

        it('should call `getOrderShippingAddressChangeRequests` action with the order id parameter passed to the action', () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(() =>
            // @ts-expect-error
            useOrderShippingAddressChangeRequests(undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          fetch(undefined, orderId);

          expect(getOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
            orderId,
            mockFetchConfig,
          );
        });

        it('should call `getOrderShippingAddressChangeRequests` action with a different order id parameter passed to the action', () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(() =>
            useOrderShippingAddressChangeRequests(orderId, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          fetch(undefined, orderId2);

          expect(getOrderShippingAddressChangeRequests).toHaveBeenCalledWith(
            orderId2,
            mockFetchConfig,
          );
        });

        it('should fail when return id parameter is not passed to both the hook and the function', () => {
          const {
            result: {
              current: {
                actions: { fetch },
              },
            },
          } = renderHook(() =>
            // @ts-expect-error
            useOrderShippingAddressChangeRequests(undefined, {
              enableAutoFetch: false,
              fetchConfig: mockFetchConfig,
            }),
          );

          return expect(fetch()).rejects.toThrow('No orderId provided');
        });
      });
    });

    describe('create', () => {
      it('should call `postOrderShippingAddressChangeRequest` function with the order id parameter passed to the hook if no order id is passed to the action', async () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() =>
          useOrderShippingAddressChangeRequests(orderId, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        const anotherConfig = {};

        await create(
          mockOrderShippingAddressChangeRequestsPayload,
          anotherConfig,
        );

        expect(postOrderShippingAddressChangeRequest).toHaveBeenCalledWith(
          orderId,
          mockOrderShippingAddressChangeRequestsPayload,
          anotherConfig,
        );
      });

      it('should call `postOrderShippingAddressChangeRequest` function with the order id parameter passed to the action', async () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() =>
          // @ts-expect-error
          useOrderShippingAddressChangeRequests(undefined, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        const anotherConfig = {};

        await create(
          mockOrderShippingAddressChangeRequestsPayload,
          anotherConfig,
          orderId,
        );

        expect(postOrderShippingAddressChangeRequest).toHaveBeenCalledWith(
          orderId,
          mockOrderShippingAddressChangeRequestsPayload,
          anotherConfig,
        );
      });

      it('should fail when order id parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() =>
          // @ts-expect-error
          useOrderShippingAddressChangeRequests(undefined, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        const anotherConfig = {};

        return expect(
          create(mockOrderShippingAddressChangeRequestsPayload, anotherConfig),
        ).rejects.toThrow('No orderId provided');
      });

      it('should fail when data parameter is not passed to the function', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(() =>
          useOrderShippingAddressChangeRequests(orderId, {
            enableAutoFetch: false,
            fetchConfig: mockFetchConfig,
          }),
        );

        const anotherConfig = {};

        return expect(
          // @ts-expect-error
          create(undefined, anotherConfig, orderId),
        ).rejects.toThrow('No data provided');
      });
    });
  });
});
