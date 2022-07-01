import { cleanup } from '@testing-library/react';
import { ContentTypes } from './__fixtures__/ContentTypes.fixtures';
import {
  expectedNormalizedPayload,
  mockContentsInitialState,
} from 'tests/__fixtures__/contents';
import { fetchContent as fetchContentAction } from '@farfetch/blackout-redux';
import { wrap } from '../../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchContent: jest.fn(() => ({ type: 'foo-bar' })),
}));

describe('useContentType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should render with the state and selected content type and code', () => {
    const { container, getByTestId } = wrap(
      <ContentTypes codes="test-career" />,
    )
      .withStore(expectedNormalizedPayload)
      .render();

    expect(getByTestId('contentType-title').textContent).toBe('Career');
    expect(getByTestId('contentType-description').textContent).toBe(
      '<p>Career test</p>',
    );
    expect(container).toMatchSnapshot();
  });

  it('should call `fetchContentType` to dispatch a custom content type request', () => {
    const { queryByTestId } = wrap(<ContentTypes codes={null} />)
      .withStore(mockContentsInitialState)
      .render();

    expect(fetchContentAction).toHaveBeenCalledTimes(1);
    expect(queryByTestId('contentType-container')).toBeNull();
  });
});
