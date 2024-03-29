/**
 * Hook to provide all kinds of data for the business logic attached to the bag
 * items.
 */
import {
  type BagItemActionMetadata,
  getBagItem,
  getBagItemError,
  isBagItemFetched,
  isBagItemLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useBag } from './/index.js';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { BagItemId, HandleUpdateBagItemData } from './types/index.js';
import type { Config } from '@farfetch/blackout-client';

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
  const isFetched = useSelector((state: StoreState) =>
    isBagItemFetched(state, bagItemId),
  );

  const update = useCallback(
    (
      data: HandleUpdateBagItemData,
      metadata?: BagItemActionMetadata,
      config?: Config,
    ) => updateItem(bagItemId, data, metadata, config),
    [updateItem, bagItemId],
  );

  const remove = useCallback(
    (metadata?: BagItemActionMetadata, config?: Config) =>
      removeItem(bagItemId, undefined, metadata, config),
    [removeItem, bagItemId],
  );

  return {
    isLoading,
    error,
    isFetched,
    data: item,
    actions: {
      update,
      remove,
    },
  };
};

export default useBagItem;
