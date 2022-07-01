/**
 * Hook to provide all kinds of data for the business logic attached to the bag.
 */
import {
  addBagItem as addBagItemAction,
  fetchBag as fetchBagAction,
  getBag,
  getBagError,
  getBagId,
  getBagItems,
  getBagItemsCounter,
  getBagItemsIds,
  getBagItemsUnavailable,
  getBagTotalQuantity,
  isBagLoading as isBagLoadingSelector,
  isBagWithAnyError,
  resetBag as resetBagAction,
  resetBagState as resetBagStateAction,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import type { UseBag } from './types';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * bag business logic.
 *
 * @param excludeProductTypes - List of product types to exclude from the counters.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any bag operation.
 */
const useBag: UseBag = excludeProductTypes => {
  // Selectors
  const bag = useSelector(getBag);
  const error = useSelector(getBagError);
  const isBagLoading = useSelector(isBagLoadingSelector);
  const id = useSelector(getBagId);
  const isWithAnyError = useSelector(isBagWithAnyError);
  const items = useSelector(getBagItems);
  const itemsIds = useSelector(getBagItemsIds);
  const itemsUnavailable = useSelector(getBagItemsUnavailable);
  const itemsCount = useSelector((state: StoreState) =>
    getBagItemsCounter(state, excludeProductTypes),
  );
  const totalQuantity = useSelector((state: StoreState) =>
    getBagTotalQuantity(state, excludeProductTypes),
  );
  const isEmpty = items?.length === 0;
  const isLoading = (!bag && !error) || isBagLoading;
  // Actions
  const addBagItem = useAction(addBagItemAction);
  const fetchBag = useAction(fetchBagAction);
  const resetBag = useAction(resetBagAction);
  const resetBagState = useAction(resetBagStateAction);

  return {
    /**
     * Fetched bag.
     */
    bag,
    /**
     * Bag error.
     */
    error,
    /**
     * Add item to bag.
     */
    addBagItem,
    /**
     * Fetches the bag.
     */
    fetchBag,
    /**
     * Whether the bag is empty (doesn't have items).
     */
    id,
    /**
     * Whether the bag is loading.
     */
    isEmpty,
    /**
     * Bag identifier.
     */
    isLoading,
    /**
     * Whether the bag is with any error.
     */
    isWithAnyError,
    /**
     * Bag items result.
     */
    items,
    /**
     * Count of the items in the bag.
     */
    itemsCount,
    /**
     * Bag items identifiers.
     */
    itemsIds,
    /**
     * Bag items that are unavailable.
     */
    itemsUnavailable,
    /**
     * Resets the bag.
     */
    resetBag,
    /**
     * Resets the bag state.
     */
    resetBagState,
    /**
     * Total quantity of products in the bag.
     */
    totalQuantity,
  };
};

export default useBag;
