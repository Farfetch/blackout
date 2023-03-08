import {
  ContentTypeCode,
  fetchCommercePages,
  getContentByQuery,
  getContentError,
  getContents,
  isContentFetched,
  isContentLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { ComponentType } from '@farfetch/blackout-client';
import type { UseCommercePagesOptions } from './types/useCommercePages.types.js';

const useCommercePages = <T = ComponentType[]>(
  options: UseCommercePagesOptions,
) => {
  const {
    enableAutoFetch = true,
    fetchConfig,
    strategy,
    ...fetchQuery
  } = options;

  const query = useMemo(
    () => ({
      contentTypeCode: ContentTypeCode.CommercePages,
      ...fetchQuery,
    }),
    [fetchQuery],
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
  const entries = useSelector((state: StoreState) =>
    getContents<T>(state, query),
  );
  const contentGroup = useSelector((state: StoreState) =>
    getContentByQuery(state, query),
  );
  const fetchCommercePagesAction = useAction(fetchCommercePages);

  const fetch = useCallback(
    () => fetchCommercePagesAction(fetchQuery, strategy, fetchConfig),
    [fetchCommercePagesAction, fetchQuery, strategy, fetchConfig],
  );

  const data = useMemo(
    () =>
      !entries || !contentGroup
        ? undefined
        : {
            entries,
            pagination: {
              pageIndex: contentGroup?.number,
              totalPages: contentGroup?.totalPages,
              totalItems: contentGroup?.totalItems,
            },
          },
    [contentGroup, entries],
  );

  useEffect(() => {
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch();
    }
  }, [enableAutoFetch, error, fetch, isFetched, isLoading]);

  return {
    isLoading,
    isFetched,
    error,
    data,
    actions: {
      fetch,
    },
  };
};

export default useCommercePages;
