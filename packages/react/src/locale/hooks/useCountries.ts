import {
  areCountriesFetched,
  areCountriesLoading,
  fetchCountries as fetchCountriesAction,
  getCountries,
  getCountriesError,
} from '@farfetch/blackout-redux';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { Country } from '@farfetch/blackout-client';
import type { UseCountriesOptions } from './types/useCountries.types';

export function useCountries(options: UseCountriesOptions = {}) {
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
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch(fetchConfig);
    }
  }, [enableAutoFetch, error, fetch, fetchConfig, isFetched, isLoading]);

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
