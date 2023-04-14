import {
  ContentTypeCode,
  fetchContentPage as fetchContentPageAction,
  getContentError,
  getContents,
  isContentFetched,
  isContentLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type {
  ComponentType,
  ContentPageType,
  QueryContentPage,
} from '@farfetch/blackout-client';
import type { UseContentPageOptions } from './types/useContentPage.types.js';

const useContentPage = <T = [ComponentType]>(
  contentPageType: ContentPageType,
  fetchQuery: QueryContentPage,
  options: UseContentPageOptions = {},
) => {
  const { enableAutoFetch = true, fetchConfig } = options;

  const query = useMemo(
    () => ({
      contentTypeCode: ContentTypeCode.ContentPage,
      codes: fetchQuery.slug.split('?')[0] as string,
    }),
    [fetchQuery.slug],
  );

  const fetchQueryWithoutSlug = useMemo(() => {
    return {
      ...fetchQuery,
      slug: query.codes,
    };
  }, [query, fetchQuery]);

  const error = useSelector((state: StoreState) =>
    getContentError(state, query),
  );

  const isLoading = useSelector((state: StoreState) =>
    isContentLoading(state, query),
  );
  const isFetched = useSelector((state: StoreState) =>
    isContentFetched(state, query),
  );
  const contentPage = useSelector((state: StoreState) =>
    getContents<T>(state, query),
  );

  const fetchContentPage = useAction(fetchContentPageAction);

  const fetch = useCallback(() => {
    return fetchContentPage(
      contentPageType,
      fetchQueryWithoutSlug,
      fetchConfig,
    );
  }, [contentPageType, fetchConfig, fetchContentPage, fetchQueryWithoutSlug]);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading]);

  return {
    data: contentPage,
    isLoading,
    isFetched,
    error,
    actions: {
      fetch,
    },
  };
};

export default useContentPage;
