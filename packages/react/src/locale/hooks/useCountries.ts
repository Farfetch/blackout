import {
  areCountriesFetched,
  areCountriesLoading,
  fetchCountries as fetchCountriesAction,
  getCountries,
  getCountriesError,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Country } from '@farfetch/blackout-client';
import type { UseCountriesOptions } from './types/useCountries.types.js';

export function useCountries(options: UseCountriesOptions = {}) {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;
  // Actions
  const fetch = useAction(fetchCountriesAction);
  // Selectors
  const countries = useSelector(getCountries);
  const isLoading = useSelector(areCountriesLoading);
  const error = useSelector(getCountriesError);
  const isFetched = useSelector(areCountriesFetched);

  const countriesById = useMemo(
    () =>
      countries
        ? Object.values<Country>(countries).reduce((acc, value) => {
            if (value.platformId) {
              acc[value.platformId] = value;
            }

            return acc;
          }, {} as Record<number, Country>)
        : undefined,
    [countries],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areCountriesLoading(updatedState);
    const updatedIsFetched = areCountriesFetched(updatedState);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, store]);

  return {
    error,
    isLoading,
    isFetched,
    data: { countries, countriesById },
    actions: {
      fetch,
    },
  };
}

export default useCountries;
