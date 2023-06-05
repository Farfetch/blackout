import {
  bookRequestId,
  exchangeId,
  mockState,
  requestData,
} from 'tests/__fixtures__/exchanges/exchanges.fixtures.mjs';
import { cleanup, renderHook } from '@testing-library/react';
import {
  createExchangeBookRequest,
  fetchExchangeBookRequest,
} from '@farfetch/blackout-redux';
import { toBlackoutError } from '@farfetch/blackout-client';
import { withStore } from '../../../../tests/helpers/index.js';
import useExchangeBookRequest from '../useExchangeBookRequest.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchExchangeBookRequest: jest.fn(() => ({
      type: 'fetch_exchange_book_request',
    })),
    createExchangeBookRequest: jest.fn(() => ({
      type: 'create_exchange_book_request',
    })),
  };
});

const defaultExchangeBookRequest = {
  data: undefined,
  isLoading: false,
  error: null,
  actions: {
    fetch: expect.any(Function),
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
    exchangeBookRequest: {
      ...mockState.exchanges.exchangeBookRequest,
      error: null,
    },
  },
};

const mockErrorState = {
  exchanges: {
    ...mockState.exchanges,
    exchangeBookRequest: {
      error: toBlackoutError(new Error('dummy error')),
      isLoading: false,
      result: null,
    },
  },
};

const mockLoadingState = {
  exchanges: {
    ...mockState.exchanges,
    exchangeBookRequest: {
      error: null,
      isLoading: true,
      result: null,
    },
  },
};

const mockFetchConfig = {
  myCustomParameter: 10,
};

