import {
  areRecentlyViewedProductsFetched,
  areRecentlyViewedProductsLoading,
  fetchRecentlyViewedProducts,
  getRecentlyViewedProducts,
  getRecentlyViewedProductsError,
  getRecentlyViewedProductsPagination,
  removeRecentlyViewedProduct,
  saveRecentlyViewedProduct,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import useProductListing from './useProductListing.js';
import type { UseRecentlyViewedProductsOptions } from './types/index.js';

const useRecentlyViewedProducts = (
  options: UseRecentlyViewedProductsOptions = {},
) => {
  const store = useStore();

  const {
    excludeProductId,
    fetchQuery,
    enableAutoFetch = true,
    fetchConfig,
  } = options;
  const isLoading = useSelector(areRecentlyViewedProductsLoading);
  const isFetched = useSelector(areRecentlyViewedProductsFetched);
  const error = useSelector(getRecentlyViewedProductsError);
  const products = useSelector(getRecentlyViewedProducts);
  const pagination = useSelector(getRecentlyViewedProductsPagination);
  const fetch = useAction(fetchRecentlyViewedProducts);
  const remove = useAction(removeRecentlyViewedProduct);
  const save = useAction(saveRecentlyViewedProduct);

  const productIds = useMemo(
    () =>
      products
        ?.reduce((acc, product) => {
          if (!excludeProductId || product.productId !== excludeProductId) {
            acc.push(product.productId);
          }

          return acc;
        }, [] as number[])
        .join('|'),
    [excludeProductId, products],
  );

  const hasProducts = !!productIds;

  const {
    isLoading: isProductListingLoading,
    isFetched: isProductListingFetched,
    error: producListError,
    data: { items } = {},
  } = useProductListing('', {
    enableAutoFetch: hasProducts && enableAutoFetch,
    setProductsListHash: false,
    query: { id: productIds || ' ' },
  });

  hasProducts &&
    items?.sort(
      (a, b) =>
        productIds.indexOf(a.id.toString()) -
        productIds.indexOf(b.id.toString()),
    );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areRecentlyViewedProductsLoading(updatedState);
    const updatedIsFetched = areRecentlyViewedProductsFetched(updatedState);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(fetchQuery, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, fetchQuery, store]);

  return {
    isLoading: isLoading || !!isProductListingLoading,
    error: error || producListError,
    isFetched: isFetched || isProductListingFetched,
    data: {
      ...pagination,
      products: items,
    },
    actions: {
      fetch,
      remove,
      save,
    },
  };
};

export default useRecentlyViewedProducts;
