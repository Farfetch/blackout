import {
  fetchBrand as fetchBrandAction,
  getBrand,
  getBrandError,
  isBrandFetched,
  isBrandLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Brand } from '@farfetch/blackout-client';
import type { UseBrandOptions } from './types/useBrand.js';

const useBrand = (brandId: Brand['id'], options: UseBrandOptions = {}) => {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;

  const isLoading = useSelector((state: StoreState) =>
    isBrandLoading(state, brandId),
  );
  const isFetched = useSelector((state: StoreState) =>
    isBrandFetched(state, brandId),
  );
  const error = useSelector((state: StoreState) =>
    getBrandError(state, brandId),
  );
  const brand = useSelector((state: StoreState) => getBrand(state, brandId));
  const fetch = useAction(fetchBrandAction);
  const fetchBrand = useCallback(
    () => fetch(brandId, fetchConfig),
    [fetchConfig, fetch, brandId],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = isBrandLoading(updatedState, brandId);
    const updatedIsFetched = isBrandFetched(updatedState, brandId);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch && brandId) {
      fetchBrand();
    }
  }, [brandId, enableAutoFetch, fetchBrand, store]);

  return {
    isLoading,
    error,
    isFetched,
    data: brand,
    actions: {
      fetch: fetchBrand,
    },
  };
};

export default useBrand;
