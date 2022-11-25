import { cleanup, renderHook } from '@testing-library/react';
import { ContentPageType } from '@farfetch/blackout-client';
import { fetchContentPage } from '@farfetch/blackout-redux';
import {
  mockContentPageEntry,
  mockContentPageErrorState,
  mockContentPageInitialState,
  mockContentPageLoadingState,
  mockContentPageWithDataState,
  slug,
} from 'tests/__fixtures__/contents';
import { withStore } from '../../../../tests/helpers';
import useContentPage from '../useContentPage';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchContentPage: jest.fn(() => ({ type: 'foo-bar' })),
}));

describe('useContentPage', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const { result } = renderHook(
      () => useContentPage(ContentPageType.Listing, { slug }),
      {
        wrapper: withStore(mockContentPageWithDataState),
      },
    );

    expect(result.current).toStrictEqual({
      data: [
        mockContentPageWithDataState.entities.contents[
          mockContentPageEntry.publicationId
        ],
      ],
      isLoading: false,
      error: null,
      isFetched: true,
      actions: {
        fetch: expect.any(Function),
      },
    });
  });

  it('should return in loading state', () => {
    const { result } = renderHook(
      () => useContentPage(ContentPageType.Listing, { slug }),
      {
        wrapper: withStore(mockContentPageLoadingState),
      },
    );

    const { isLoading, error, isFetched } = result.current;

    expect(isLoading).toBe(true);
    expect(error).toBeNull();
    expect(isFetched).toBeFalsy();
  });

  it('should return in error state', () => {
    const { result } = renderHook(
      () => useContentPage(ContentPageType.Listing, { slug }),
      {
        wrapper: withStore(mockContentPageErrorState),
      },
    );

    const { error, isFetched } = result.current;

    expect(error).toBeTruthy();
    expect(isFetched).toBeTruthy();
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', async () => {
      renderHook(() => useContentPage(ContentPageType.Listing, { slug }), {
        wrapper: withStore(mockContentPageInitialState),
      });

      expect(fetchContentPage).toHaveBeenCalledWith(
        ContentPageType.Listing,
        { slug },
        undefined,
      );
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', async () => {
      renderHook(
        () =>
          useContentPage(
            ContentPageType.Listing,
            { slug },
            { enableAutoFetch: false },
          ),
        {
          wrapper: withStore(mockContentPageInitialState),
        },
      );

      expect(fetchContentPage).not.toHaveBeenCalled();
    });
  });

  describe('actions', () => {
    it('should call `fetch` action', async () => {
      const {
        result: {
          current: {
            actions: { fetch },
          },
        },
      } = renderHook(
        () =>
          useContentPage(
            ContentPageType.Listing,
            { slug },
            { enableAutoFetch: false },
          ),
        {
          wrapper: withStore(mockContentPageInitialState),
        },
      );

      await fetch();

      expect(fetchContentPage).toHaveBeenCalledWith(
        ContentPageType.Listing,
        { slug },
        undefined,
      );
    });
  });
});
