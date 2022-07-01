import { cleanup } from '@testing-library/react';
import {
  expectedNormalizedPayload,
  mockContentsInitialState,
} from 'tests/__fixtures__/contents';
import { fetchContent as fetchContentAction } from '@farfetch/blackout-redux';
import { Widget } from './__fixtures__/Widget.fixtures';
import { wrap } from '../../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchContent: jest.fn(() => ({ type: 'foo-bar' })),
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

    expect(fetchContentAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('widget-data')).toBeNull();
  });
});
