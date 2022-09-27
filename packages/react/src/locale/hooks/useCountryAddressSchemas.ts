import {
  areCountriesAddressSchemasLoading,
  areCountryAddressSchemasFetched,
  fetchCountryAddressSchemas,
  getCountriesAddressSchemasError,
  getCountryAddressSchemas,
  StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { UseCountryAddressSchemas } from './types/useCountryAddressSchemas.types';

export function useCountryAddressSchemas(
  countryCode: string,
  options: UseCountryAddressSchemas = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  // Actions
  const fetch = useAction(fetchCountryAddressSchemas);
  // Selectors
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
      countryAddressSchemas,
    },
    actions: {
      fetch,
    },
  };
}

export default useCountryAddressSchemas;
