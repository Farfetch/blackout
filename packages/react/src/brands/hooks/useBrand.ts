import {
  fetchBrand as fetchBrandAction,
  getBrand,
  getBrandError,
  isBrandFetched,
  isBrandLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Brand } from '@farfetch/blackout-client';
import type { UseBrandOptions } from './types/useBrand.js';

const useBrand = (brandId: Brand['id'], options: UseBrandOptions = {}) => {
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
    if (!isLoading && !isFetched && enableAutoFetch && brandId) {
      fetchBrand();
    }
  }, [brandId, enableAutoFetch, fetchBrand, isFetched, isLoading]);

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
