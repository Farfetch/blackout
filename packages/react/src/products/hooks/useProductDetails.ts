import {
  fetchProductDetails,
  getProduct,
  getProductError,
  isProductFetched,
  isProductLoading,
  isProductOneSize,
  isProductOutOfStock,
  resetProductDetails,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { ProductId, UseProductDetailsOptions } from './types';

const useProductDetails = (
  productId: ProductId,
  options: UseProductDetailsOptions = {},
) => {
  const {
    fetchQuery,
    fetchConfig,
    enableAutoFetch = true,
    fetchForceDispatch = false,
  } = options;

  const fetch = useAction(fetchProductDetails);
  const reset = useAction(resetProductDetails);

  const error = useSelector((state: StoreState) =>
    getProductError(state, productId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isProductLoading(state, productId),
  );
  const isFetched = useSelector((state: StoreState) =>
    isProductFetched(state, productId),
  );
  const product = useSelector((state: StoreState) =>
    getProduct(state, productId),
  );
  const isOutOfStock = useSelector((state: StoreState) =>
    isProductOutOfStock(state, productId),
  );
  const isOneSize = useSelector((state: StoreState) =>
    isProductOneSize(state, productId),
  );

  const refetch = useCallback(
    () => fetch(productId, fetchQuery, fetchForceDispatch, fetchConfig),
    [fetch, productId, fetchQuery, fetchForceDispatch, fetchConfig],
  );

  const shouldLoadDetails = enableAutoFetch && !isLoading && !error && !product;

  useEffect(() => {
    shouldLoadDetails &&
      fetch(productId, fetchQuery, fetchForceDispatch, fetchConfig);
  }, [
    fetch,
    productId,
    fetchQuery,
    fetchConfig,
    shouldLoadDetails,
    fetchForceDispatch,
  ]);

  return {
    error,
    isFetched,
    isLoading,
    data: !!product
      ? {
          ...product,
          isOneSize,
          isOutOfStock,
        }
      : undefined,
    actions: {
      reset,
      refetch,
    },
  };
};

export default useProductDetails;
