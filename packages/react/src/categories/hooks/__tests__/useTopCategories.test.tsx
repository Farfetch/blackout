import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchTopCategories,
  resetCategoriesState,
  StoreState,
} from '@farfetch/blackout-redux';
import {
  mockCategoriesInitialState,
  mockCategoriesLoadingState,
  mockCategoriesState,
  mockTopCategories,
  mockTopCategoriesErrorState,
  mockTopCategoriesLoadingState,
} from 'tests/__fixtures__/categories';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useTopCategories } from '../../';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  resetCategoriesState: jest.fn(() => () => Promise.resolve()),
  fetchTopCategories: jest.fn(() => () => Promise.resolve()),
}));

const getRenderedHook = (
  state: StoreState = mockCategoriesInitialState,
  config = {},
) => {
  const {
    result: { current },
  } = renderHook(() => useTopCategories(config), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useTopCategories', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook(mockCategoriesState);

    expect(current).toStrictEqual({
      isFetched: true,
      isLoading: false,
      data: mockTopCategories,
      error: null,
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
      },
    });
  });

  it('should return the loading state correctly', () => {
    const { isLoading } = getRenderedHook(mockTopCategoriesLoadingState);

    expect(isLoading).toBe(mockCategoriesLoadingState.categories.top.isLoading);
  });

  it('should return the error state correctly', () => {
    const { error } = getRenderedHook(mockTopCategoriesErrorState);

    expect(error).toEqual(mockTopCategoriesErrorState.categories.top.error);
  });

  it('should return the fetched state correctly', () => {
    const { isFetched } = getRenderedHook(mockCategoriesState);

    expect(isFetched).toBe(true);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      getRenderedHook();

      expect(fetchTopCategories).toHaveBeenCalled();
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      getRenderedHook(mockCategoriesState, {
        enableAutoFetch: false,
      });

      expect(fetchTopCategories).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      const {
        actions: { fetch },
      } = getRenderedHook(mockCategoriesState);

      fetch();

      expect(fetchTopCategories).toHaveBeenCalled();
    });

    it('should call `reset` action', () => {
      const {
        actions: { reset },
      } = getRenderedHook();

      reset();

      expect(resetCategoriesState).toHaveBeenCalled();
    });
  });
});
