import { cleanup, renderHook } from '@testing-library/react';
import { createExchangeFilter } from '@farfetch/blackout-redux';
import {
  mockState,
  orderItemUuid,
  requestData,
} from 'tests/__fixtures__/exchanges/exchanges.fixtures.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import useExchangeFilters from '../useExchangeFilters.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    createExchangeFilter: jest.fn(() => ({
      type: 'create_exchange_filter',
    })),
  };
});

const defaultExchangeFilter = {
  data: undefined,
  isLoading: false,
  error: null,
  actions: {
    create: expect.any(Function),
    reset: expect.any(Function),
  },
};

const mockInitialState = {
  ...mockState,
  exchanges: {
    error: null,
    isLoading: false,
    result: null,
    exchangeFilters: {
      ...mockState.exchanges.exchangeFilters,
    },
    exchangeBookRequest: {
      ...mockState.exchanges.exchangeBookRequest,
    },
  },
  entities: {
    ...mockState.entities,
    exchangeFilters: undefined,
  },
};

const mockInitialStateWithData = {
  ...mockInitialState,
  exchanges: {
    ...mockInitialState.exchanges,
    exchangeFilters: {
      ...mockState.exchanges.exchangeFilters,
    },
  },
  entities: {
    ...mockState.entities,
  },
};

const mockErrorState = {
  ...mockInitialState,
  exchanges: {
    ...mockState.exchanges,
    exchangeFilters: {
      error: {
        [orderItemUuid]: toBlackoutError(new Error('dummy error')),
      },
      isLoading: {
        [orderItemUuid]: false,
      },
    },
  },
};

const mockLoadingState = {
  ...mockInitialState,
  exchanges: {
    ...mockState.exchanges,
    exchangeFilters: {
      error: {
        [orderItemUuid]: null,
      },
      isLoading: {
        [orderItemUuid]: true,
      },
    },
  },
};

describe('useExchangeFilters', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useExchangeFilters(orderItemUuid), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultExchangeFilter);
  });

  it('should return correctly when the exchange filter is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useExchangeFilters(orderItemUuid), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultExchangeFilter,
      data: mockInitialStateWithData.entities.exchangeFilters[orderItemUuid],
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useExchangeFilters(orderItemUuid), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultExchangeFilter,
      error: mockErrorState.exchanges.exchangeFilters.error[orderItemUuid],
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useExchangeFilters(orderItemUuid), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultExchangeFilter,
      isLoading: true,
    });
  });

  describe('create', () => {
    it('should call `createExchangeFilter` action with the exchangeFilterData and config parameters if those are passed to the function', () => {
      const {
        result: {
          current: {
            actions: { create },
          },
        },
      } = renderHook(() => useExchangeFilters(orderItemUuid), {
        wrapper: withStore(mockInitialState),
      });

      const anotherConfig = {};

      create(requestData.postExchangeFilter, anotherConfig);

      expect(createExchangeFilter).toHaveBeenCalledWith(
        requestData.postExchangeFilter,
        anotherConfig,
      );
    });

    it('should fail when exchangeFilterData parameter is not passed to the function', () => {
      const {
        result: {
          current: {
            actions: { create },
          },
        },
      } = renderHook(() => useExchangeFilters(orderItemUuid), {
        wrapper: withStore(mockInitialState),
      });

      // @ts-expect-error
      return expect(create()).rejects.toThrow('No data to filter provided');
    });

    it('should fail when orderItemUuid parameter is not passed to either the hook or function', () => {
      const {
        result: {
          current: {
            actions: { create },
          },
        },
      } = renderHook(() => useExchangeFilters(), {
        wrapper: withStore(mockInitialState),
      });

      return expect(
        // @ts-expect-error
        create(requestData.postExchangeFilterWithoutOrderItemUuid),
      ).rejects.toThrow('No orderItemUuid provided');
    });
  });
});
