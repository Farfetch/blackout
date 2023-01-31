import { cleanup, fireEvent } from '@testing-library/react';
import { ContentPage } from './__fixtures__/ContentPage.fixtures';
import {
  doGetContentPages as doGetContentPagesAction,
  resetContents as resetContentsAction,
} from '@farfetch/blackout-core/contents/redux';
import {
  expectedContentPagesNormalizedPayload,
  mockContentPagesErrorState,
  mockContentPagesLoadingState,
  mockContentsInitialState,
} from 'tests/__fixtures__/contents';
import { wrap } from '../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-core/contents/redux', () => ({
  ...jest.requireActual('@farfetch/blackout-core/contents/redux'),
  doGetContentPages: jest.fn(() => () => ({ type: 'foo-bar' })),
  resetContents: jest.fn(() => ({ type: 'foo' })),
}));

describe('useContentPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render with the state and content page for the specified slug', () => {
    const { container, getByTestId, queryByTestId } = wrap(<ContentPage />)
      .withStore(expectedContentPagesNormalizedPayload)
      .render();

    expect(queryByTestId('content-page-loading')).toBeNull();
    expect(queryByTestId('content-page-error')).toBeNull();
    expect(getByTestId('content-page-data').textContent).toBe('Commerce Page');
    expect(container).toMatchSnapshot();
  });

  it('should call `fetchContentPage` to dispatch a content page request', () => {
    const { queryByTestId } = wrap(<ContentPage />)
      .withStore(mockContentsInitialState)
      .render();

    expect(doGetContentPagesAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('content-page-data')).toBeNull();
  });

  it('should render loading content', () => {
    const { getByTestId } = wrap(<ContentPage />)
      .withStore(mockContentPagesLoadingState)
      .render();

    expect(getByTestId('content-page-loading').textContent).toBe('Loading...');
  });

  it('should render error content', () => {
    const { getByTestId } = wrap(<ContentPage />)
      .withStore(mockContentPagesErrorState)
      .render();

    expect(getByTestId('content-page-error').textContent).toBe(
      'Something went wrong!',
    );
  });

  it('should call `reset` to clean all content inside the store', () => {
    const { getByTestId, queryByTestId } = wrap(<ContentPage />)
      .withStore(mockContentsInitialState)
      .render();

    const resetContents = getByTestId('content-page-reset');

    fireEvent.click(resetContents);

    expect(resetContentsAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('content-page-loading')).toBeNull();
    expect(queryByTestId('content-page-error')).toBeNull();
  });
});
