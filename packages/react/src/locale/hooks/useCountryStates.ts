import {
  areCountryStatesFetched,
  areCountryStatesLoading,
  fetchCountryStates as fetchCountryStatesAction,
  getCountryStates,
  getCountryStatesError,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseCountryStatesOptions } from './types/useCountryStates.types.js';

export function useCountryStates(
  countryCode: string,
  options: UseCountryStatesOptions = {},
) {
  const store = useStore();

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
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areCountryStatesLoading(updatedState);
    const updatedIsFetched = areCountryStatesFetched(updatedState, countryCode);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(countryCode, fetchConfig);
    }
  }, [countryCode, enableAutoFetch, fetch, fetchConfig, store]);

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
