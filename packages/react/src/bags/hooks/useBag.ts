/**
 * Hook to provide all kinds of data for the business logic attached to the bag.
 *
 * @module useBag
 * @category Bags
 * @subcategory Hooks
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
 * @memberof module:bags/hooks
 *
 * @returns {object} All the handlers, state, actions and relevant data needed
 * to manage any bag operation.
 */
const useBag: UseBag = () => {
  // Selectors
  const bag = useSelector(getBag);
  const bagId = useSelector(getBagId);
  const error = useSelector(getBagError);
  const isBagLoading = useSelector(isBagLoadingSelector);
  const isWithAnyError = useSelector(isBagWithAnyError);
  const items = useSelector(getBagItems);
  const itemsIds = useSelector(getBagItemsIds);
  const itemsUnavailable = useSelector(getBagItemsUnavailable);
  const hasItems = items?.length > 0;
  const isLoading = (!bag && !error) || isBagLoading;
  // Actions
  const fetchBag = useAction(fetchBagAction);
  const resetBag = useAction(resetBagAction);
  const resetBagState = useAction(resetBagStateAction);

  return {
    /**
     * Fetched bag.
     *
     * @type {object}
     */
    bag,
    /**
     * Bag identifier.
     *
     * @type {string}
     */
    bagId,
    /**
     * Bag error.
     *
     * @type {object|undefined}
     */
    error,
    /**
     * Fetches the bag.
     *
     * @type {Function}
     */
    fetchBag,
    /**
     * Whether the bag has any items.
     *
     * @type {boolean}
     */
    hasItems,
    /**
     * Whether the bag is loading.
     *
     * @type {boolean}
     */
    isLoading,
    /**
     * Whether the bag is with any error.
     *
     * @type {boolean}
     */
    isWithAnyError,
    /**
     * Bag items result.
     *
     * @type {Array}
     */
    items,
    /**
     * Bag items identifiers.
     *
     * @type {Array}
     */
    itemsIds,
    /**
     * Bag items that are unavailable.
     *
     * @type {Array}
     */
    itemsUnavailable,
    /**
     * Resets the bag.
     *
     * @type {Function}
     */
    resetBag,
    /**
     * Resets the bag state.
     *
     * @type {Function}
     */
    resetBagState,
  };
};

export default useBag;
