import { cleanup, renderHook } from '@testing-library/react';
import { mockSearchSuggestionsState } from 'tests/__fixtures__/search';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import React from 'react';
import useSearchSuggestions from '../useSearchSuggestions';
import type { UseSearchSuggestionsReturn } from '../types';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchSearchSuggestions: jest.fn(() => ({ type: 'fetch' })),
  resetSearchSuggestions: jest.fn(() => ({ type: 'reset' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const getRenderedHook = (
  state = mockSearchSuggestionsState,
): UseSearchSuggestionsReturn => {
  const {
    result: { current },
  } = renderHook(() => useSearchSuggestions(), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useSearchSuggestions', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      error: expect.any(Object),
      fetchSearchSuggestions: expect.any(Function),
      isLoading: expect.any(Boolean),
      resetSearchSuggestions: expect.any(Function),
      suggestions: expect.any(Array),
    });
  });

  it('should render in error state', () => {
    const mockError = mockSearchSuggestionsState.search.suggestions.error;
    const { error } = getRenderedHook(mockSearchSuggestionsState);

    expect(error).toEqual(mockError);
  });

  it('should render in loading state', () => {
    const { isLoading } = getRenderedHook({
      search: {
        suggestions: {
          ...mockSearchSuggestionsState.search.suggestions,
          isLoading: true,
        },
      },
    });

    expect(isLoading).toEqual(true);
  });

  describe('actions', () => {
    it('should call `fetchSearchSuggestions` action', () => {
      const { fetchSearchSuggestions } = getRenderedHook();

      fetchSearchSuggestions({ query: 'query' });

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetch' });
    });

    it('should call `resetSearchSuggestions` action', () => {
      const { resetSearchSuggestions } = getRenderedHook();

      resetSearchSuggestions();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset' });
    });
  });
});
