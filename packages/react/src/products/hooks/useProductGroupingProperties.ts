import {
  areProductGroupingPropertiesFetched,
  areProductGroupingPropertiesLoading,
  buildQueryStringFromObject,
  fetchProductGroupingProperties,
  getProductGroupingProperties,
  getProductGroupingPropertiesError,
  type ProductEntity,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseProductGroupingPropertiesOptions } from './types/index.js';

const useProductGroupingProperties = (
  productId: ProductEntity['id'],
  options: UseProductGroupingPropertiesOptions = {},
) => {
  const { fetchConfig, enableAutoFetch = true, fetchQuery } = options;
  const fetchAction = useAction(fetchProductGroupingProperties);
  const queryString = fetchQuery && buildQueryStringFromObject(fetchQuery);
  const hash = queryString ? queryString : '!all';

  const error = useSelector((state: StoreState) =>
    getProductGroupingPropertiesError(state, productId, hash),
  );
  const isLoading = useSelector((state: StoreState) =>
    areProductGroupingPropertiesLoading(state, productId, hash),
  );
  const isFetched = useSelector((state: StoreState) =>
    areProductGroupingPropertiesFetched(state, productId, hash),
  );

  const productGroupingProperties = useSelector((state: StoreState) =>
    getProductGroupingProperties(state, productId, hash),
  );

  const shouldLoadProductGrouping = enableAutoFetch && !isLoading && !isFetched;

  const fetch = useCallback(
    () => fetchAction(productId, fetchQuery, fetchConfig),
    [fetchAction, fetchConfig, productId, fetchQuery],
  );

  useEffect(() => {
    shouldLoadProductGrouping && fetch();
  }, [fetch, shouldLoadProductGrouping]);

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
