/**
 * Hook to provide all kinds of data for the business logic attached to the bag
 * items.
 */
import {
  getBagItem,
  getBagItemError,
  isBagItemLoading,
  StoreState,
} from '@farfetch/blackout-redux';
import { useBag } from './';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { BagItemId, HandleUpdateBagItem } from './types';
/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * bag items business logic.
 *
 * @param bagItemId - Bag item id to work on.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any bag item or product
 * bag-related operation.
 */
const useBagItem = (bagItemId: BagItemId) => {
  const {
    actions: { removeItem, updateItem },
  } = useBag();
  // Selectors
  const item = useSelector((state: StoreState) => getBagItem(state, bagItemId));
  const error = useSelector((state: StoreState) =>
    getBagItemError(state, bagItemId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isBagItemLoading(state, bagItemId),
  );

  const update: HandleUpdateBagItem = useCallback(
    data => updateItem(bagItemId, data),
    [updateItem, bagItemId],
  );

  const remove = useCallback(
    () => removeItem(bagItemId),
    [removeItem, bagItemId],
  );

  return {
    isLoading,
    error,
    isFetched: !!item,
    data: item,
    actions: {
      update,
      remove,
    },
  };
};

export default useBagItem;
