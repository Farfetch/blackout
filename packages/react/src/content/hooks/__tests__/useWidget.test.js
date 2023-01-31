import { cleanup } from '@testing-library/react';
import { doGetContent as doGetContentAction } from '@farfetch/blackout-core/contents/redux';
import {
  expectedNormalizedPayload,
  mockContentsErrorState,
  mockContentsInitialState,
  mockContentsLoadingState,
} from 'tests/__fixtures__/contents';
import { Widget } from './__fixtures__/Widget.fixtures';
import { wrap } from '../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-core/contents/redux', () => ({
  ...jest.requireActual('@farfetch/blackout-core/contents/redux'),
  doGetContent: jest.fn(() => () => ({ type: 'foo-bar' })),
}));

describe('useWidget', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render with the state and widget content for the specified widget key', () => {
    const { container, getByTestId } = wrap(<Widget />)
      .withStore(expectedNormalizedPayload)
      .render();

    expect(getByTestId('widget-data').textContent).toBe(
      '<p>By clicking Sign Up, you agree to our Terms and Conditions Privacy Cookies Policy.</p>',
    );
    expect(container).toMatchSnapshot();
  });

  it('should call `fetchWidget` to dispatch a content widget request', () => {
    const { queryByTestId } = wrap(<Widget />)
      .withStore(mockContentsInitialState)
      .render();

    expect(doGetContentAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('widget-data')).toBeNull();
  });

  it('should render loading content for a widget', () => {
    const { getByTestId } = wrap(<Widget />)
      .withStore(mockContentsLoadingState)
      .render();

    expect(getByTestId('widget-loading').textContent).toBe('Loading...');
  });

  it('should render error content for a widget', () => {
    const { getByTestId } = wrap(<Widget />)
      .withStore(mockContentsErrorState)
      .render();

    expect(getByTestId('widget-error').textContent).toBe(
      'Something went wrong!',
    );
  });
});
