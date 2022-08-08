import {
  areCountryCitiesFetched,
  areCountryCitiesLoading,
  fetchCountryCities as fetchCountryCitiesAction,
  getCountryCities,
  getCountryCitiesError,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { UseCountryCitiesOptions } from '../types/useCountryCities.types';

export function useCountryCities(
  countryCode: string,
  stateId: number,
  options: UseCountryCitiesOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  // Actions
  const fetch = useAction(fetchCountryCitiesAction);
  // Selectors
  const countryCities = useSelector((state: StoreState) =>
    getCountryCities(state, stateId),
  );
  const isLoading = useSelector(areCountryCitiesLoading);
  const error = useSelector(getCountryCitiesError);
  const isFetched = useSelector((state: StoreState) =>
    areCountryCitiesFetched(state, stateId),
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
    data: { countryCities },
    actions: {
      fetch,
    },
  };
}

export default useCountryCities;
