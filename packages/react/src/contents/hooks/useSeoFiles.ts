import {
  areSEOFilesFetched,
  areSEOFilesLoading,
  fetchSEOFiles,
  getSEOFilesError,
  getSEOFilesResult,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { GetSEOFilesQuery } from '@farfetch/blackout-client';
import type { UseSeoFilesOptions } from './types/useSeoFiles.types.js';

/**
 * Hook to return SEO Files data.
 *
 * @param query - object that receives SEO Files query.
 * @param options - object that receives option `enableAutoFetch`. By default is `true`.
 *
 * @returns - Returns actions and SEO Files state for a given path.
 */
const useSeoFiles = (
  query: GetSEOFilesQuery,
  options: UseSeoFilesOptions = {},
) => {
  const { enableAutoFetch = true } = options;

  const error = useSelector((state: StoreState) =>
    getSEOFilesError(state, query),
  );

  const isLoading = useSelector((state: StoreState) =>
    areSEOFilesLoading(state, query),
  );

  const isFetched = useSelector((state: StoreState) =>
    areSEOFilesFetched(state, query),
  );

  const data = useSelector((state: StoreState) =>
    getSEOFilesResult(state, query),
  );

  const fetchSEOFilesAction = useAction(fetchSEOFiles);

  const fetch = useCallback(
    () => fetchSEOFilesAction(query),
    [fetchSEOFilesAction, query],
  );

  useEffect(() => {
    if (enableAutoFetch && !isLoading && !isFetched) {
      fetch();
    }
  }, [fetch, enableAutoFetch, isLoading, isFetched, query]);

  return {
    error,
    isLoading,
    isFetched,
    data,
    actions: {
      fetch,
    },
  };
};

export default useSeoFiles;
