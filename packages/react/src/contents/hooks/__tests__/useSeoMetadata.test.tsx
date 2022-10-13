import { cleanup, renderHook } from '@testing-library/react';
import { fetchSEOMetadata } from '@farfetch/blackout-redux';
import { mockDefaultAppLinks } from '../../utils/__tests__/__fixtures__/metadata';
import {
  mockInitialState,
  mockState,
  mockStateEmptySocialMeta,
  query,
  result,
  resultNoSocialMeta,
} from './__fixtures__/useSeoMetadata.fixtures';
import { withStore } from '../../../../tests/helpers';
import { useSeoMetadata } from '..';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchSEOMetadata: jest.fn(() => ({ type: 'foo-bar' })),
  };
});

jest.mock('../../utils/seoMetadata', () => ({
  ...jest.requireActual('../../utils/seoMetadata'),
  getDefaultAppLinks: () => mockDefaultAppLinks,
}));

describe('useSeoMetadata', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => cleanup());

  it('should return undefined if there are no results', () => {
    const props = { query };

    const {
      result: { current },
    } = renderHook(() => useSeoMetadata(props), {
      wrapper: withStore(mockInitialState),
    });

    const emptyResult = {
      error: undefined,
      isLoading: undefined,
      isFetched: false,
      data: undefined,
      actions: {
        fetch: expect.any(Function),
      },
    };

    expect(fetchSEOMetadata).toHaveBeenCalledTimes(1);
    expect(current).toEqual(emptyResult);
  });

  it('should return data', () => {
    const props = { query };

    const {
      result: { current },
    } = renderHook(() => useSeoMetadata(props), {
      wrapper: withStore(mockState),
    });

    expect(current).toEqual(result);
  });

  it('should return no social metatags', () => {
    const props = { query };

    const {
      result: { current },
    } = renderHook(() => useSeoMetadata(props), {
      wrapper: withStore(mockStateEmptySocialMeta),
    });

    expect(current).toEqual(resultNoSocialMeta);
  });

  describe('options', () => {
    it('should call fetch data if `enableAutoFetch` option is true', () => {
      const props = { query };

      renderHook(() => useSeoMetadata(props, { enableAutoFetch: true }), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchSEOMetadata).toHaveBeenCalledWith({
        pageType: 5,
        path: '/about',
        subPageType: 'Default',
      });
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      const props = { query };

      renderHook(() => useSeoMetadata(props, { enableAutoFetch: false }), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchSEOMetadata).not.toHaveBeenCalledWith();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useSeoMetadata({ query }), {
        wrapper: withStore(mockInitialState),
      });

      fetch(query);

      expect(fetchSEOMetadata).toHaveBeenCalledWith({
        pageType: 5,
        path: '/about',
        subPageType: 'Default',
      });
    });
  });
});
