/**
 * Hook to provide all kinds of data for the business logic attached to a product
 * list.
 */
import {
  fetchListing,
  fetchSet,
  generateProductsListHash,
  GetOptionsArgument,
  getProductsListError,
  getProductsListProducts,
  getProductsListResult,
  isProductsListFetched,
  isProductsListLoading,
  StoreState,
} from '@farfetch/blackout-redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import type { Dispatch } from 'redux';
import type {
  GetProductListingQuery,
  GetProductSetQuery,
} from '@farfetch/blackout-client';
import type {
  ProductsListTypes,
  UseProductsList,
} from './types/useProductsList';

const PRODUCTS_LIST_TYPES: ProductsListTypes = {
  LISTING: 'listing',
  SET: 'set',
};

type Thunk = (
  dispatch: Dispatch,
  getState: () => StoreState,
  options: GetOptionsArgument,
) => unknown;

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
  const dispatch = useDispatch() as (thunk: Thunk) => void;
  const productsListHash = generateProductsListHash(slug, query, {
    isSet: isSetPage,
  });
  const error = useSelector((state: StoreState) =>
    getProductsListError(state, productsListHash),
  );
  const isLoading = useSelector((state: StoreState) =>
    isProductsListLoading(state, productsListHash),
  );
  const result = useSelector((state: StoreState) =>
    getProductsListResult(state, productsListHash),
  );
  const products = useSelector((state: StoreState) =>
    getProductsListProducts(state, productsListHash),
  );
  const isFetched = useSelector((state: StoreState) =>
    isProductsListFetched(state, productsListHash),
  );

  useEffect(() => {
    if (slug !== undefined) {
      dispatch(
        isSetPage
          ? fetchSet(slug, query as GetProductSetQuery, {
              useCache,
              setProductsListHash,
            })
          : fetchListing(slug, query as GetProductListingQuery, {
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
