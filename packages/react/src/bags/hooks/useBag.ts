/**
 * Hook to provide all kinds of data for the business logic attached to the bag.
 */
import {
  fetchBag as fetchBagAction,
  getBag,
  getBagError,
  getBagId,
  getBagItems,
  getBagItemsIds,
  getBagItemsUnavailable,
  isBagLoading as isBagLoadingSelector,
  isBagWithAnyError,
  resetBag as resetBagAction,
  resetBagState as resetBagStateAction,
} from '@farfetch/blackout-redux/bags';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import type { UseBag } from './types';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * bag business logic.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any bag operation.
 */
const useBag: UseBag = () => {
  // Selectors
  const bag = useSelector(getBag);
  const error = useSelector(getBagError);
  const isBagLoading = useSelector(isBagLoadingSelector);
  const id = useSelector(getBagId);
  const isWithAnyError = useSelector(isBagWithAnyError);
  const items = useSelector(getBagItems);
  const itemsIds = useSelector(getBagItemsIds);
  const itemsUnavailable = useSelector(getBagItemsUnavailable);
  const isEmpty = items?.length === 0;
  const isLoading = (!bag && !error) || isBagLoading;
  // Actions
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
  };
};

export default useBag;
