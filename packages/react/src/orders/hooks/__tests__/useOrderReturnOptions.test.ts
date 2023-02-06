import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchOrderReturnOptions,
  resetOrderReturnOptions,
} from '@farfetch/blackout-redux';
import {
  merchantId2,
  mockState,
  orderId,
  orderId2,
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
    resetOrderReturnOptions: jest.fn(() => ({
      type: 'reset_order_return_options',
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

  // describe('should return correctly when the order return options are fetched', () => {
  //   it('when merchantId is not passed, data should contain all order return options', () => {
  //     const {
  //       result: { current },
  //     } = renderHook(() => useOrderReturnOptions(orderId), {
  //       wrapper: withStore(mockState),
  //     });

  //     expect(current).toStrictEqual({
  //       ...defaultReturn,
  //       data: orderEntityDenormalized.returnOptions,
  //       isFetched: true,
  //     });
  //   });

  //   it('when merchantId is passed, data should contain only the order return options for the passed merchantId', () => {
  //     const {
  //       result: { current },
  //     } = renderHook(() => useOrderReturnOptions(orderId, merchantId2), {
  //       wrapper: withStore(mockState),
  //     });

  //     expect(current).toStrictEqual({
  //       ...defaultReturn,
  //       data: orderEntityDenormalized.byMerchant[merchantId2].returnOptions,
  //       isFetched: true,
  //     });

  //     expect(current.data).not.toStrictEqual(
  //       orderEntityDenormalized.returnOptions,
  //     );
  //   });
  // });

  describe('should return correctly when there is an error', () => {
    it('when merchantId parameter is not passed', () => {
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

    it('when merchantId parameter is passed', () => {
      const {
        result: { current },
      } = renderHook(() => useOrderReturnOptions(orderId, merchantId2), {
        wrapper: withStore(mockErrorState),
      });

      expect(current).toStrictEqual({
        ...defaultReturn,
        isFetched: true,
        error: mockErrorState.orders.orderReturnOptions.error[orderId],
      });
    });
  });

  describe('should return correctly when it is loading', () => {
    it('when merchantId parameter is not passed', () => {
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

    it('when merchantId parameter is passed', () => {
      const {
        result: { current },
      } = renderHook(() => useOrderReturnOptions(orderId, merchantId2), {
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
            useOrderReturnOptions(orderId, undefined, {
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
            useOrderReturnOptions(orderId, undefined, {
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
            useOrderReturnOptions(orderId, undefined, {
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
    describe('reset', () => {
      it('should call `resetOrderReturnOptions` action with the orderId parameter passed to the hook if no orderId parameter is passed to the function', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useOrderReturnOptions(orderId), {
          wrapper: withStore(mockInitialStateNoData),
        });

        reset();

        expect(resetOrderReturnOptions).toHaveBeenCalledWith([orderId]);
      });

      it('should call `resetOrderReturnOptions` action with the orderId parameter passed to the function', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useOrderReturnOptions(orderId), {
          wrapper: withStore(mockInitialStateNoData),
        });

        reset(orderId2);

        expect(resetOrderReturnOptions).toHaveBeenCalledWith([orderId2]);
      });

      it('should not call `resetOrderReturnOptions` when orderId parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
          // @ts-expect-error Forcing orderId undefined to test
        } = renderHook(() => useOrderReturnOptions(), {
          wrapper: withStore(mockInitialStateNoData),
        });

        reset();

        expect(resetOrderReturnOptions).not.toHaveBeenCalled();
      });
    });

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
            useOrderReturnOptions(orderId, undefined, {
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
            useOrderReturnOptions(orderId, undefined, {
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