describe('useExchangeBookRequest', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useExchangeBookRequest(exchangeId, bookRequestId), {
      wrapper: withStore(mockInitialStateNoData),
    });

    expect(current).toStrictEqual(defaultExchangeBookRequest);
  });

  it('should return correctly when the exchange book request is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useExchangeBookRequest(exchangeId, bookRequestId), {
      wrapper: withStore(mockInitialStateWithData),
    });

    expect(current).toStrictEqual({
      ...defaultExchangeBookRequest,
      data: mockInitialStateWithData.exchanges.exchangeBookRequest.result,
    });
  });

  it('should return correctly when there is an error', () => {
    const {
      result: { current },
    } = renderHook(() => useExchangeBookRequest(exchangeId, bookRequestId), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultExchangeBookRequest,
      error: mockErrorState.exchanges.exchangeBookRequest.error,
    });
  });

  it('should return correctly when it is loading', () => {
    const {
      result: { current },
    } = renderHook(() => useExchangeBookRequest(exchangeId, bookRequestId), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultExchangeBookRequest,
      isLoading: true,
    });
  });

  describe('options', () => {
    describe('enableAutoFetch', () => {
      it('should fetch data if `enableAutoFetch` option is not specified and both `exchangeId` and `bookRequestId` parameters are passed', () => {
        renderHook(
          () =>
            useExchangeBookRequest(exchangeId, bookRequestId, {
              fetchConfig: mockFetchConfig,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchExchangeBookRequest).toHaveBeenCalledWith(
          exchangeId,
          bookRequestId,
          mockFetchConfig,
        );
      });

      it('should fetch data if `enableAutoFetch` option is true and both `exchangeId` and `bookRequestId` parameters are passed', () => {
        renderHook(
          () =>
            useExchangeBookRequest(exchangeId, bookRequestId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: true,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchExchangeBookRequest).toHaveBeenCalledWith(
          exchangeId,
          bookRequestId,
          mockFetchConfig,
        );
      });

      it('should not fetch data if `enableAutoFetch` option is false', () => {
        renderHook(
          () =>
            useExchangeBookRequest(exchangeId, bookRequestId, {
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        expect(fetchExchangeBookRequest).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and both `exchangeId` and `bookRequestId` parameters are not passed', () => {
        renderHook(() => useExchangeBookRequest(undefined, undefined), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(fetchExchangeBookRequest).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and `exchangeId` parameter is not passed', () => {
        renderHook(() => useExchangeBookRequest(undefined, bookRequestId), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(fetchExchangeBookRequest).not.toHaveBeenCalled();
      });

      it('should not fetch data if `enableAutoFetch` option is true and `bookRequestId` parameter is not passed', () => {
        renderHook(() => useExchangeBookRequest(exchangeId, undefined), {
          wrapper: withStore(mockInitialStateNoData),
        });

        expect(fetchExchangeBookRequest).not.toHaveBeenCalled();
      });
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchExchangeBookRequest` action with the `exchangeId` and `bookRequestId` parameters provided to the hook if no parameters are passed', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(exchangeId, bookRequestId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        fetch();

        expect(fetchExchangeBookRequest).toHaveBeenCalledWith(
          exchangeId,
          bookRequestId,
          mockFetchConfig,
        );
      });

      it('should call `fetchExchangeBookRequest` action with the exchangeId passed as a parameter and use the bookRequestId parameter provided to the hook if it is not passed', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(undefined, bookRequestId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        fetch(exchangeId);

        expect(fetchExchangeBookRequest).toHaveBeenCalledWith(
          exchangeId,
          bookRequestId,
          mockFetchConfig,
        );
      });

      it('should call `fetchExchangeBookRequest` action with the bookRequestId passed as a parameter and use the exchangeId parameter provided to the hook if it is not passed', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(exchangeId, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        fetch(undefined, bookRequestId);

        expect(fetchExchangeBookRequest).toHaveBeenCalledWith(
          exchangeId,
          bookRequestId,
          mockFetchConfig,
        );
      });

      it('should call `fetchExchangeBookRequest` action with the exchangeId, bookRequestId and config parameters if those are passed to the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(undefined, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        const anotherConfig = {};

        fetch(exchangeId, bookRequestId, anotherConfig);

        expect(fetchExchangeBookRequest).toHaveBeenCalledWith(
          exchangeId,
          bookRequestId,
          anotherConfig,
        );
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
            useExchangeBookRequest(undefined, bookRequestId, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(fetch()).rejects.toThrow('No exchangeId provided');
      });

      it('should fail when bookRequestId parameter is not passed to both the hook and the function', () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(exchangeId, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(fetch()).rejects.toThrow('No bookRequestId provided');
      });
    });

    describe('create', () => {
      it('should call `createExchangeBookRequest` action with the bookRequestData passed as a parameter and use the exchangeId parameter provided to the hook if it is not passed', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(exchangeId, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        create(undefined, requestData.postExchangeBookRequest);

        expect(createExchangeBookRequest).toHaveBeenCalledWith(
          exchangeId,
          requestData.postExchangeBookRequest,
          mockFetchConfig,
        );
      });

      it('should call `createExchangeBookRequest` action with the exchangeId, bookRequestData and config parameters if those are passed to the function', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(undefined, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        const anotherConfig = {};

        create(exchangeId, requestData.postExchangeBookRequest, anotherConfig);

        expect(createExchangeBookRequest).toHaveBeenCalledWith(
          exchangeId,
          requestData.postExchangeBookRequest,
          anotherConfig,
        );
      });

      it('should fail when both exchangeId and data parameters are not passed to the function', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(undefined, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        // @ts-expect-error
        create();

        return expect(createExchangeBookRequest).not.toHaveBeenCalled();
      });

      it('should fail when exchangeId parameter is not passed to the function', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(undefined, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        return expect(
          create(undefined, requestData.postExchangeBookRequest),
        ).rejects.toThrow('No exchangeId provided');
      });

      it('should fail when data parameter is not passed to the function', () => {
        const {
          result: {
            current: {
              actions: { create },
            },
          },
        } = renderHook(
          () =>
            useExchangeBookRequest(undefined, undefined, {
              fetchConfig: mockFetchConfig,
              enableAutoFetch: false,
            }),
          {
            wrapper: withStore(mockInitialStateNoData),
          },
        );

        // @ts-expect-error
        return expect(create(exchangeId, undefined)).rejects.toThrow(
          'No exchange book request data provided',
        );
      });
    });
  });
});
