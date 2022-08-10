import {
  areProductAttributesFetched,
  areProductAttributesLoading,
  fetchProductAttributes,
  getProductAttributes,
  getProductAttributesError,
  ProductEntity,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { UseProductAttributesOptions } from './types';

const useProductAttributes = (
  productId: ProductEntity['id'],
  options: UseProductAttributesOptions = {},
) => {
  const { fetchConfig, enableAutoFetch = true } = options;
  const fetchAction = useAction(fetchProductAttributes);

  const error = useSelector((state: StoreState) =>
    getProductAttributesError(state, productId),
  );
  const isLoading = useSelector((state: StoreState) =>
    areProductAttributesLoading(state, productId),
  );
  const isFetched = useSelector((state: StoreState) =>
    areProductAttributesFetched(state, productId),
  );
  const productAttributes = useSelector((state: StoreState) =>
    getProductAttributes(state, productId),
  );

  const shouldLoadAttributes =
    enableAutoFetch && !isLoading && !error && !productAttributes;

  const fetch = useCallback(
    () => fetchAction(productId, fetchConfig),
    [fetchAction, fetchConfig, productId],
  );

  useEffect(() => {
    shouldLoadAttributes && fetch();
  }, [fetch, shouldLoadAttributes]);

  return {
    error,
    isFetched,
    isLoading,
    data: productAttributes,
    actions: {
      refetch: fetch,
    },
  };
};

export default useProductAttributes;
