import {
  areConfigurationsFetched,
  areConfigurationsLoading,
  fetchConfigurations,
  getConfigurations,
  getConfigurationsError,
  resetConfigurations,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseConfigurationsOptions } from './types/index.js';

const useConfigurations = (options: UseConfigurationsOptions = {}) => {
  const store = useStore();

  const { enableAutoFetch = true, fetchQuery, fetchConfig } = options;
  const error = useSelector(getConfigurationsError);
  const isLoading = useSelector(areConfigurationsLoading);
  const isFetched = useSelector(areConfigurationsFetched);
  const configurations = useSelector(getConfigurations);
  const fetch = useAction(fetchConfigurations);
  const reset = useAction(resetConfigurations);

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areConfigurationsLoading(updatedState);
    const updatedIsFetched = areConfigurationsFetched(updatedState);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(fetchQuery, fetchConfig);
    }
  }, [
    enableAutoFetch,
    isFetched,
    isLoading,
    fetch,
    fetchQuery,
    fetchConfig,
    store,
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
