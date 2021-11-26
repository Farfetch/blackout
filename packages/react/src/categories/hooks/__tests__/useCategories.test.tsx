import { Categories } from './__fixtures__/Categories.fixtures.js';
import { cleanup, fireEvent } from '@testing-library/react';
import {
  fetchCategories,
  fetchTopCategories,
  resetCategoriesState,
} from '@farfetch/blackout-redux/categories';
import {
  mockCategories,
  mockCategoriesErrorState,
  mockCategoriesInitialState,
  mockCategoriesLoadingState,
  mockCategoriesState,
  mockTopCategories,
  mockTopCategoriesErrorState,
  mockTopCategoriesLoadingState,
} from 'tests/__fixtures__/categories';
import { within } from '@testing-library/dom';
import { wrap } from '../../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-redux/categories', () => ({
  ...jest.requireActual('@farfetch/blackout-redux/categories'),
  resetCategoriesState: jest.fn(() => ({ type: 'foo-bar' })),
  fetchCategories: jest.fn(() => ({ type: 'foo-bar1' })),
  fetchTopCategories: jest.fn(() => ({ type: 'foo-bar2' })),
}));

const getRender = state =>
  wrap(<Categories />)
    .withStore(state)
    .render();

describe('useCategories', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should render with the initial state', () => {
    const { container, queryByTestId } = getRender(mockCategoriesInitialState);

    expect(queryByTestId('categories-loading')).toBeNull();
    expect(queryByTestId('top-categories-loading')).toBeNull();
    expect(queryByTestId('categories-error')).toBeNull();
    expect(queryByTestId('top-categories-error')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('should render in categories loading state', () => {
    const { container, getByTestId } = getRender(mockCategoriesLoadingState);

    expect(getByTestId('categories-loading')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render in top categories loading state', () => {
    const { container, getByTestId } = getRender(mockTopCategoriesLoadingState);

    expect(getByTestId('topCategories-loading')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render in categories error state', () => {
    const { container, getByTestId } = getRender({
      ...mockCategoriesInitialState,
      ...mockCategoriesErrorState,
    });
    const element = getByTestId('categories-error');

    expect(element).toBeInTheDocument();
    expect(
      within(element).getByText(
        mockCategoriesErrorState.categories.error.message,
      ),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render in top categories error state', () => {
    const { container, getByTestId } = getRender({
      ...mockCategoriesInitialState,
      ...mockTopCategoriesErrorState,
    });
    const element = getByTestId('topCategories-error');

    expect(element).toBeInTheDocument();
    expect(
      within(element).getByText(
        mockTopCategoriesErrorState.categories.top.error.message,
      ),
    ).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render in categories fetched state', () => {
    const { container, getByTestId } = getRender(mockCategoriesState);
    const element = getByTestId('categories-fetched');

    expect(element).toBeInTheDocument();
    expect(within(element).getByText('yes')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render in top categories fetched state', () => {
    const { container, getByTestId } = getRender({
      ...mockCategoriesInitialState,
      categories: {
        top: mockCategoriesState.categories.top,
      },
    });
    const element = getByTestId('topCategories-fetched');

    expect(element).toBeInTheDocument();
    expect(within(element).getByText('yes')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should call `reset`', () => {
    const { queryByTestId, getByTestId } = getRender(mockCategoriesState);
    const resetSearchStateButton = getByTestId('categories-resetButton');

    fireEvent.click(resetSearchStateButton);

    expect(resetCategoriesState).toHaveBeenCalledTimes(1);
    expect(queryByTestId('categories-loading')).toBeNull();
    expect(queryByTestId('categories-error')).toBeNull();
  });

  it('should call `fetchCategories` and have the correct results', () => {
    const { getByTestId } = getRender(mockCategoriesInitialState);

    const element = getByTestId('categories-result');
    const getCategoriesButton = getByTestId('categories-getButton');

    fireEvent.click(getCategoriesButton);

    expect(fetchCategories).toHaveBeenCalledTimes(1);
  });

  it('should call `fetchTopCategories` and have the correct results', () => {
    const { getByTestId } = getRender(mockCategoriesInitialState);
    const element = getByTestId('categories-topResult');
    const getTopCategoriesButton = getByTestId('categories-getTopButton');

    fireEvent.click(getTopCategoriesButton);

    expect(fetchTopCategories).toHaveBeenCalledTimes(1);
  });

  it('should render the correct results for `getCategory` function', () => {
    const { getByTestId } = getRender(mockCategoriesState);
    const element = getByTestId('categories-getCategory');

    expect(element).toBeInTheDocument();
    expect(
      within(element).getByText(JSON.stringify(mockCategories[0])),
    ).toBeInTheDocument();
  });

  it('should render the correct results for `getRootCategory` function', () => {
    const { getByTestId } = getRender(mockCategoriesState);
    const element = getByTestId('categories-getRootCategory');

    expect(element).toBeInTheDocument();
    expect(
      within(element).getByText(JSON.stringify(mockTopCategories[1])),
    ).toBeInTheDocument();
  });
});
