import { cleanup, fireEvent } from '@testing-library/react';
import { doGetSEO } from '@farfetch/blackout-core/contents/redux';
import {
  mockInitialState,
  mockState,
  query,
} from '../__fixtures__/useSEO.fixtures';
import { SEO } from './__fixtures__/SEO.fixtures';
import { wrap } from '../../../tests/helpers';
import React from 'react';

jest.mock('@farfetch/blackout-core/contents/redux', () => {
  const original = jest.requireActual('@farfetch/blackout-core/contents/redux');

  return {
    ...original,
    doGetSEO: jest.fn(() => () => ({ type: 'foo-bar' })),
  };
});

describe('useSEO', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => cleanup());

  it('should render with the initial state', () => {
    const { container, queryByTestId } = wrap(<SEO {...query} />)
      .withStore(mockInitialState)
      .render();

    expect(queryByTestId('seo-loading')).toBeNull();
    expect(queryByTestId('seo-error')).toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('should render with the initial state', () => {
    const { container, getByTestId } = wrap(<SEO {...query} />)
      .withStore(mockState)
      .render();

    const triggerAction = getByTestId('trigger-action');

    fireEvent.click(triggerAction);

    expect(doGetSEO).toHaveBeenCalledTimes(1);
    expect(container).toMatchSnapshot();
  });
});
