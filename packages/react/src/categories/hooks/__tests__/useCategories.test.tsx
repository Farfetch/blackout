import { cleanup, renderHook } from '@testing-library/react';
import {
  fetchCategories,
  resetCategoriesState,
  type StoreState,
} from '@farfetch/blackout-redux';
import {
  mockCategoriesErrorState,
  mockCategoriesInitialState,
  mockCategoriesLoadingState,
  mockCategoriesState,
} from 'tests/__fixtures__/categories';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useCategories } from '../../';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  resetCategoriesState: jest.fn(() => () => Promise.resolve()),
  fetchCategories: jest.fn(() => () => Promise.resolve()),
}));

const getRenderedHook = (
  state: StoreState = mockCategoriesInitialState,
  config = {},
) => {
  const {
    result: { current },
  } = renderHook(() => useCategories(config), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useCategories', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook(mockCategoriesState);

    expect(current).toStrictEqual({
      isFetched: true,
      isLoading: false,
      data: Object.values(mockCategoriesState.entities.categories),
      error: null,
      actions: {
        fetch: expect.any(Function),
        reset: expect.any(Function),
      },
    });
  });

  it('should return the loading state correctly', () => {
    const { isLoading } = getRenderedHook(mockCategoriesLoadingState);

    expect(isLoading).toBe(mockCategoriesLoadingState.categories.isLoading);
  });

  it('should return the error state correctly', () => {
    const { error } = getRenderedHook(mockCategoriesErrorState);

    expect(error).toEqual(mockCategoriesErrorState.categories.error);
  });

  it('should return the fetched state correctly', () => {
    const { isFetched } = getRenderedHook(mockCategoriesState);

    expect(isFetched).toBe(mockCategoriesState.categories.isFetched);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      getRenderedHook();

      expect(fetchCategories).toHaveBeenCalled();
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      getRenderedHook(mockCategoriesState, {
        enableAutoFetch: false,
      });

      expect(fetchCategories).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `reset` action', () => {
      const {
        actions: { reset },
      } = getRenderedHook();

      reset();

      expect(resetCategoriesState).toHaveBeenCalled();
    });

    it('should call `fetch` action', () => {
      const {
        actions: { fetch },
      } = getRenderedHook(mockCategoriesState);

      fetch();

      expect(fetchCategories).toHaveBeenCalled();
    });
  });
});
