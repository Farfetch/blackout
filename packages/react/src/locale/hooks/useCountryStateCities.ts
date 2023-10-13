import {
  areCountryStateCitiesFetched,
  areCountryStateCitiesLoading,
  fetchCountryStateCities as fetchCountryStateCitiesAction,
  getCountryStateCities,
  getCountryStateCitiesError,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseCountryStateCitiesOptions } from './types/useCountryStateCities.types.js';

export function useCountryStateCities(
  countryCode: string,
  stateId: number,
  options: UseCountryStateCitiesOptions = {},
) {
  const store = useStore();

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
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areCountryStateCitiesLoading(updatedState);
    const updatedIsFetched = areCountryStateCitiesFetched(
      updatedState,
      stateId,
    );

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(countryCode, stateId, fetchConfig);
    }
  }, [countryCode, enableAutoFetch, fetch, fetchConfig, stateId, store]);

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
