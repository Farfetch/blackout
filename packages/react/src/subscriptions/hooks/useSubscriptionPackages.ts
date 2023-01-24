import {
  areSubscriptionPackagesFetched,
  areSubscriptionPackagesLoading,
  buildSubscriptionPackagesHash,
  fetchSubscriptionPackages,
  getSubscriptionPackages,
  getSubscriptionPackagesError,
  resetSubscriptionPackages,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseSubscriptionPackagesOptions } from './types/useSubscriptionPackages.types.js';

function useSubscriptionPackages(
  packagesIds: string[],
  options: UseSubscriptionPackagesOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  const hash = useMemo(
    () => buildSubscriptionPackagesHash({ id: packagesIds }),
    [packagesIds],
  );
  const isLoading = useSelector((state: StoreState) =>
    areSubscriptionPackagesLoading(state, hash),
  );
  const error = useSelector((state: StoreState) =>
    getSubscriptionPackagesError(state, hash),
  );
  const isFetched = useSelector((state: StoreState) =>
    areSubscriptionPackagesFetched(state, hash),
  );
  const subscriptionPackages = useSelector((state: StoreState) =>
    getSubscriptionPackages(state, hash),
  );
  const fetch = useAction(fetchSubscriptionPackages);
  const reset = useAction(resetSubscriptionPackages);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch({ id: packagesIds }, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, packagesIds]);

  return {
    isLoading,
    error,
    isFetched,
    data: subscriptionPackages,
    actions: { fetch, reset },
  };
}

export default useSubscriptionPackages;
