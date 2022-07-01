import { cleanup } from '@testing-library/react';
import {
  expectedNormalizedPayload,
  mockContentsInitialState,
} from 'tests/__fixtures__/contents';
import { fetchContent as fetchContentAction } from '@farfetch/blackout-redux';
import { Navbars } from './__fixtures__/Navbars.fixtures';
import { wrap } from '../../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchContent: jest.fn(() => ({ type: 'foo-bar' })),
}));

describe('useNavbars', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render with the state and navbar for the specified nav key', () => {
    const { container, getByTestId } = wrap(<Navbars />)
      .withStore(expectedNormalizedPayload)
      .render();

    expect(getByTestId('navigation-link-text').textContent).toBe(
      'About White Label',
    );
    expect(getByTestId('navigation-link-text')).toHaveAttribute(
      'href',
      '/about',
    );
    expect(getByTestId('navigation-link-text')).toHaveAttribute(
      'target',
      '_self',
    );
    expect(container).toMatchSnapshot();
  });

  it('should call `fetchNavbars` to dispatch a content navbars request', () => {
    const { queryByTestId } = wrap(<Navbars />)
      .withStore(mockContentsInitialState)
      .render();

    expect(fetchContentAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('navigation')).toBeNull();
  });
});
