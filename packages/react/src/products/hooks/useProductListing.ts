import {
  fetchCustomListing,
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
  resetProductListings,
  type StoreState,
} from '@farfetch/blackout-redux';
import {
  ProductListingType,
  type Slug,
  type UseProductListingOptions,
  type UseProductListingTypeSetOptions,
} from './types/index.js';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';

const isUseProductListingTypeSetOptions = (
  options: UseProductListingOptions,
): options is UseProductListingTypeSetOptions =>
  options.type === ProductListingType.Set;

const useProductListing = (
  slug: Slug,
  options: UseProductListingOptions = { type: ProductListingType.Listing },
) => {
  const store = useStore();

  const {
    query,
    fetchConfig,
    useCache = true,
    setProductsListHash,
    enableAutoFetch = true,
    isCustomListingPage = false,
  } = options;

  const isSetPage = isUseProductListingTypeSetOptions(options);
  const productListingHash = generateProductListingHash(slug, query, {
    isSet: isSetPage,
    isCustomListingPage,
  });

  const fetchListingAction = useAction(fetchProductListing);
  const fetchSetAction = useAction(fetchProductSet);
  const fetchCustomListingAction = useAction(fetchCustomListing);
  const resetAction = useAction(resetProductListings);
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
        : isCustomListingPage
        ? fetchCustomListingAction(
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
      isCustomListingPage,
      fetchCustomListingAction,
    ],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = isProductListingLoading(
      updatedState,
      productListingHash,
    );
    const updatedIsFetched = isProductListingFetched(
      updatedState,
      productListingHash,
    );

    if (enableAutoFetch && !updatedIsLoading && !updatedIsFetched && !listing) {
      fetch();
    }
  }, [fetch, enableAutoFetch, store, productListingHash, listing]);

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
