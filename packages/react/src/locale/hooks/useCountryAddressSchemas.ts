import {
  areCountriesAddressSchemasLoading,
  areCountryAddressSchemasFetched,
  fetchCountryAddressSchemas,
  getCountriesAddressSchemasError,
  getCountryAddressSchemas,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseCountryAddressSchemas } from './types/useCountryAddressSchemas.types.js';

export function useCountryAddressSchemas(
  countryCode: string,
  options: UseCountryAddressSchemas = {},
) {
  const store = useStore();

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
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areCountriesAddressSchemasLoading(updatedState);
    const updatedIsFetched = areCountryAddressSchemasFetched(
      updatedState,
      countryCode,
    );

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(countryCode, fetchConfig);
    }
  }, [countryCode, enableAutoFetch, fetch, fetchConfig, store]);

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
