import {
  areCountryStateCitiesFetched,
  areCountryStateCitiesLoading,
  fetchCountryStateCities as fetchCountryStateCitiesAction,
  getCountryStateCities,
  getCountryStateCitiesError,
  StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { UseCountryStateCitiesOptions } from './types/useCountryStateCities.types';

export function useCountryStateCities(
  countryCode: string,
  stateId: number,
  options: UseCountryStateCitiesOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  // Actions
  const fetch = useAction(fetchCountryStateCitiesAction);
  // Selectors
  const countryStateCities = useSelector((state: StoreState) =>
    getCountryStateCities(state, stateId),
  );
  const isLoading = useSelector(areCountryStateCitiesLoading);
  const error = useSelector(getCountryStateCitiesError);
  const isFetched = useSelector((state: StoreState) =>
    areCountryStateCitiesFetched(state, stateId),
  );

  useEffect(() => {
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch(countryCode, stateId, fetchConfig);
    }
  }, [
    countryCode,
    enableAutoFetch,
    error,
    fetch,
    fetchConfig,
    isFetched,
    isLoading,
    stateId,
  ]);

  return {
    error,
    isLoading,
    isFetched,
    data: { countryStateCities },
    actions: {
      fetch,
    },
  };
}

export default useCountryStateCities;
