import {
  areProductGroupingPropertiesFetched,
  areProductGroupingPropertiesLoading,
  buildQueryStringFromObject,
  fetchProductGroupingProperties,
  getProductGroupingProperties,
  getProductGroupingPropertiesError,
  ProductEntity,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { UseProductGroupingPropertiesOptions } from './types';

const useProductGroupingProperties = (
  productId: ProductEntity['id'],
  options: UseProductGroupingPropertiesOptions = {},
) => {
  const { fetchConfig, enableAutoFetch = true, fetchQuery = {} } = options;
  const fetchAction = useAction(fetchProductGroupingProperties);

  const error = useSelector((state: StoreState) =>
    getProductGroupingPropertiesError(state, productId),
  );
  const isLoading = useSelector((state: StoreState) =>
    areProductGroupingPropertiesLoading(state, productId),
  );
  const isFetched = useSelector((state: StoreState) =>
    areProductGroupingPropertiesFetched(state, productId),
  );
  const queryString = fetchQuery && buildQueryStringFromObject(fetchQuery);
  const hash = queryString ? queryString : '!all';
  const productGroupingProperties = useSelector((state: StoreState) =>
    getProductGroupingProperties(state, productId, hash),
  );

  const shouldLoadProductGrouping =
    enableAutoFetch && !isLoading && !error && !productGroupingProperties;

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
