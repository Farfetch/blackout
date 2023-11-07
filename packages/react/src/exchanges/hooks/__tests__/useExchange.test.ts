import { cleanup, renderHook } from '@testing-library/react';
import { createExchange, fetchExchange } from '@farfetch/blackout-redux';
import {
  exchangeId,
  mockState,
  requestData,
} from 'tests/__fixtures__/exchanges/exchanges.fixtures.mjs';
import { toBlackoutError } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import useExchange from '../useExchange.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchExchange: jest.fn(() => ({
      type: 'fetch_exchange',
    })),
    createExchange: jest.fn(() => ({
      type: 'create_exchange',
    })),
  };
});

const defaultExchange = {
  data: undefined,
  isLoading: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
    create: expect.any(Function),
    fetchExchangeBookRequest: expect.any(Function),
    createExchangeBookRequest: expect.any(Function),
    createExchangeFilter: expect.any(Function),
  },
};

const mockInitialStateNoData = {
  exchanges: {
    error: null,
    isLoading: false,
    result: null,
    exchangeFilters: {
      ...mockState.exchanges.exchangeFilters,
    },
    exchangeBookRequest: {
      error: null,
      isLoading: false,
      result: null,
    },
  },
  entities: {
    ...mockState.entities,
  },
};

const mockInitialStateWithData = {
  exchanges: {
    ...mockState.exchanges,
    error: null,
  },
  entities: {
    ...mockState.entities,
  },
};

const mockErrorState = {
  ...mockInitialStateNoData,
  exchanges: {
    ...mockState.exchanges,
    error: toBlackoutError(new Error('dummy error')),
    isLoading: false,
    result: null,
  },
};

const mockLoadingState = {
  ...mockInitialStateNoData,
  exchanges: {
    ...mockState.exchanges,
    error: null,
    isLoading: true,
    result: null,
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useExchange', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useExchange(exchangeId, {}), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultExchange);
  });

  it('should return correctly when the exchange is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useExchange(exchangeId, {}), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultExchange,
      data: mockInitialStateWithData.exchanges.result,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useExchange(exchangeId, {}), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultExchange,
      error: mockErrorState.exchanges.error,
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useExchange(exchangeId, {}), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultExchange,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified and exchangeId parameter is passed', () => {
        renderHook(
          () =>
            useExchange(exchangeId, {
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchExchange).toHaveBeenCalledWith(exchangeId, mockFetchConfig);
      });

      it('should fetch data if `enableAutoFetch` option is true and exchangeId parameter is passed', () => {
        renderHook(
          () =>
            useExchange(exchangeId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: true,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchExchange).toHaveBeenCalledWith(exchangeId, mockFetchConfig);
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () =>
            useExchange(exchangeId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchExchange).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and exchangeId parameter is not passed', () => {
        renderHook(() => useExchange(undefined), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(fetchExchange).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchExchange` action with the exchangeId parameter provided to the hook if no parameters are passed', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useExchange(exchangeId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        fetch();

        expect(fetchExchange).toHaveBeenCalledWith(exchangeId, mockFetchConfig);
      });

      it('should call `fetchExchange` action with the exchangeId and config parameters if those are passed to the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useExchange(exchangeId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        const anotherConfig = {};

        fetch(anotherConfig, exchangeId);

        expect(fetchExchange).toHaveBeenCalledWith(exchangeId, anotherConfig);
      });

      it('should fail when exchangeId parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useExchange(undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(fetch()).rejects.toThrow('No exchangeId provided');
      });
    });

    describe('create', () => {
      it('should call `createExchange` action with the exchangeData and config parameters if those are passed to the function', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useExchange(undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        const anotherConfig = {};

        create(requestData.postExchange, anotherConfig);

        expect(createExchange).toHaveBeenCalledWith(
          requestData.postExchange,
          anotherConfig,
        );
      });

      it('should fail when data parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useExchange(undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        // @ts-expect-error
        return expect(create()).rejects.toThrow('No exchange data provided');
      });
    });
  });
});
