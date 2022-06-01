/**
 * Hook to provide all kinds of data for the business logic attached to a product
 * list.
 */
import {
  fetchListing,
  fetchSet,
  getProductsListError,
  getProductsListProducts,
  getProductsListResult,
  isProductsListFetched,
  isProductsListLoading,
} from '@farfetch/blackout-redux/products';
import { generateProductsListHash } from '@farfetch/blackout-redux/products/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type {
  ListingQuery,
  SetQuery,
} from '@farfetch/blackout-client/products/types';
import type {
  ProductsListTypes,
  UseProductsList,
} from './types/useProductsList';

const PRODUCTS_LIST_TYPES: ProductsListTypes = {
  LISTING: 'listing',
  SET: 'set',
};

/**
 * Hook to handle listing logic.
 *
 * @param props - Object containing the necessary info to use inside the hook.
 *
 * @returns All the info needed to get listing results and information.
 */
const useProductsList: UseProductsList = ({
  query,
  setProductsListHash = true,
  slug,
  type = PRODUCTS_LIST_TYPES.LISTING,
  useCache = true,
}) => {
  const isSetPage = type === PRODUCTS_LIST_TYPES.SET;
  const dispatch = useDispatch();
  const productsListHash = generateProductsListHash(slug, query, {
    isSet: isSetPage,
  });
  const error = useSelector(state =>
    getProductsListError(state, productsListHash),
  );
  const isLoading = useSelector(state =>
    isProductsListLoading(state, productsListHash),
  );
  const result = useSelector(state =>
    getProductsListResult(state, productsListHash),
  );
  const products = useSelector(state =>
    getProductsListProducts(state, productsListHash),
  );
  const isFetched = useSelector(state =>
    isProductsListFetched(state, productsListHash),
  );

  useEffect(() => {
    if (slug !== undefined) {
      dispatch(
        isSetPage
          ? fetchSet(slug, query as SetQuery, { useCache, setProductsListHash })
          : fetchListing(slug, query as ListingQuery, {
              useCache,
              setProductsListHash,
            }),
      );
    }
  }, [dispatch, isSetPage, query, setProductsListHash, slug, useCache]);

  return {
    /**
     * Error state of a product list.
     */
    error,
    /**
     * Whether the product list is fetched.
     */
    isFetched,
    /**
     * Whether the product list is loading.
     */
    isLoading,
    /**
     * The hash of the product list.
     */
    productsListHash,
    /**
     * Array of products that belong to the product list.
     */
    products,
    /**
     * Information about the fetched product list.
     */
    result,
  };
};

export default useProductsList;
