import {
  areBrandsFetched,
  areBrandsLoading,
  fetchBrands,
  getBrandsError,
  getBrandsResult,
  resetBrands,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseBrandsOptions } from './types/useBrands.js';

const useBrands = (options: UseBrandsOptions = {}) => {
  const { enableAutoFetch = true, query = {}, useCache, fetchConfig } = options;

  const isLoading = useSelector((state: StoreState) =>
    areBrandsLoading(state, query),
  );
  const isFetched = useSelector((state: StoreState) =>
    areBrandsFetched(state, query),
  );
  const result = useSelector((state: StoreState) =>
    getBrandsResult(state, query),
  );
  const error = useSelector((state: StoreState) =>
    getBrandsError(state, query),
  );
  const fetch = useAction(fetchBrands);
  const reset = useAction(resetBrands);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch(query, useCache, fetchConfig);
    }
  }, [
    fetchConfig,
    enableAutoFetch,
    fetch,
    isFetched,
    isLoading,
    query,
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
