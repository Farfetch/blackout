import {
  areCountryStatesFetched,
  areCountryStatesLoading,
  fetchCountryStates as fetchCountryStatesAction,
  getCountryStates,
  getCountryStatesError,
  StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { UseCountryStatesOptions } from './types/useCountryStates.types';

export function useCountryStates(
  countryCode: string,
  options: UseCountryStatesOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  // Actions
  const fetch = useAction(fetchCountryStatesAction);
  // Selectors
  const countryStates = useSelector((state: StoreState) =>
    getCountryStates(state, countryCode),
  );
  const isLoading = useSelector(areCountryStatesLoading);
  const error = useSelector(getCountryStatesError);
  const isFetched = useSelector((state: StoreState) =>
    areCountryStatesFetched(state, countryCode),
  );

  useEffect(() => {
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch(countryCode, fetchConfig);
    }
  }, [
    countryCode,
    enableAutoFetch,
    error,
    fetch,
    fetchConfig,
    isFetched,
    isLoading,
  ]);

  return {
    error,
    isLoading,
    isFetched,
    data: {
      countryStates,
    },
    actions: {
      fetch,
    },
  };
}

export default useCountryStates;
