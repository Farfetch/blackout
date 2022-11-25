import { cleanup, renderHook } from '@testing-library/react';
import { fetchCategory, StoreState } from '@farfetch/blackout-redux';
import {
  mockCategoriesInitialState,
  mockCategoriesState,
  mockCategoryErrorState,
  mockCategoryId,
  mockCategoryLoadingState,
} from 'tests/__fixtures__/categories';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useCategory } from '../../';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchCategories: jest.fn(() => () => Promise.resolve()),
  fetchCategory: jest.fn(() => () => Promise.resolve()),
}));

const getRenderedHook = (
  state: StoreState = mockCategoriesInitialState,
  config = {},
) => {
  const {
    result: { current },
  } = renderHook(() => useCategory(mockCategoryId, config), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useCategory', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook(mockCategoriesState);

    expect(current).toStrictEqual({
      isFetched: true,
      isLoading: false,
      data: mockCategoriesState.entities.categories[mockCategoryId],
      error: null,
      actions: {
        fetch: expect.any(Function),
      },
    });
  });

  it('should return the loading state correctly', () => {
    const data = getRenderedHook(mockCategoryLoadingState);

    expect(data.isLoading).toBe(
      mockCategoryLoadingState.categories.category.isLoading[mockCategoryId],
    );
  });

  it('should return the error state correctly', () => {
    const data = getRenderedHook(mockCategoryErrorState);

    expect(data.error).toEqual(
      mockCategoryErrorState.categories.category.error[mockCategoryId],
    );
  });

  it('should return the fetched state correctly', () => {
    const { isFetched } = getRenderedHook(mockCategoriesState);

    expect(isFetched).toBe(true);
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      getRenderedHook();

      expect(fetchCategory).toHaveBeenCalledWith(mockCategoryId, undefined);
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      getRenderedHook(mockCategoriesState, {
        enableAutoFetch: false,
      });

      expect(fetchCategory).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      const {
        actions: { fetch },
      } = getRenderedHook(mockCategoriesState);

      fetch();

      expect(fetchCategory).toHaveBeenCalled();
    });
  });
});
