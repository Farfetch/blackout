import {
  fetchProductListing,
  fetchProductSet,
  generateProductListingHash,
  getProductListingError,
  getProductListingFacetGroups,
  getProductListingPagination,
  getProductListingProducts,
  getProductListingResult,
  isProductListingFetched,
  isProductListingLoading,
  resetProductsLists,
  type StoreState,
} from '@farfetch/blackout-redux';
import {
  isSet,
  ProductListingTypes,
  type Slug,
  type UseProductListingOptions,
} from './types/index.js';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';

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
  const productListingHash = generateProductListingHash(slug, query, {
    isSet: isSetPage,
  });

  const fetchListingAction = useAction(fetchProductListing);
  const fetchSetAction = useAction(fetchProductSet);
  const resetAction = useAction(resetProductsLists);
  const reset = useCallback(() => {
    resetAction([productListingHash]);
  }, [resetAction, productListingHash]);

  const isLoading = useSelector((state: StoreState) =>
    isProductListingLoading(state, productListingHash),
  );
  const error = useSelector((state: StoreState) =>
    getProductListingError(state, productListingHash),
  );
  const isFetched = useSelector((state: StoreState) =>
    isProductListingFetched(state, productListingHash),
  );
  const listing = useSelector((state: StoreState) =>
    getProductListingResult(state, productListingHash),
  );
  const pagination = useSelector((state: StoreState) =>
    getProductListingPagination(state, productListingHash),
  );
  const products = useSelector((state: StoreState) =>
    getProductListingProducts(state, productListingHash),
  );
  const facetGroups = useSelector((state: StoreState) =>
    getProductListingFacetGroups(state, productListingHash),
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

  const shouldLoadListing =
    enableAutoFetch && !isLoading && !isFetched && !listing;

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
          facetGroups,
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
