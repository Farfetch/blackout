import { cleanup } from '@testing-library/react';
import { doGetContent as doGetContentAction } from '@farfetch/blackout-core/contents/redux';
import {
  expectedNormalizedPayload,
  mockContentsErrorState,
  mockContentsInitialState,
  mockContentsLoadingState,
} from 'tests/__fixtures__/contents';
import { Navbars } from './__fixtures__/Navbars.fixtures';
import { wrap } from '../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-core/contents/redux', () => ({
  ...jest.requireActual('@farfetch/blackout-core/contents/redux'),
  doGetContent: jest.fn(() => () => ({ type: 'foo-bar' })),
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

    expect(doGetContentAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('navigation')).toBeNull();
  });

  it('should render loading content for a navbar', () => {
    const { getByTestId } = wrap(<Navbars />)
      .withStore(mockContentsLoadingState)
      .render();

    expect(getByTestId('navigation-loading').textContent).toBe('Loading...');
  });

  it('should render error content for a navbar', () => {
    const { getByTestId } = wrap(<Navbars />)
      .withStore(mockContentsErrorState)
      .render();

    expect(getByTestId('navigation-error').textContent).toBe(
      'Something went wrong!',
    );
  });
});
