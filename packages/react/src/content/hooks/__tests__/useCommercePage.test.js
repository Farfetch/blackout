import { cleanup, fireEvent } from '@testing-library/react';
import { CommercePage } from './__fixtures__/CommercePage.fixtures';
import {
  doGetCommercePages as doGetCommercePagesAction,
  resetContents as resetContentsAction,
} from '@farfetch/blackout-core/contents/redux';
import {
  expectedCommercePagesNormalizedPayload,
  mockCommercePagesErrorState,
  mockCommercePagesLoadingState,
  mockContentsInitialState,
} from 'tests/__fixtures__/contents';
import { wrap } from '../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-core/contents/redux', () => ({
  ...jest.requireActual('@farfetch/blackout-core/contents/redux'),
  doGetCommercePages: jest.fn(() => () => ({ type: 'foo-bar' })),
  resetContents: jest.fn(() => ({ type: 'foo' })),
}));

describe('useCommercePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render with the state and commerce page content for the specified slug', () => {
    const { container, getByTestId, queryByTestId } = wrap(<CommercePage />)
      .withStore(expectedCommercePagesNormalizedPayload)
      .render();

    expect(queryByTestId('commerce-page-loading')).toBeNull();
    expect(queryByTestId('commerce-page-error')).toBeNull();
    expect(getByTestId('commerce-page-data').textContent).toBe('Commerce Page');
    expect(container).toMatchSnapshot();
  });

  it('should call `fetchContent` to dispatch a commerce page request', () => {
    const { queryByTestId } = wrap(<CommercePage />)
      .withStore(mockContentsInitialState)
      .render();

    expect(doGetCommercePagesAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('commerce-page-data')).toBeNull();
  });

  it('should render loading commerce', () => {
    const { getByTestId } = wrap(<CommercePage />)
      .withStore(mockCommercePagesLoadingState)
      .render();

    expect(getByTestId('commerce-page-loading').textContent).toBe('Loading...');
  });

  it('should render error commerce', () => {
    const { getByTestId } = wrap(<CommercePage />)
      .withStore(mockCommercePagesErrorState)
      .render();

    expect(getByTestId('commerce-page-error').textContent).toBe(
      'Something went wrong!',
    );
  });

  it('should call `reset` to clean all commerce inside the store', () => {
    const { getByTestId, queryByTestId } = wrap(<CommercePage />)
      .withStore(mockContentsInitialState)
      .render();

    const resetContents = getByTestId('commerce-page-reset');

    fireEvent.click(resetContents);

    expect(resetContentsAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('commerce-page-loading')).toBeNull();
    expect(queryByTestId('commerce-page-error')).toBeNull();
  });
});
