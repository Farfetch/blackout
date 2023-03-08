import {
  fetchContents,
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
import type { UseContentTypeOptions } from './types/useContentType.types.js';

function useContentType<T = ComponentType[]>(
  contentTypeCode: string,
  {
    enableAutoFetch = true,
    fetchConfig,
    ...queryParams
  }: UseContentTypeOptions,
) {
  const query = useMemo(
    () => ({
      ...queryParams,
      contentTypeCode,
    }),
    [contentTypeCode, queryParams],
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
  const fetchContentsAction = useAction(fetchContents);
  const fetch = useCallback(
    () => fetchContentsAction(query, fetchConfig),
    [fetchContentsAction, query, fetchConfig],
  );

  useEffect(() => {
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch();
    }
  }, [enableAutoFetch, error, fetch, isFetched, isLoading]);

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

  return {
    isLoading,
    isFetched,
    error,
    data,
    actions: {
      fetch,
    },
  };
}

export default useContentType;
