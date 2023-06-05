import { cleanup, renderHook } from '@testing-library/react';
import { createExchangeFilter } from '@farfetch/blackout-redux';
import {
  mockState,
  requestData,
} from 'tests/__fixtures__/exchanges/exchanges.fixtures.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import useCreateExchangeFilter from '../useCreateExchangeFilter.js';

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
  isCreating: false,
  error: null,
  actions: {
    create: expect.any(Function),
  },
};

const mockInitialStateNoData = {
  exchanges: {
    error: null,
    isLoading: false,
    result: null,
    exchangeFilter: {
      error: null,
      isLoading: false,
      result: null,
    },
    exchangeBookRequest: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
};

const mockInitialStateWithData = {
  exchanges: {
    ...mockInitialStateNoData.exchanges,
    exchangeFilter: {
      ...mockState.exchanges.exchangeFilter,
      error: null,
    },
  },
};

const mockErrorState = {
  exchanges: {
    ...mockState.exchanges,
    exchangeFilter: {
      error: toBlackoutError(new Error('dummy error')),
      isLoading: false,
      result: null,
    },
  },
};

const mockLoadingState = {
  exchanges: {
    ...mockState.exchanges,
    exchangeFilter: {
      error: null,
      isLoading: true,
      result: null,
    },
  },
};

describe('useCreateExchangeFilter', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateExchangeFilter(), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultExchangeFilter);
  });

  it('should return correctly when the exchange filter is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateExchangeFilter(), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultExchangeFilter,
      data: mockInitialStateWithData.exchanges.exchangeFilter.result,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateExchangeFilter(), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultExchangeFilter,
      error: mockErrorState.exchanges.exchangeFilter.error,
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useCreateExchangeFilter(), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultExchangeFilter,
      isCreating: true,
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
      } = renderHook(() => useCreateExchangeFilter(), {
        wrapper: withStore(mockInitialStateNoData),
      });

      const anotherConfig = {};

      create(requestData.postExchangeFilter, anotherConfig);

      expect(createExchangeFilter).toHaveBeenCalledWith(
        requestData.postExchangeFilter,
        anotherConfig,
      );
    });

    it('should fail when exchangeFilterData parameter is not passed to both the hook and the function', () => {
      const {
        result: {
          current: {
            actions: { create },
          },
        },
      } = renderHook(() => useCreateExchangeFilter(), {
        wrapper: withStore(mockInitialStateNoData),
      });

      // @ts-expect-error
      return expect(create()).rejects.toThrow('No data to filter provided');
    });
  });
});
