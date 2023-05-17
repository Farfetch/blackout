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
import type { UseContentsOptions } from './types/useContents.types.js';

function useContents<T = ComponentType[]>({
  enableAutoFetch = true,
  fetchConfig,
  ...queryParams
}: UseContentsOptions) {
  const query = queryParams;

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
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading]);

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

export default useContents;
