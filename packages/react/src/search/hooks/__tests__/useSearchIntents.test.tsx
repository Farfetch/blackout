import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchSearchIntents,
  resetSearchIntents,
} from '@farfetch/blackout-redux';
import {
  mockSearchIntentsErrorState,
  mockSearchIntentsHash,
  mockSearchIntentsInitialState,
  mockSearchIntentsLoadingState,
  mockSearchIntentsQuery,
  mockSearchIntentsResponse,
  mockSearchIntentsState,
} from 'tests/__fixtures__/search';
import { withStore } from '../../../../tests/helpers';
import useSearchIntents from '../useSearchIntents';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchSearchIntents: jest.fn(() => () => Promise.resolve()),
  resetSearchIntents: jest.fn(() => () => Promise.resolve()),
}));

describe('useSearchIntents', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useSearchIntents(mockSearchIntentsQuery), {
      wrapper: withStore(mockSearchIntentsState),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        searchIntents: mockSearchIntentsResponse,
        query: mockSearchIntentsQuery,
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
    } = renderHook(() => useSearchIntents(mockSearchIntentsQuery), {
      wrapper: withStore(mockSearchIntentsLoadingState),
    });

    expect(isLoading).toBe(true);
  });

  it('should render in error state', () => {
    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useSearchIntents(mockSearchIntentsQuery), {
      wrapper: withStore(mockSearchIntentsErrorState),
    });

    expect(error).not.toBeNull();
    expect(error).toBe(
      mockSearchIntentsErrorState.search.intents[mockSearchIntentsHash].error,
    );
  });

  it("should not render in loading state while it doesn't begin fetching", () => {
    const {
      result: {
        current: { isLoading, isFetched },
      },
    } = renderHook(() => useSearchIntents(mockSearchIntentsQuery), {
      wrapper: withStore(mockSearchIntentsInitialState),
    });

    expect(isLoading).toBe(false);
    expect(isFetched).toBe(false);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', async () => {
      renderHook(() => useSearchIntents(mockSearchIntentsQuery), {
        wrapper: withStore(mockSearchIntentsInitialState),
      });

      expect(fetchSearchIntents).toHaveBeenCalledWith(
        mockSearchIntentsQuery,
        undefined,
      );
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', async () => {
      renderHook(
        () =>
          useSearchIntents(mockSearchIntentsQuery, { enableAutoFetch: false }),
        {
          wrapper: withStore(mockSearchIntentsInitialState),
        },
      );

      expect(fetchSearchIntents).not.toHaveBeenCalled();
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
          useSearchIntents(mockSearchIntentsQuery, { enableAutoFetch: false }),
        {
          wrapper: withStore(mockSearchIntentsInitialState),
        },
      );

      await fetch(mockSearchIntentsQuery);

      expect(fetchSearchIntents).toHaveBeenCalledWith(mockSearchIntentsQuery);
    });

    it('should call `reset` action', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(() => useSearchIntents(mockSearchIntentsQuery), {
        wrapper: withStore(mockSearchIntentsState),
      });

      reset();

      expect(resetSearchIntents).toHaveBeenCalled();
    });
  });
});
