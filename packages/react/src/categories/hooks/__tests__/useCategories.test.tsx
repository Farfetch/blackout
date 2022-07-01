import { cleanup, renderHook } from '@testing-library/react';
import {
  mockCategories,
  mockCategoriesErrorState,
  mockCategoriesInitialState,
  mockCategoriesLoadingState,
  mockCategoriesState,
  mockCategoryId,
  mockTopCategories,
  mockTopCategoriesErrorState,
  mockTopCategoriesLoadingState,
} from 'tests/__fixtures__/categories';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useCategories } from '../../';
import React from 'react';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  resetCategoriesState: jest.fn(() => ({ type: 'reset' })),
  fetchCategories: jest.fn(() => ({ type: 'fetchCategories' })),
  fetchTopCategories: jest.fn(() => ({ type: 'fetchTopCategories' })),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const getRenderedHook = (state = mockCategoriesInitialState) => {
  const {
    result: { current },
  } = renderHook(() => useCategories(), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useCategories', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      areCategoriesFetched: expect.any(Boolean),
      areCategoriesLoading: expect.any(Boolean),
      areTopCategoriesFetched: expect.any(Boolean),
      areTopCategoriesLoading: expect.any(Boolean),
      categories: expect.any(Array),
      categoriesError: expect.any(Object),
      fetchCategories: expect.any(Function),
      fetchTopCategories: expect.any(Function),
      getCategory: expect.any(Function),
      getRootCategory: expect.any(Function),
      resetCategoriesState: expect.any(Function),
      topCategories: expect.any(Array),
      topCategoriesError: expect.any(Object),
    });
  });

  it('should render in categories loading state', () => {
    const { areCategoriesLoading } = getRenderedHook(
      mockCategoriesLoadingState,
    );

    expect(areCategoriesLoading).toBe(
      mockCategoriesLoadingState.categories.isLoading,
    );
  });

  it('should render in top categories loading state', () => {
    const { areTopCategoriesLoading } = getRenderedHook(
      mockTopCategoriesLoadingState,
    );

    expect(areTopCategoriesLoading).toBe(
      mockCategoriesLoadingState.categories.top.isLoading,
    );
  });

  it('should render in categories error state', () => {
    const { categoriesError } = getRenderedHook(mockCategoriesErrorState);

    expect(categoriesError).toEqual(mockCategoriesErrorState.categories.error);
  });

  it('should render in top categories error state', () => {
    const { topCategoriesError } = getRenderedHook(mockTopCategoriesErrorState);

    expect(topCategoriesError).toEqual(
      mockTopCategoriesErrorState.categories.top.error,
    );
  });

  it('should render in categories fetched state', () => {
    const { areCategoriesFetched } = getRenderedHook(mockCategoriesState);

    expect(areCategoriesFetched).toBe(mockCategoriesState.categories.isFetched);
  });

  it('should render in top categories fetched state', () => {
    const { areTopCategoriesFetched } = getRenderedHook(mockCategoriesState);

    expect(areTopCategoriesFetched).toBe(true);
  });

  it('should render the categories', () => {
    const { categories } = getRenderedHook(mockCategoriesState);

    expect(categories).toEqual(
      Object.values(mockCategoriesState.entities.categories),
    );
  });

  it('should render the top categories', () => {
    const { topCategories } = getRenderedHook(mockCategoriesState);

    expect(topCategories).toEqual(mockTopCategories);
  });

  describe('actions', () => {
    it('should call `reset`', () => {
      const { resetCategoriesState } = getRenderedHook();

      resetCategoriesState();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'reset' });
    });

    it('should call `fetchCategories`', () => {
      const { fetchCategories } = getRenderedHook(mockCategoriesState);

      fetchCategories();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchCategories' });
    });

    it('should call `fetchTopCategories`', () => {
      const { fetchTopCategories } = getRenderedHook(mockCategoriesState);

      fetchTopCategories();

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'fetchTopCategories' });
    });
  });

  describe('getCategory', () => {
    it('should render the correct results for `getCategory` function', () => {
      const { getCategory } = getRenderedHook(mockCategoriesState);
      const result = getCategory(mockCategories[0].id);

      expect(result).toEqual(mockCategories[0]);
    });
  });

  describe('getRootCategory', () => {
    it('should render the correct results for `getRootCategory` function', () => {
      const { getRootCategory } = getRenderedHook(mockCategoriesState);
      const result = getRootCategory(mockCategoryId);

      expect(result).toEqual(mockTopCategories[1]);
    });
  });
});
