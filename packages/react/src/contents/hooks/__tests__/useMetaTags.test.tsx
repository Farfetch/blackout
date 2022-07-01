import { cleanup, renderHook } from '@testing-library/react';
import { fetchSEO } from '@farfetch/blackout-redux';
import {
  mockInitialState,
  mockState,
  mockStateEmptySocialMeta,
  query,
  result,
  resultNoSocialMeta,
} from './__fixtures__/useMetaTags.fixtures';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useMetaTags } from '..';
import React from 'react';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchSEO: jest.fn(() => ({ type: 'foo-bar' })),
  };
});

describe('useMetaTags', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => cleanup());

  it('should return meta with the initial state', () => {
    const props = { query };
    const wrapper = props => (
      <Provider store={mockStore(mockInitialState)} {...props} />
    );
    const {
      result: { current },
    } = renderHook(() => useMetaTags(props), {
      wrapper,
    });

    const emptyResult = {
      error: undefined,
      isLoading: undefined,
      meta: {
        title: undefined,
        description: undefined,
        canonical: undefined,
        meta: [],
        link: [],
      },
    };

    expect(fetchSEO).toHaveBeenCalledTimes(1);
    expect(current).toEqual(emptyResult);
  });

  it('should return meta with data', () => {
    const props = { query };
    const wrapper = props => (
      <Provider store={mockStore(mockState)} {...props} />
    );
    const {
      result: { current },
    } = renderHook(() => useMetaTags(props), {
      wrapper,
    });

    expect(current).toEqual(result);
  });

  it('should return no social metatags', () => {
    const props = { query };
    const wrapper = props => (
      <Provider store={mockStore(mockStateEmptySocialMeta)} {...props} />
    );
    const {
      result: { current },
    } = renderHook(() => useMetaTags(props), {
      wrapper,
    });

    expect(current).toEqual(resultNoSocialMeta);
  });
});
