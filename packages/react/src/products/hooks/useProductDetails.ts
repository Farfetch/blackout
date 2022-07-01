/**
 * Hook to provide all kinds of data for the business logic attached to the product
 * details.
 */
import {
  fetchProductDetails as fetchProductDetailsAction,
  getAllProductSizesRemainingQuantity,
  getProduct,
  getProductBreadcrumbs,
  getProductError,
  getProductGroupedEntries,
  getProductLabelsByPriority,
  getProductPromotions,
  isProductDuplicated,
  isProductFetched,
  isProductHydrated,
  isProductInBag,
  isProductLoading,
  isProductOneSize,
  isProductOutOfStock,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { UseProductDetails } from './types';

/**
 * Provides state access for dealing with product details business logic. Also it
 * fetches product details if there are none.
 *
 * @param id - Product id to work on.
 *
 * @returns All the state needed to manage any product details information.
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
     */
    availableSizes,
    /**
     * Product breadcrumbs.
     */
    breadcrumbs,
    /**
     * Error state of the fetched product details.
     */
    error,
    /**
     * Product grouped entries.
     */
    groupedEntries,
    /**
     * Whether the product is duplicated.
     */
    isDuplicated,
    /**
     * Whether the product has been fetched.
     */
    isFetched,
    /**
     * Whether the product has been hydrated.
     */
    isHydrated,
    /**
     * Whether the product is in the bag.
     */
    isInBag,
    /**
     * Whether the product is loading.
     */
    isLoading,
    /**
     * Whether the product has only one size.
     */
    isOneSize,
    /**
     * Whether the product is out of stock.
     */
    isOutOfStock,
    /**
     * Product labels on an ascended order.
     */
    labelsPrioritized,
    /**
     * The product itself.
     */
    product,
    /**
     * Product promotions.
     */
    promotions,
  };
};

export default useProductDetails;
