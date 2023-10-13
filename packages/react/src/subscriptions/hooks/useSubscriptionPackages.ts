import {
  areSubscriptionPackagesFetched,
  areSubscriptionPackagesLoading,
  fetchSubscriptionPackages,
  getSubscriptionPackages,
  getSubscriptionPackagesError,
  resetSubscriptionPackages,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseSubscriptionPackagesOptions } from './types/useSubscriptionPackages.types.js';

function useSubscriptionPackages(
  packagesIds: string[],
  options: UseSubscriptionPackagesOptions = {},
) {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;
  const query = useMemo(() => ({ id: packagesIds }), [packagesIds]);

  const isLoading = useSelector((state: StoreState) =>
    areSubscriptionPackagesLoading(state, query),
  );
  const error = useSelector((state: StoreState) =>
    getSubscriptionPackagesError(state, query),
  );
  const isFetched = useSelector((state: StoreState) =>
    areSubscriptionPackagesFetched(state, query),
  );
  const subscriptionPackages = useSelector((state: StoreState) =>
    getSubscriptionPackages(state, query),
  );
  const fetch = useAction(fetchSubscriptionPackages);
  const reset = useAction(resetSubscriptionPackages);

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areSubscriptionPackagesLoading(
      updatedState,
      query,
    );
    const updatedIsFetched = areSubscriptionPackagesFetched(
      updatedState,
      query,
    );

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, query, store]);

  return {
    isLoading,
    error,
    isFetched,
    data: subscriptionPackages,
    actions: { fetch, reset },
  };
}

export default useSubscriptionPackages;
