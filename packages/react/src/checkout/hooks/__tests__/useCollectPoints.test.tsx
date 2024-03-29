import {
  checkoutOrderId,
  mockCheckoutState,
  mockCollectPoint,
  mockErrorState,
  mockInitialState,
  mockLoadingState,
} from 'tests/__fixtures__/checkout/index.mjs';
import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchCollectPoints,
  resetCollectPoints,
} from '@farfetch/blackout-redux';
import { withStore } from '../../../../tests/helpers/index.js';
import useCollectPoints from '../useCollectPoints.js';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchCollectPoints: jest.fn(() => ({ type: 'fetch_collect_points' })),
  resetCollectPoints: jest.fn(() => ({ type: 'reset_collect_points' })),
}));

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

const query = { orderId: checkoutOrderId };
const fetchConfig = { dummy: 'fetch' };

describe('useCollectPoints', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useCollectPoints(), {
      wrapper: withStore(mockInitialState),
    });

    expect(current).toStrictEqual(defaultReturn);
  });

  it('should return error state', () => {
    const {
      result: { current },
    } = renderHook(() => useCollectPoints(), {
      wrapper: withStore(mockErrorState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      error: mockErrorState.checkout.collectPoints[''].error,
    });
  });

  it('should return loading state', () => {
    const {
      result: { current },
    } = renderHook(() => useCollectPoints(), {
      wrapper: withStore(mockLoadingState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isLoading: true,
    });
  });

  it('should return correctly when data is fetched', () => {
    const {
      result: { current },
    } = renderHook(() => useCollectPoints(query), {
      wrapper: withStore(mockCheckoutState),
    });

    expect(current).toStrictEqual({
      ...defaultReturn,
      isFetched: true,
      data: [mockCollectPoint],
    });
  });

  describe('behaviour', () => {
    it('should call reset if the passed query.orderId differs from the checkoutOrderId that is in state', () => {
      const dummyCheckoutOrderId = checkoutOrderId + 10000;

      renderHook(() => useCollectPoints({ orderId: dummyCheckoutOrderId }), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(resetCollectPoints).toHaveBeenCalled();
    });

    it('should not call reset if the passed query.orderId does not differ from the checkoutOrderId that is in state', () => {
      renderHook(() => useCollectPoints(query), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(resetCollectPoints).not.toHaveBeenCalled();
    });

    it('should not call reset if the query.orderId hook parameter is passed but there is no collect points data in state', () => {
      renderHook(() => useCollectPoints(query), {
        wrapper: withStore(mockInitialState),
      });

      expect(resetCollectPoints).not.toHaveBeenCalled();
    });
  });

  describe('options', () => {
    it('should fetch data if `enableAutoFetch` option is true and query is passed and collect points are not fetched or loading', () => {
      renderHook(() => useCollectPoints(query, { fetchConfig }), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchCollectPoints).toHaveBeenCalledWith(query, fetchConfig);

      jest.clearAllMocks();

      renderHook(
        () => useCollectPoints(query, { enableAutoFetch: true, fetchConfig }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCollectPoints).toHaveBeenCalledWith(query, fetchConfig);
    });

    it('should fetch data if `enableAutoFetch` option is true and no query is passed and collect points are not fetched or loading', () => {
      renderHook(() => useCollectPoints(undefined, { fetchConfig }), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchCollectPoints).toHaveBeenCalledWith(undefined, fetchConfig);

      jest.clearAllMocks();

      renderHook(
        () =>
          useCollectPoints(undefined, { fetchConfig, enableAutoFetch: true }),
        {
          wrapper: withStore(mockInitialState),
        },
      );

      expect(fetchCollectPoints).toHaveBeenCalledWith(undefined, fetchConfig);
    });

    it('should not fetch data if `enableAutoFetch` option is true and it is loading', () => {
      renderHook(() => useCollectPoints(), {
        wrapper: withStore(mockLoadingState),
      });

      expect(fetchCollectPoints).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is true and it is fetched', () => {
      renderHook(() => useCollectPoints(query), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(fetchCollectPoints).not.toHaveBeenCalled();

      jest.clearAllMocks();

      renderHook(() => useCollectPoints(query, { enableAutoFetch: true }), {
        wrapper: withStore(mockCheckoutState),
      });

      expect(fetchCollectPoints).not.toHaveBeenCalled();
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      renderHook(() => useCollectPoints(query, { enableAutoFetch: false }), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchCollectPoints).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    describe('fetch', () => {
      it('should call `fetchCollectPoints` action with the query passed to the hook when query parameter is not passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useCollectPoints(query, { enableAutoFetch: false, fetchConfig }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'fetch',
        };

        await fetch(requestConfig, undefined);

        expect(fetchCollectPoints).toHaveBeenCalledWith(query, requestConfig);
      });

      it('should call `fetchCollectPoints` action with the query passed to the function', async () => {
        const {
          result: {
            current: {
              actions: { fetch },
            },
          },
        } = renderHook(
          () =>
            useCollectPoints(query, { enableAutoFetch: false, fetchConfig }),
          {
            wrapper: withStore(mockInitialState),
          },
        );

        const requestConfig = {
          dummy: 'fetch',
        };

        const anotherQuery = {
          orderId: 25,
        };

        await fetch(requestConfig, anotherQuery);

        expect(fetchCollectPoints).toHaveBeenCalledWith(
          anotherQuery,
          requestConfig,
        );
      });
    });

    describe('reset', () => {
      it('should call `resetCollectPoints` action', async () => {
        const {
          result: {
            current: {
              actions: { reset },
            },
          },
        } = renderHook(() => useCollectPoints(), {
          wrapper: withStore(mockInitialState),
        });

        await reset();

        expect(resetCollectPoints).toHaveBeenCalled();
      });
    });
  });
});
