import { cleanup, renderHook } from '@testing-library/react';
import {
  contentHash,
  contentPublicationId,
  contentQuery,
  expectedNormalizedPayload,
  mockContentsInitialState,
} from 'tests/__fixtures__/contents';
import { fetchContents } from '@farfetch/blackout-redux';
import { withStore } from '../../../../tests/helpers';
import useContentType from '../useContentType';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchContents: jest.fn(() => () => Promise.resolve()),
}));

describe('useContentType', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const { result } = renderHook(
      () =>
        useContentType(contentQuery.contentTypeCode, {
          codes: contentQuery.codes,
        }),
      {
        wrapper: withStore(expectedNormalizedPayload),
      },
    );

    const {
      isLoading,
      error,
      isFetched,
      data: { entries: dataResult, pagination },
    } = result.current;

    expect(isLoading).toBeFalsy();
    expect(error).toBeNull();
    expect(isFetched).toBeTruthy();
    expect(pagination).toMatchObject({
      pageIndex: 1,
      totalPages: 1,
      totalItems: 1,
    });
    expect(dataResult).toMatchObject([
      expectedNormalizedPayload.entities.contents[contentPublicationId],
    ]);
  });

  it('should return in loading state', () => {
    const { result } = renderHook(
      () =>
        useContentType(contentQuery.contentTypeCode, {
          codes: contentQuery.codes,
        }),
      {
        wrapper: withStore({
          ...expectedNormalizedPayload,
          contents: {
            ...expectedNormalizedPayload.contents,
            searchResults: {
              ...expectedNormalizedPayload.contents.searchResults,
              [contentHash]: {
                ...expectedNormalizedPayload.contents.searchResults[
                  contentHash
                ],
                isLoading: true,
              },
            },
          },
        }),
      },
    );

    const { isLoading, error, isFetched } = result.current;

    expect(isLoading).toBeTruthy();
    expect(error).toBeNull();
    expect(isFetched).toBeFalsy();
  });

  it('should return in error state', () => {
    const { result } = renderHook(
      () =>
        useContentType(contentQuery.contentTypeCode, {
          codes: contentQuery.codes,
        }),
      {
        wrapper: withStore({
          ...expectedNormalizedPayload,
          contents: {
            ...expectedNormalizedPayload.contents,
            searchResults: {
              ...expectedNormalizedPayload.contents.searchResults,
              [contentHash]: {
                ...expectedNormalizedPayload.contents.searchResults[
                  contentHash
                ],
                error: true,
              },
            },
          },
        }),
      },
    );

    const { error, isFetched } = result.current;

    expect(error).toBeTruthy();
    expect(isFetched).toBeTruthy();
  });

  describe('options', () => {
    it('should call `fetch` action if `enableAutoFetch` option is true', async () => {
      renderHook(
        () =>
          useContentType(contentQuery.contentTypeCode, {
            codes: contentQuery.codes,
          }),
        {
          wrapper: withStore(mockContentsInitialState),
        },
      );

      expect(fetchContents).toHaveBeenCalledWith(
        {
          codes: contentQuery.codes,
          contentTypeCode: contentQuery.contentTypeCode,
        },
        undefined,
      );
    });

    it('should not call `fetch` action if `enableAutoFetch` option is false', async () => {
      renderHook(
        () =>
          useContentType(contentQuery.contentTypeCode, {
            codes: contentQuery.codes,
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockContentsInitialState),
        },
      );

      expect(fetchContents).not.toHaveBeenCalled();
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
          useContentType(contentQuery.contentTypeCode, {
            codes: contentQuery.codes,
            enableAutoFetch: false,
          }),
        {
          wrapper: withStore(mockContentsInitialState),
        },
      );

      await fetch();

      expect(fetchContents).toHaveBeenCalledWith(
        {
          codes: contentQuery.codes,
          contentTypeCode: contentQuery.contentTypeCode,
        },
        undefined,
      );
    });
  });
});
