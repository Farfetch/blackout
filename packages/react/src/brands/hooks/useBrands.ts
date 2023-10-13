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
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseBrandsOptions } from './types/useBrands.js';

const useBrands = (options: UseBrandsOptions = {}) => {
  const store = useStore();

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
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areBrandsLoading(updatedState, query);
    const updatedIsFetched = areBrandsFetched(updatedState, query);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(query, useCache, fetchConfig);
    }
  }, [fetchConfig, enableAutoFetch, fetch, store, query, useCache]);

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
