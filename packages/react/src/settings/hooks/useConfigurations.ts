import {
  areConfigurationsFetched,
  areConfigurationsLoading,
  fetchConfigurations,
  getConfigurations,
  getConfigurationsError,
  resetConfigurationsState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { UseConfigurationsOptions } from './types';

const useConfigurations = (options: UseConfigurationsOptions = {}) => {
  const { enableAutoFetch = true, fetchQuery, fetchConfig } = options;
  const error = useSelector(getConfigurationsError);
  const isLoading = useSelector(areConfigurationsLoading);
  const isFetched = useSelector(areConfigurationsFetched);
  const configurations = useSelector(getConfigurations);
  const fetch = useAction(fetchConfigurations);
  const reset = useAction(resetConfigurationsState);

  useEffect(() => {
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch(fetchQuery, fetchConfig);
    }
  }, [
    enableAutoFetch,
    error,
    isFetched,
    isLoading,
    fetch,
    fetchQuery,
    fetchConfig,
  ]);

  return {
    isLoading,
    error,
    isFetched,
    data: configurations,
    actions: {
      fetch,
      reset,
    },
  };
};

export default useConfigurations;
