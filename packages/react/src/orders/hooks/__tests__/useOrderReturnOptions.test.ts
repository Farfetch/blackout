import { cleanup, renderHook } from '@testing-library/react';
import { fetchOrderReturnOptions } from '@farfetch/blackout-redux';
import {
  merchantOrderId,
  merchantOrderId2,
  mockState,
  orderId,
  orderId2,
  returnOptionEntity2Denormalized,
  returnOptionEntityDenormalized,
} from 'tests/__fixtures__/orders/orders.fixtures.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import { useOrderReturnOptions } from '../../../index.js';
import { withStore } from '../../../../tests/helpers/index.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchOrderReturnOptions: jest.fn(() => ({
      type: 'fetch_order_return_options',
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
  },
};

const mockInitialStateNoData = {
  ...mockState,
  entities: {
    ...mockState.entities,
    orders: {},
  },
};

const mockErrorState = {
  ...mockState,
  orders: {
    ...mockState.orders,
    orderReturnOptions: {
      ...mockState.orders.orderReturnOptions,
      error: {
        [orderId]: toBlackoutError(new Error('dummy error')),
      },
    },
  },
  entities: {
    ...mockState.entities,
    orders: {},
  },
};

const mockLoadingState = {
  ...mockState,
  orders: {
    ...mockState.orders,
    orderReturnOptions: {
      ...mockState.orders.orderReturnOptions,
      isLoading: {
        [orderId]: true,
      },
    },
  },
  entities: {
    ...mockState.entities,
    orders: {},
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useOrderReturnOptions', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useOrderReturnOptions(orderId), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return correctly when the order return options are fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useOrderReturnOptions(orderId), {
      wrapper: withStore(mockState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      data: {
        [merchantOrderId]: returnOptionEntityDenormalized,
        [merchantOrderId2]: returnOptionEntity2Denormalized,
      },
      isFetched: true,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useOrderReturnOptions(orderId), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.orders.orderReturnOptions.error[orderId],
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useOrderReturnOptions(orderId), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified', () => {
        renderHook(
          () =>
            useOrderReturnOptions(orderId, {
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchOrderReturnOptions).toHaveBeenCalledWith(
          orderId,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(
          () =>
            useOrderReturnOptions(orderId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: true,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchOrderReturnOptions).toHaveBeenCalledWith(
          orderId,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () =>
            useOrderReturnOptions(orderId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchOrderReturnOptions).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and orderId parameter is not passed', () => {
        renderHook(
          () =>
            // @ts-expect-error Forcing orderId undefined to test
            useOrderReturnOptions(undefined),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchOrderReturnOptions).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchOrderReturnOptions` action with the orderId parameter passed to the hook if no orderId parameter is passed to the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useOrderReturnOptions(orderId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        fetch();

        expect(fetchOrderReturnOptions).toHaveBeenCalledWith(
          orderId,
          mockFetchConfig,
        );
      });

      it('should call `fetchOrderReturnOptions` action with the orderId and config parameters if they are passed to the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useOrderReturnOptions(orderId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        const anotherConfig = {};

        fetch(orderId2, anotherConfig);

        expect(fetchOrderReturnOptions).toHaveBeenCalledWith(
          orderId2,
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
            // @ts-expect-error Forcing returnId undefined to test
            useOrderReturnOptions(undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(fetch()).rejects.toThrow('No order id was specified.');
      });
    });
  });
});
