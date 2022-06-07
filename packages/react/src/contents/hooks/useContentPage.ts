import {
  ContentTypeCode,
  fetchContentPage as fetchContentPageAction,
  getContentError,
  getContents,
  isContentFetched,
  isContentLoading,
  StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type {
  ComponentType,
  ContentPageType,
  QueryContentPage,
} from '@farfetch/blackout-client';
import type { UseContentPageOptions } from './types/useContentPage.types';

const useContentPage = <T = [ComponentType]>(
  contentPagesType: ContentPageType,
  fetchQuery: QueryContentPage,
  options: UseContentPageOptions = {},
) => {
  const { enableAutoFetch = true, fetchConfig } = options;

  const query = useMemo(
    () => ({
      contentTypeCode: ContentTypeCode.ContentPage,
      codes: fetchQuery.slug,
    }),
    [fetchQuery.slug],
  );

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
    return fetchContentPage(contentPagesType, fetchQuery, fetchConfig);
  }, [contentPagesType, fetchConfig, fetchContentPage, fetchQuery]);

  useEffect(() => {
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch();
    }
  }, [enableAutoFetch, error, fetch, isFetched, isLoading]);

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
