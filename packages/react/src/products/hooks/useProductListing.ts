import {
  fetchProductListing,
  fetchProductSet,
  generateProductsListHash,
  getProductsListError,
  getProductsListPagination,
  getProductsListProducts,
  getProductsListResult,
  isProductsListFetched,
  isProductsListLoading,
  resetProductsLists,
  StoreState,
} from '@farfetch/blackout-redux';
import {
  isSet,
  ProductListingTypes,
  Slug,
  UseProductListingOptions,
} from './types';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';

const useProductListing = (
  slug: Slug,
  options: UseProductListingOptions = { type: ProductListingTypes.Listing },
) => {
  const {
    query,
    fetchConfig,
    useCache = true,
    setProductsListHash,
    enableAutoFetch = true,
  } = options;

  const isSetPage = isSet(options);
  const productListingHash = generateProductsListHash(slug, query, {
    isSet: isSetPage,
  });

  const fetchListingAction = useAction(fetchProductListing);
  const fetchSetAction = useAction(fetchProductSet);
  const resetAction = useAction(resetProductsLists);
  const reset = useCallback(() => {
    resetAction([productListingHash]);
  }, [resetAction, productListingHash]);

  const isLoading = useSelector((state: StoreState) =>
    isProductsListLoading(state, productListingHash),
  );
  const error = useSelector((state: StoreState) =>
    getProductsListError(state, productListingHash),
  );
  const isFetched = useSelector((state: StoreState) =>
    isProductsListFetched(state, productListingHash),
  );
  const listing = useSelector((state: StoreState) =>
    getProductsListResult(state, productListingHash),
  );
  const pagination = useSelector((state: StoreState) =>
    getProductsListPagination(state, productListingHash),
  );
  const products = useSelector((state: StoreState) =>
    getProductsListProducts(state, productListingHash),
  );

  const fetch = useCallback(
    () =>
      isSetPage
        ? fetchSetAction(
            slug,
            options.query,
            { useCache, setProductsListHash },
            fetchConfig,
          )
        : fetchListingAction(
            slug,
            options.query,
            { useCache, setProductsListHash },
            fetchConfig,
          ),
    [
      fetchConfig,
      fetchListingAction,
      fetchSetAction,
      isSetPage,
      options.query,
      setProductsListHash,
      slug,
      useCache,
    ],
  );

  const shouldLoadListing = enableAutoFetch && !isLoading && !error && !listing;

  useEffect(() => {
    shouldLoadListing && fetch();
  }, [fetch, shouldLoadListing]);

  return {
    error,
    isFetched,
    isLoading,
    data: !!listing
      ? {
          ...listing,
          pagination,
          hash: productListingHash,
          items: products,
        }
      : undefined,
    actions: {
      reset,
      refetch: fetch,
    },
  };
};

export default useProductListing;