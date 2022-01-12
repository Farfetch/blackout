/**
 * Hook to provide all kinds of data for the business logic attached to the product details.
 *
 * @module useProductDetails
 * @category Products
 * @subcategory Hooks
 */
import {
  fetchProductDetails as fetchProductDetailsAction,
  getAllProductSizesRemainingQuantity,
  getProductBreadcrumbs,
  getProductError,
  getProductGroupedEntries,
  isProductDuplicated,
  isProductFetched,
  isProductHydrated,
  isProductLoading,
} from '@farfetch/blackout-redux/products';
import {
  getProduct,
  getProductLabelsByPriority,
  getProductPromotions,
  isProductOneSize,
  isProductOutOfStock,
} from '@farfetch/blackout-redux/entities';
import { isProductInBag } from '@farfetch/blackout-redux/bags';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { StoreState } from '@farfetch/blackout-redux/src/types';
import type { UseProductDetails } from './types';

/**
 * Provides state access for dealing with product details business logic.
 * Also it fetches product details if there are none.
 *
 * @param {number} id - Product id to work on.
 *
 * @memberof module:products/hooks
 * @returns {object} All the state needed to manage any product details information.
 */
const useProductDetails: UseProductDetails = id => {
  const fetchProductDetails = useAction(fetchProductDetailsAction);
  const breadcrumbs = useSelector((state: StoreState) =>
    getProductBreadcrumbs(state, id),
  );
  const error = useSelector((state: StoreState) => getProductError(state, id));
  const groupedEntries = useSelector((state: StoreState) =>
    getProductGroupedEntries(state, id),
  );
  const isDuplicated = useSelector((state: StoreState) =>
    isProductDuplicated(state, id),
  );
  const isFetched = useSelector((state: StoreState) =>
    isProductFetched(state, id),
  );
  const isHydrated = useSelector((state: StoreState) =>
    isProductHydrated(state, id),
  );
  const isInBag = useSelector((state: StoreState) => isProductInBag(state, id));
  const isLoading = useSelector((state: StoreState) =>
    isProductLoading(state, id),
  );
  const isOneSize = useSelector((state: StoreState) =>
    isProductOneSize(state, id),
  );
  const isOutOfStock = useSelector((state: StoreState) =>
    isProductOutOfStock(state, id),
  );
  const labelsPrioritized = useSelector((state: StoreState) =>
    getProductLabelsByPriority(state, id),
  );
  const product = useSelector((state: StoreState) => getProduct(state, id));
  const promotions = useSelector((state: StoreState) =>
    getProductPromotions(state, id),
  );
  const availableSizes = useSelector((state: StoreState) =>
    getAllProductSizesRemainingQuantity(state, id),
  );

  useEffect(() => {
    !isFetched && fetchProductDetails(id);
  }, [fetchProductDetails, id, isFetched]);

  return {
    /**
     * The available sizes for the given product.
     *
     * @type {Array}
     */
    availableSizes,
    /**
     * Product breadcrumbs.
     *
     * @type {Array|undefined}
     */
    breadcrumbs,
    /**
     * Error state of the fetched product details.
     *
     * @type {object|undefined}
     */
    error,
    /**
     * Product grouped entries.
     *
     * @type {Array|undefined}
     */
    groupedEntries,
    /**
     * Whether the product is duplicated.
     *
     * @type {boolean|undefined}
     */
    isDuplicated,
    /**
     * Whether the product has been fetched.
     *
     * @type {boolean}
     */
    isFetched,
    /**
     * Whether the product has been hydrated.
     *
     * @type {boolean|undefined}
     */
    isHydrated,
    /**
     * Whether the product is in the bag.
     *
     * @type {boolean}
     */
    isInBag,
    /**
     * Whether the product is loading.
     *
     * @type {boolean|undefined}
     */
    isLoading,
    /**
     * Whether the product has only one size.
     *
     * @type {boolean|undefined}
     */
    isOneSize,
    /**
     * Whether the product is out of stock.
     *
     * @type {boolean|undefined}
     */
    isOutOfStock,
    /**
     * Product labels on an ascended order.
     *
     * @type {Array}
     */
    labelsPrioritized,
    /**
     * The product itself.
     *
     * @type {object|undefined}
     */
    product,
    /**
     * Product promotions.
     *
     * @type {Array}
     */
    promotions,
  };
};

export default useProductDetails;
