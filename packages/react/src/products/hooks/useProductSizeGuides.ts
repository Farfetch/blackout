import {
  areProductSizeGuidesFetched,
  areProductSizeGuidesLoading,
  fetchProductSizeGuides,
  getProductSizeGuides,
  getProductSizeGuidesError,
  ProductEntity,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { UseProductSizeGuidesOptions } from './types';

const useProductSizeGuides = (
  productId: ProductEntity['id'],
  options: UseProductSizeGuidesOptions = {},
) => {
  const { fetchConfig, enableAutoFetch = true } = options;
  const fetchAction = useAction(fetchProductSizeGuides);

  const error = useSelector((state: StoreState) =>
    getProductSizeGuidesError(state, productId),
  );
  const isLoading = useSelector((state: StoreState) =>
    areProductSizeGuidesLoading(state, productId),
  );
  const isFetched = useSelector((state: StoreState) =>
    areProductSizeGuidesFetched(state, productId),
  );
  const productSizeGuides = useSelector((state: StoreState) =>
    getProductSizeGuides(state, productId),
  );

  const shouldLoadSizeGuides =
    enableAutoFetch && !isLoading && !error && !productSizeGuides;

  const fetch = useCallback(
    () => fetchAction(productId, fetchConfig),
    [fetchAction, fetchConfig, productId],
  );

  useEffect(() => {
    shouldLoadSizeGuides && fetch();
  }, [fetch, shouldLoadSizeGuides]);

  return {
    error,
    isFetched,
    isLoading,
    data: productSizeGuides,
    actions: {
      refetch: fetch,
    },
  };
};

export default useProductSizeGuides;
