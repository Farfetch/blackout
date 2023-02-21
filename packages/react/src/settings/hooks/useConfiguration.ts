import {
  fetchConfiguration as fetchConfigurationAction,
  getConfiguration,
  getConfigurationError,
  isConfigurationFetched,
  isConfigurationLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { Configuration } from '@farfetch/blackout-client';
import type { UseConfigurationOptions } from './types';

const useConfiguration = (
  configurationCode: Configuration['code'],
  options: UseConfigurationOptions = {},
) => {
  const { enableAutoFetch = true, fetchQuery, fetchConfig } = options;

  const error = useSelector((state: StoreState) =>
    getConfigurationError(state, configurationCode),
  );
  const isLoading = useSelector((state: StoreState) =>
    isConfigurationLoading(state, configurationCode),
  );
  const isFetched = useSelector((state: StoreState) =>
    isConfigurationFetched(state, configurationCode),
  );
  const configuration = useSelector((state: StoreState) =>
    getConfiguration(state, configurationCode),
  );
  const fetch = useAction(fetchConfigurationAction);

  const fetchConfiguration = useCallback(() => {
    if (!configurationCode) {
      return Promise.reject(
        new Error('Invalid parameter `configurationCode` for `fetch`'),
      );
    }

    return fetch(configurationCode, fetchQuery, fetchConfig);
  }, [fetch, configurationCode, fetchQuery, fetchConfig]);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && configurationCode) {
      fetchConfiguration();
    }
  }, [
    fetchConfiguration,
    isLoading,
    isFetched,
    enableAutoFetch,
    configurationCode,
  ]);

  return {
    isLoading,
    error,
    isFetched,
    data: configuration,
    actions: {
      fetch: fetchConfiguration,
    },
  };
};

export default useConfiguration;
