import { cleanup, fireEvent } from '@testing-library/react';
import {
  doGetContent as doGetContentAction,
  resetContents as resetContentsAction,
} from '@farfetch/blackout-core/contents/redux';
import {
  expectedNormalizedPayload,
  mockContentsErrorState,
  mockContentsInitialState,
  mockContentsLoadingState,
} from 'tests/__fixtures__/contents';
import { Page } from './__fixtures__/Page.fixtures';
import { wrap } from '../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-core/contents/redux', () => ({
  ...jest.requireActual('@farfetch/blackout-core/contents/redux'),
  doGetContent: jest.fn(() => () => ({ type: 'foo-bar' })),
  resetContents: jest.fn(() => ({ type: 'foo' })),
}));

describe('usePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render with the state and page content for the specified slug', () => {
    const { container, getByTestId, queryByTestId } = wrap(<Page />)
      .withStore(expectedNormalizedPayload)
      .render();

    expect(queryByTestId('page-loading')).toBeNull();
    expect(queryByTestId('page-error')).toBeNull();
    expect(getByTestId('page-data').textContent).toBe(
      'Browns South Molton Street',
    );
    expect(container).toMatchSnapshot();
  });

  it('should call `fetchContent` to dispatch a content page request', () => {
    const { queryByTestId } = wrap(<Page />)
      .withStore(mockContentsInitialState)
      .render();

    expect(doGetContentAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('page-data')).toBeNull();
  });

  it('should render loading content', () => {
    const { getByTestId } = wrap(<Page />)
      .withStore(mockContentsLoadingState)
      .render();

    expect(getByTestId('page-loading').textContent).toBe('Loading...');
  });

  it('should render error content', () => {
    const { getByTestId } = wrap(<Page />)
      .withStore(mockContentsErrorState)
      .render();

    expect(getByTestId('page-error').textContent).toBe('Something went wrong!');
  });

  it('should call `reset` to clean all content inside the store', () => {
    const { getByTestId, queryByTestId } = wrap(<Page />)
      .withStore(mockContentsInitialState)
      .render();

    const resetContents = getByTestId('page-reset');

    fireEvent.click(resetContents);

    expect(resetContentsAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('page-loading')).toBeNull();
    expect(queryByTestId('page-error')).toBeNull();
  });
});
