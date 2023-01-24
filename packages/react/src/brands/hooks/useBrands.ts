import {
  areBrandsFetched,
  areBrandsLoading,
  fetchBrands,
  generateBrandsHash,
  getBrandsError,
  getBrandsResult,
  resetBrandsState,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseBrandsOptions } from './types/useBrands.js';

const useBrands = (options: UseBrandsOptions = {}) => {
  const {
    enableAutoFetch = true,
    query,
    useCache,
    setBrandsHash,
    fetchConfig,
  } = options;

  const hash = useMemo(
    () => (query ? generateBrandsHash(query) : undefined),
    [query],
  );

  const isLoading = useSelector((state: StoreState) =>
    areBrandsLoading(state, hash),
  );
  const isFetched = useSelector((state: StoreState) =>
    areBrandsFetched(state, hash),
  );
  const result = useSelector((state: StoreState) =>
    getBrandsResult(state, hash),
  );
  const error = useSelector((state: StoreState) => getBrandsError(state, hash));
  const fetch = useAction(fetchBrands);
  const reset = useAction(resetBrandsState);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch(query, useCache, setBrandsHash, fetchConfig);
    }
  }, [
    fetchConfig,
    enableAutoFetch,
    fetch,
    isFetched,
    isLoading,
    query,
    setBrandsHash,
    useCache,
  ]);

  return {
    isLoading,
    error,
    isFetched,
    data: result,
    actions: {
      fetch,
      reset,
    },
  };
};

export default useBrands;
