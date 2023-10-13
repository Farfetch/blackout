import {
  fetchProductDetails,
  getProductDenormalized,
  getProductError,
  isProductFetched,
  isProductLoading,
  isProductOneSize,
  isProductOutOfStock,
  resetProductDetails,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { ProductId, UseProductDetailsOptions } from './types/index.js';

const useProductDetails = (
  productId: ProductId,
  options: UseProductDetailsOptions = {},
) => {
  const store = useStore();

  const {
    fetchQuery,
    fetchConfig,
    enableAutoFetch = true,
    fetchForceDispatch = false,
  } = options;

  const fetchAction = useAction(fetchProductDetails);
  const resetAction = useAction(resetProductDetails);
  const reset = useCallback(
    () => resetAction([productId]),
    [resetAction, productId],
  );

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
    getProductDenormalized(state, productId),
  );
  const isOutOfStock = useSelector((state: StoreState) =>
    isProductOutOfStock(state, productId),
  );
  const isOneSize = useSelector((state: StoreState) =>
    isProductOneSize(state, productId),
  );

  const refetch = useCallback(
    () => fetchAction(productId, fetchQuery, fetchForceDispatch, fetchConfig),
    [fetchAction, productId, fetchQuery, fetchForceDispatch, fetchConfig],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = isProductLoading(updatedState, productId);
    const updatedIsFetched = isProductFetched(updatedState, productId);

    if (enableAutoFetch && !updatedIsLoading && !updatedIsFetched) {
      fetchAction(productId, fetchQuery, fetchForceDispatch, fetchConfig);
    }
  }, [
    fetchAction,
    productId,
    fetchQuery,
    fetchConfig,
    fetchForceDispatch,
    enableAutoFetch,
    store,
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
