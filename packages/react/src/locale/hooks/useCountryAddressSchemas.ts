import {
  areCountriesAddressSchemasLoading,
  areCountryAddressSchemasFetched,
  fetchCountryAddressSchemas,
  getCountriesAddressSchemas,
  getCountriesAddressSchemasError,
  getCountryAddressSchemas,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { UseCountryAddressSchemas } from '../types/useCountryAddressSchemas.types';

export function useCountryAddressSchemas(
  countryCode: string,
  options: UseCountryAddressSchemas = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  // Actions
  const fetch = useAction(fetchCountryAddressSchemas);
  // Selectors
  const countriesAddressSchemas = useSelector(getCountriesAddressSchemas);
  const countryAddressSchemas = useSelector((state: StoreState) =>
    getCountryAddressSchemas(state, countryCode),
  );
  const isLoading = useSelector(areCountriesAddressSchemasLoading);
  const error = useSelector(getCountriesAddressSchemasError);
  const isFetched = useSelector((state: StoreState) =>
    areCountryAddressSchemasFetched(state, countryCode),
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
      countriesAddressSchemas,
      countryAddressSchemas,
    },
    actions: {
      fetch,
    },
  };
}

export default useCountryAddressSchemas;
