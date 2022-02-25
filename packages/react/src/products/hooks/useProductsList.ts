/**
 * Hook to provide all kinds of data for the business logic attached to a product list.
 *
 * @module useProductsList
 * @category Products
 * @subcategory Hooks
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
 * @param {object} props - Object containing the necessary info to use inside the hook.
 * @param {string} [props.slug] - The slug of the given product list.
 * @param {Object} [props.query] - The query parameters of the given product list.
 * @param {string} [props.type='listing'] - Listing type ('listing' or 'set').
 * @param {boolean} [props.useCache=true] - To use cache when fetching a product list.
 * @param {boolean} [props.setProductsListHash=true] - Wether to set the reducer's hash on the store when requesting a product list.
 *
 * @returns {Object} All the info needed to get listing results and information.
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
     *
     * @type {object|undefined}
     */
    error,
    /**
     * Whether the product list is fetched.
     *
     * @type {boolean|undefined}
     */
    isFetched,
    /**
     * Whether the product list is loading.
     *
     * @type {boolean|undefined}
     */
    isLoading,
    /**
     * The hash of the product list.
     *
     * @type {string}
     */
    productsListHash,
    /**
     * Array of products that belong to the product list.
     *
     * @type {Array}
     */
    products,
    /**
     * Information about the fetched product list.
     *
     * @type {Object}
     */
    result,
  };
};

export default useProductsList;
