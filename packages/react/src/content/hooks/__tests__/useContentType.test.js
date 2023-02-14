import { cleanup } from '@testing-library/react';
import { ContentType } from './__fixtures__/ContentType.fixtures';
import { doGetContent as doGetContentAction } from '@farfetch/blackout-core/contents/redux';
import {
  expectedNormalizedPayload,
  mockContentsErrorState,
  mockContentsInitialState,
  mockContentsLoadingState,
} from 'tests/__fixtures__/contents';
import { wrap } from '../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-core/contents/redux', () => ({
  ...jest.requireActual('@farfetch/blackout-core/contents/redux'),
  doGetContent: jest.fn(() => () => ({ type: 'foo-bar' })),
}));

describe('useContentType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render with the state and selected content type', () => {
    const { container, getByTestId } = wrap(<ContentType codes="career-test" />)
      .withStore(expectedNormalizedPayload)
      .render();

    expect(getByTestId('contentType-title').textContent).toBe(
      'Career Page Title',
    );
    expect(getByTestId('contentType-description').textContent).toBe(
      '<p>Here you can add some text to explain the Career</p>',
    );
    expect(container).toMatchSnapshot();
  });

  it('should render with the state and selected content type and code', () => {
    const { container, getByTestId } = wrap(<ContentType codes="career-test" />)
      .withStore(expectedNormalizedPayload)
      .render();

    expect(getByTestId('contentType-title').textContent).toBe(
      'Career Page Title',
    );
    expect(getByTestId('contentType-description').textContent).toBe(
      '<p>Here you can add some text to explain the Career</p>',
    );
    expect(container).toMatchSnapshot();
  });

  it('should call `fetchContentType` to dispatch a custom content type request', () => {
    const { queryByTestId } = wrap(<ContentType codes="career-test" />)
      .withStore(mockContentsInitialState)
      .render();

    expect(doGetContentAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('contentType-container')).toBeNull();
  });

  it('should render loading content for a custom content type', () => {
    const { getByTestId } = wrap(<ContentType codes="career-test" />)
      .withStore(mockContentsLoadingState)
      .render();

    expect(getByTestId('contentType-loading').textContent).toBe('Loading...');
  });

  it('should render error content for a custom content type', () => {
    const { getByTestId } = wrap(<ContentType codes="career-test" />)
      .withStore(mockContentsErrorState)
      .render();

    expect(getByTestId('contentType-error').textContent).toBe(
      'Something went wrong!',
    );
  });
});
