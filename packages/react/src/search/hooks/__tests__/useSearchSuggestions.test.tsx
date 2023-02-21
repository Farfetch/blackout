import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchSearchSuggestions,
  resetSearchSuggestions,
} from '@farfetch/blackout-redux';
import {
  mockSearchSuggestionsErrorState,
  mockSearchSuggestionsHash,
  mockSearchSuggestionsInitialState,
  mockSearchSuggestionsLoadingState,
  mockSearchSuggestionsQuery,
  mockSearchSuggestionsResponse,
  mockSearchSuggestionsState,
} from 'tests/__fixtures__/search';
import { withStore } from '../../../../tests/helpers';
import useSearchSuggestions from '../useSearchSuggestions';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchSearchSuggestions: jest.fn(() => () => Promise.resolve()),
  resetSearchSuggestions: jest.fn(() => () => Promise.resolve()),
}));

describe('useSearchSuggestions', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useSearchSuggestions(mockSearchSuggestionsQuery), {
      wrapper: withStore(mockSearchSuggestionsState),
    });

    expect(current).toStrictEqual({
      error: null,
      isLoading: false,
      isFetched: true,
      data: {
        searchSuggestions: mockSearchSuggestionsResponse,
        query: mockSearchSuggestionsQuery,
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
    } = renderHook(() => useSearchSuggestions(mockSearchSuggestionsQuery), {
      wrapper: withStore(mockSearchSuggestionsLoadingState),
    });

    expect(isLoading).toBe(true);
  });

  it('should render in error state', () => {
    const {
      result: {
        current: { error },
      },
    } = renderHook(() => useSearchSuggestions(mockSearchSuggestionsQuery), {
      wrapper: withStore(mockSearchSuggestionsErrorState),
    });

    expect(error).not.toBeNull();
    expect(error).toBe(
      mockSearchSuggestionsErrorState.search.suggestions[
        mockSearchSuggestionsHash
      ].error,
    );
  });

  it("should not render in loading state while it doesn't begin fetching", () => {
    const {
      result: {
        current: { isLoading, isFetched },
      },
    } = renderHook(() => useSearchSuggestions(mockSearchSuggestionsQuery), {
      wrapper: withStore(mockSearchSuggestionsInitialState),
    });

    expect(isLoading).toBe(false);
    expect(isFetched).toBe(false);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      renderHook(() => useSearchSuggestions(mockSearchSuggestionsQuery), {
        wrapper: withStore(mockSearchSuggestionsInitialState),
      });

      expect(fetchSearchSuggestions).toHaveBeenCalledWith(
        mockSearchSuggestionsQuery,
        undefined,
      );
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      renderHook(
        () =>
          useSearchSuggestions(mockSearchSuggestionsQuery, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockSearchSuggestionsInitialState),
        },
      );

      expect(fetchSearchSuggestions).not.toHaveBeenCalled();
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
          useSearchSuggestions(mockSearchSuggestionsQuery, {
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockSearchSuggestionsInitialState),
        },
      );

      await fetch(mockSearchSuggestionsQuery);

      expect(fetchSearchSuggestions).toHaveBeenCalledWith(
        mockSearchSuggestionsQuery,
      );
    });

    it('should call `reset` action', () => {
      const {
        result: {
          current: {
            actions: { reset },
          },
        },
      } = renderHook(() => useSearchSuggestions(mockSearchSuggestionsQuery), {
        wrapper: withStore(mockSearchSuggestionsState),
      });

      reset();

      expect(resetSearchSuggestions).toHaveBeenCalled();
    });
  });
});
