import {
  areProductAttributesFetched,
  areProductAttributesLoading,
  fetchProductAttributes,
  getProductAttributes,
  getProductAttributesError,
  type ProductEntity,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseProductAttributesOptions } from './types/index.js';

const useProductAttributes = (
  productId: ProductEntity['id'],
  options: UseProductAttributesOptions = {},
) => {
  const store = useStore();

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

  const fetch = useCallback(
    () => fetchAction(productId, fetchConfig),
    [fetchAction, fetchConfig, productId],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areProductAttributesLoading(
      updatedState,
      productId,
    );

    if (enableAutoFetch && !updatedIsLoading && !productAttributes) {
      fetch();
    }
  }, [fetch, productAttributes, enableAutoFetch, store, productId]);

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
