import {
  areProductGroupingPropertiesFetched,
  areProductGroupingPropertiesLoading,
  fetchProductGroupingProperties,
  getProductGroupingProperties,
  getProductGroupingPropertiesError,
  type ProductEntity,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseProductGroupingPropertiesOptions } from './types/index.js';

const useProductGroupingProperties = (
  productId: ProductEntity['id'],
  options: UseProductGroupingPropertiesOptions = {},
) => {
  const store = useStore();

  const { fetchConfig, enableAutoFetch = true, fetchQuery } = options;
  const fetchAction = useAction(fetchProductGroupingProperties);

  const error = useSelector((state: StoreState) =>
    getProductGroupingPropertiesError(state, productId, fetchQuery),
  );
  const isLoading = useSelector((state: StoreState) =>
    areProductGroupingPropertiesLoading(state, productId, fetchQuery),
  );
  const isFetched = useSelector((state: StoreState) =>
    areProductGroupingPropertiesFetched(state, productId, fetchQuery),
  );

  const productGroupingProperties = useSelector((state: StoreState) =>
    getProductGroupingProperties(state, productId, fetchQuery),
  );

  const fetch = useCallback(
    () => fetchAction(productId, fetchQuery, fetchConfig),
    [fetchAction, fetchConfig, productId, fetchQuery],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areProductGroupingPropertiesLoading(
      updatedState,
      productId,
      fetchQuery,
    );
    const updatedIsFetched = areProductGroupingPropertiesFetched(
      updatedState,
      productId,
      fetchQuery,
    );

    if (enableAutoFetch && !updatedIsLoading && !updatedIsFetched) {
      fetch();
    }
  }, [fetch, enableAutoFetch, store, productId, fetchQuery]);

  return {
    error,
    isFetched,
    isLoading,
    data: productGroupingProperties,
    actions: {
      refetch: fetch,
    },
  };
};

export default useProductGroupingProperties;
