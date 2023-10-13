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
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { ComponentType } from '@farfetch/blackout-client';
import type { UseContentsOptions } from './types/useContents.types.js';

function useContents<T = ComponentType[]>({
  enableAutoFetch = true,
  fetchConfig,
  ...queryParams
}: UseContentsOptions) {
  const store = useStore();

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
    const updatedState = store.getState() as StoreState;
    const updatedIsLoading = isContentLoading(updatedState, query);
    const updatedIsFetched = isContentFetched(updatedState, query);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, store, query]);

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
