import { cleanup, renderHook } from '@testing-library/react';
import { fetchSEOFiles } from '@farfetch/blackout-redux';
import { mockInitialState } from './__fixtures__/useSeoMetadata.fixtures.js';
import {
  mockSEOFilesErrorState,
  mockSEOFilesLoadingState,
  mockSEOFilesState,
  result,
} from './__fixtures__/useSeoFiles.fixtures.js';
import { seoFilesQuery as query } from 'tests/__fixtures__/contents/seoFiles.fixtures.mjs';
import { useSeoFiles } from '../index.js';
import { withStore } from '../../../../tests/helpers/index.js';

jest.mock('@farfetch/blackout-redux', () => {
  const original = jest.requireActual('@farfetch/blackout-redux');

  return {
    ...original,
    fetchSEOFiles: jest.fn(() => ({ type: 'foo-bar' })),
  };
});

describe('useSeoFiles', () => {
  const options = { enableAutoFetch: false };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => cleanup());

  it('should return correctly with initial state', () => {
    const {
      result: { current },
    } = renderHook(() => useSeoFiles(query, options), {
      wrapper: withStore(mockInitialState),
    });

    const emptyResult = {
      error: undefined,
      isLoading: false,
      isFetched: false,
      data: undefined,
      actions: {
        fetch: expect.any(Function),
      },
    };

    expect(current).toEqual(emptyResult);
  });

  it('should return loading state', () => {
    const {
      result: { current },
    } = renderHook(() => useSeoFiles(query, options), {
      wrapper: withStore(mockSEOFilesLoadingState),
    });

    const { isLoading, error, isFetched } = current;

    expect(isLoading).toBe(true);
    expect(error).toBeUndefined();
    expect(isFetched).toBeFalsy();
  });

  it('should return data', () => {
    const {
      result: { current },
    } = renderHook(() => useSeoFiles(query, options), {
      wrapper: withStore(mockSEOFilesState),
    });

    expect(current).toEqual(result);
  });

  it('should return error state', () => {
    const {
      result: { current },
    } = renderHook(() => useSeoFiles(query, options), {
      wrapper: withStore(mockSEOFilesErrorState),
    });

    const { error, isFetched } = current;

    expect(error).toBeTruthy();
    expect(isFetched).toBeTruthy();
  });

  describe('options', () => {
    it('should call fetch data if `enableAutoFetch` option is no passed', () => {
      renderHook(() => useSeoFiles(query), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchSEOFiles).toHaveBeenCalledWith({
        hostId: 1234,
        name: 'siteSEOFiles',
        page: 1,
        pageSize: 60,
      });
    });

    it('should not fetch data if `enableAutoFetch` option is false', () => {
      const options = { enableAutoFetch: false };

      renderHook(() => useSeoFiles(query, options), {
        wrapper: withStore(mockInitialState),
      });

      expect(fetchSEOFiles).not.toHaveBeenCalledWith();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', () => {
      const options = { enableAutoFetch: false };

      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(() => useSeoFiles(query, options), {
        wrapper: withStore(mockInitialState),
      });

      fetch();

      expect(fetchSEOFiles).toHaveBeenCalledWith({
        hostId: 1234,
        name: 'siteSEOFiles',
        page: 1,
        pageSize: 60,
      });
    });
  });
});
