import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchSearchDidYouMean,
  resetSearchDidYouMean,
} from '@farfetch/blackout-redux';
import {
  mockSearchDidYouMeanErrorState,
  mockSearchDidYouMeanHash,
  mockSearchDidYouMeanInitialState,
  mockSearchDidYouMeanLoadingState,
  mockSearchDidYouMeanQuery,
  mockSearchDidYouMeanResponse,
  mockSearchDidYouMeanState,
} from 'tests/__fixtures__/search';
import { withStore } from '../../../../tests/helpers';
import useSearchDidYouMean from '../useSearchDidYouMean';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchSearchDidYouMean: jest.fn(() => () => Promise.resolve()),
  resetSearchDidYouMean: jest.fn(() => () => Promise.resolve()),
}));

describe('useSearchDidYouMean', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useSearchDidYouMean(mockSearchDidYouMeanQuery), {
      wrapper: withStore(mockSearchDidYouMeanState),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        searchDidYouMean: mockSearchDidYouMeanResponse,
        query: mockSearchDidYouMeanQuery,
      },
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
      },
    });
  });

  it('should render in loading state', () => {
    const {
      result: {
        current: { isLoading },
      },
    } = renderHook(() => useSearchDidYouMean(mockSearchDidYouMeanQuery), {
      wrapper: withStore(mockSearchDidYouMeanLoadingState),
    });

    expect(isLoading).toBe(true);
  });

  it('should render in error state', () => {
    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useSearchDidYouMean(mockSearchDidYouMeanQuery), {
      wrapper: withStore(mockSearchDidYouMeanErrorState),
    });

    expect(error).not.toBeNull();
    expect(error).toBe(
      mockSearchDidYouMeanErrorState.search.didYouMean[mockSearchDidYouMeanHash]
        .error,
    );
  });

  it("should not render in loading state while it doesn't begin fetching", () => {
    const {
      result: {
        current: { isLoading, isFetched },
      },
    } = renderHook(() => useSearchDidYouMean(mockSearchDidYouMeanQuery), {
      wrapper: withStore(mockSearchDidYouMeanInitialState),
    });

    expect(isLoading).toBe(false);
    expect(isFetched).toBe(false);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      renderHook(() => useSearchDidYouMean(mockSearchDidYouMeanQuery), {
        wrapper: withStore(mockSearchDidYouMeanInitialState),
      });

      expect(fetchSearchDidYouMean).toHaveBeenCalledWith(
        mockSearchDidYouMeanQuery,
        undefined,
      );
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      renderHook(
        () =>
          useSearchDidYouMean(mockSearchDidYouMeanQuery, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockSearchDidYouMeanInitialState),
        },
      );

      expect(fetchSearchDidYouMean).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', async () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(
        () =>
          useSearchDidYouMean(mockSearchDidYouMeanQuery, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockSearchDidYouMeanInitialState),
        },
      );

      await fetch(mockSearchDidYouMeanQuery);

      expect(fetchSearchDidYouMean).toHaveBeenCalledWith(
        mockSearchDidYouMeanQuery,
      );
    });

    it('should call `reset` action', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(() => useSearchDidYouMean(mockSearchDidYouMeanQuery), {
        wrapper: withStore(mockSearchDidYouMeanState),
      });

      reset();

      expect(resetSearchDidYouMean).toHaveBeenCalled();
    });
  });
});
