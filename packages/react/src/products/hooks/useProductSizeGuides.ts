import {
  areProductSizeGuidesFetched,
  areProductSizeGuidesLoading,
  fetchProductSizeGuides,
  getProductSizeGuides,
  getProductSizeGuidesError,
  type ProductEntity,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseProductSizeGuidesOptions } from './types/index.js';

const useProductSizeGuides = (
  productId: ProductEntity['id'],
  options: UseProductSizeGuidesOptions = {},
) => {
  const store = useStore();

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

  const fetch = useCallback(
    () => fetchAction(productId, fetchConfig),
    [fetchAction, fetchConfig, productId],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areProductSizeGuidesLoading(
      updatedState,
      productId,
    );

    if (enableAutoFetch && !updatedIsLoading && !productSizeGuides) {
      fetch();
    }
  }, [fetch, enableAutoFetch, store, productSizeGuides, productId]);

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
