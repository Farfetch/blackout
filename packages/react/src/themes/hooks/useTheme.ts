import {
  fetchTheme,
  getTheme,
  getThemeError,
  isThemeFetched,
  isThemeLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseThemeOptions } from './types/useTheme.types.js';

const useTheme = ({
  code,
  enableAutoFetch = true,
  fetchConfig,
  ...queryParams
}: UseThemeOptions) => {
  const query = queryParams;

  // Selectors
  const theme = useSelector((state: StoreState) => getTheme(state, code));
  const isLoading = useSelector((state: StoreState) =>
    isThemeLoading(state, code),
  );
  const isFetched = useSelector((state: StoreState) =>
    isThemeFetched(state, code),
  );
  const error = useSelector((state: StoreState) => getThemeError(state, code));

  // Actions
  const fetchThemeAction = useAction(fetchTheme);
  const fetch = useCallback(
    () => fetchThemeAction(code, query, fetchConfig),
    [fetchThemeAction, code, query, fetchConfig],
  );

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading]);

  return {
    error,
    isLoading,
    isFetched,
    data: { theme },
    actions: {
      fetch,
    },
  };
};

export default useTheme;
