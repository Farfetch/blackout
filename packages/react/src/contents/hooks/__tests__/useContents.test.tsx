import { cleanup, renderHook } from '@testing-library/react';
import {
  contentHash,
  contentPublicationId,
  contentQuery,
  mockContentsInitialState,
  mockContentsWithDataState,
} from 'tests/__fixtures__/contents/index.mjs';
import { fetchContents } from '@farfetch/blackout-redux';
import { withStore } from '../../../../tests/helpers/index.js';
import useContents from '../useContents.js';
import type { BlackoutError } from '@farfetch/blackout-client';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  fetchContents: jest.fn(() => () => Promise.resolve()),
}));

describe('useContents', () => {
  beforeEach(jest.clearAllMocks);

  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const { result } = renderHook(
      () =>
        useContents({
          codes: contentQuery.codes,
          contentTypeCode: contentQuery.contentTypeCode,
        }),
      {
        wrapper: withStore(mockContentsWithDataState),
      },
    );

    const { isLoading, error, isFetched, data } = result.current;
    const { entries: dataResult, pagination } = data!;

    expect(isLoading).toBeFalsy();
    expect(error).toBeNull();
    expect(isFetched).toBeTruthy();
    expect(pagination).toMatchObject({
      pageIndex: 1,
      totalPages: 1,
      totalItems: 1,
    });
    expect(dataResult).toMatchObject([
      mockContentsWithDataState.entities.contents[contentPublicationId],
    ]);
  });

  it('should return in loading state', () => {
    const { result } = renderHook(
      () =>
        useContents({
          codes: contentQuery.codes,
          contentTypeCode: contentQuery.contentTypeCode,
        }),
      {
        wrapper: withStore({
          ...mockContentsWithDataState,
          contents: {
            ...mockContentsWithDataState.contents,
            searchResults: {
              ...mockContentsWithDataState.contents.searchResults,
              [contentHash]: {
                ...mockContentsWithDataState.contents.searchResults[
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
        useContents({
          codes: contentQuery.codes,
          contentTypeCode: contentQuery.contentTypeCode,
        }),
      {
        wrapper: withStore({
          ...mockContentsWithDataState,
          contents: {
            ...mockContentsWithDataState.contents,
            searchResults: {
              ...mockContentsWithDataState.contents.searchResults,
              [contentHash]: {
                ...mockContentsWithDataState.contents.searchResults[
                  contentHash
                ],
                error: new Error('error') as BlackoutError,
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
    it('should call `fetch` action if `enableAutoFetch` option is true', () => {
      renderHook(
        () =>
          useContents({
            codes: contentQuery.codes,
            contentTypeCode: contentQuery.contentTypeCode,
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

    it('should not call `fetch` action if `enableAutoFetch` option is false', () => {
      renderHook(
        () =>
          useContents({
            codes: contentQuery.codes,
            contentTypeCode: contentQuery.contentTypeCode,
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
          useContents({
            codes: contentQuery.codes,
            contentTypeCode: contentQuery.contentTypeCode,
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
