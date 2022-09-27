import { cleanup, renderHook } from '@testing-library/react';
import { fetchOrderReturns, resetOrderReturns } from '@farfetch/blackout-redux';
import {
  merchantId2,
  mockState,
  orderEntityDenormalized,
  orderId,
} from 'tests/__fixtures__/orders/orders.fixtures';
import { toBlackoutError } from '@farfetch/blackout-client';
import { useOrderReturns } from '../../..';
import { withStore } from '../../../../tests/helpers';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchOrderReturns: jest.fn(() => ({
      type: 'fetch_order_returns',
    })),
    resetOrderReturns: jest.fn(() => ({
      type: 'reset_order_returns',
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
    reset: expect.any(Function),
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
    orderReturns: {
      ...mockState.orders.orderReturns,
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
    orderReturns: {
      ...mockState.orders.orderReturns,
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

describe('useOrderReturns', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useOrderReturns(orderId), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  describe('should return correctly when the order returns are fetched', () => {
    it('when merchantId is not passed, data should contain all order returns', () => {
      const {
        result: { current },
      } = renderHook(() => useOrderReturns(orderId), {
        wrapper: withStore(mockState),
      });

      expect(current).toStrictEqual({
        ...defaultReturn,
        data: orderEntityDenormalized.returns,
        isFetched: true,
      });
    });

    it('when merchantId is passed, data should contain only the order returns for the passed merchantId', () => {
      const {
        result: { current },
      } = renderHook(() => useOrderReturns(orderId, merchantId2), {
        wrapper: withStore(mockState),
      });

      expect(current).toStrictEqual({
        ...defaultReturn,
        data: orderEntityDenormalized.byMerchant[merchantId2].returns,
        isFetched: true,
      });

      expect(current.data).not.toStrictEqual(orderEntityDenormalized.returns);
    });
  });

  describe('should return correctly when there is an error', () => {
    it('when merchantId parameter is not passed', () => {
      const {
        result: { current },
      } = renderHook(() => useOrderReturns(orderId), {
        wrapper: withStore(mockErrorState),
      });

      expect(current).toStrictEqual({
        ...defaultReturn,
        isFetched: true,
        error: mockErrorState.orders.orderReturns.error[orderId],
      });
    });

    it('when merchantId parameter is passed', () => {
      const {
        result: { current },
      } = renderHook(() => useOrderReturns(orderId, merchantId2), {
        wrapper: withStore(mockErrorState),
      });

      expect(current).toStrictEqual({
        ...defaultReturn,
        isFetched: true,
        error: mockErrorState.orders.orderReturns.error[orderId],
      });
    });
  });

  describe('should return correctly when it is loading', () => {
    it('when merchantId parameter is not passed', () => {
      const {
        result: { current },
      } = renderHook(() => useOrderReturns(orderId), {
        wrapper: withStore(mockLoadingState),
      });

      expect(current).toStrictEqual({
        ...defaultReturn,
        isLoading: true,
      });
    });

    it('when merchantId parameter is passed', () => {
      const {
        result: { current },
      } = renderHook(() => useOrderReturns(orderId, merchantId2), {
        wrapper: withStore(mockLoadingState),
      });

      expect(current).toStrictEqual({
        ...defaultReturn,
        isLoading: true,
      });
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified', () => {
        renderHook(
          () =>
            useOrderReturns(orderId, undefined, {
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchOrderReturns).toHaveBeenCalledWith(
          orderId,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is true', () => {
        renderHook(
          () =>
            useOrderReturns(orderId, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: true,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchOrderReturns).toHaveBeenCalledWith(
          orderId,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () => useOrderReturns(orderId, undefined, { enableAutoFetch: false }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchOrderReturns).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and orderId parameter is not passed', () => {
        renderHook(
          () =>
            // @ts-expect-error Forcing orderId undefined to test
            useOrderReturns(undefined),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchOrderReturns).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('reset', () => {
      it('should call `resetOrderReturns` action when orderId parameter is passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useOrderReturns(orderId), {
          wrapper: withStore(mockInitialStateNoData),
        });

        reset();

        expect(resetOrderReturns).toHaveBeenCalledWith([orderId]);
      });

      it('should fail when orderId parameter is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
          // @ts-expect-error Forcing orderId undefined to test
        } = renderHook(() => useOrderReturns(), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(() => reset()).toThrow('No order id was specified.');
      });
    });

    describe('fetch', () => {
      it('should call `fetchOrderReturns` action when orderId parameter is passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useOrderReturns(orderId, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        fetch();

        expect(fetchOrderReturns).toHaveBeenCalledWith(
          orderId,
          mockFetchConfig,
        );
      });

      it('should fail when orderId parameter is not passed to the hook', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            // @ts-expect-error Forcing returnId undefined to test
            useOrderReturns(undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(fetch()).rejects.toEqual('No order id was specified.');
      });
    });
  });
});
