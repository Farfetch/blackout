/**
 * Hook to provide all kinds of data for the business logic attached to the bag.
 */
import {
  addBagItem as addBagItemAction,
  BagItemActionMetadata,
  BagItemHydrated,
  buildBagItem,
  fetchBag as fetchBagAction,
  generateBagItemHash,
  getBag,
  getBagError,
  getBagItems,
  getProductDenormalized,
  isBagFetched,
  isBagLoading,
  removeBagItem as removeBagItemAction,
  resetBag as resetBagAction,
  SizeAdapted,
  StoreState,
  updateBagItem as updateBagItemAction,
} from '@farfetch/blackout-redux';
import {
  AddUpdateItemBagError,
  BagItemNotFoundError,
  ProductError,
  SizeError,
} from './errors';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { HandleAddOrUpdateItem, UseBagOptions } from './types';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * bag business logic.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any bag operation.
 */
const useBag = (options: UseBagOptions = {}) => {
  const { enableAutoFetch = false, fetchQuery, fetchConfig } = options;
  const { getState } = useStore<StoreState>();
  // Selectors
  const bag = useSelector(getBag);
  const error = useSelector(getBagError);
  const isLoading = useSelector(isBagLoading);
  const items = useSelector(getBagItems);
  const count = bag?.count;
  const isEmpty = count === 0;
  const isFetched = useSelector(isBagFetched);
  // Actions
  const addBagItem = useAction(addBagItemAction);
  const updateBagItem = useAction(updateBagItemAction);
  const removeItem = useAction(removeBagItemAction);
  const fetch = useAction(fetchBagAction);
  const reset = useAction(resetBagAction);

  useEffect(() => {
    if (!isLoading && !error && enableAutoFetch && bag?.id) {
      fetch(bag.id, fetchQuery, fetchConfig);
    }
  }, [
    bag?.id,
    enableAutoFetch,
    error,
    fetch,
    fetchConfig,
    fetchQuery,
    isLoading,
  ]);

  const handleAddOrUpdateItem: HandleAddOrUpdateItem = useCallback(
    async (
      { customAttributes, product, productAggregatorId, quantity, size },
      metadata,
    ) => {
      let quantityToHandle = quantity;

      // Throw an error to indicate for the consumer that nothing
      // will be done.
      if (!size?.stock) {
        throw new AddUpdateItemBagError(-1);
      }

      // Iterate through the stock of different merchants
      for (const { merchantId, quantity: merchantQuantity } of size.stock) {
        // If there is no quantity on this merchant jump to the next one
        if (merchantQuantity === 0) {
          continue;
        }

        // The quantity we want to add might be limited by the merchant stock
        const quantityToAdd = Math.min(quantityToHandle, merchantQuantity);
        // Format the data to send to the request
        const requestData = buildBagItem({
          customAttributes,
          merchantId,
          product,
          productAggregatorId,
          quantity: quantityToAdd,
          size,
        });
        // Checks if the item we want to add is already in bag
        // by comparing the bag items' hash
        const hash = generateBagItemHash(requestData);

        const itemInBag = items?.find(
          item => generateBagItemHash(item) === hash,
        );

        // When the item is in bag, we update its quantity
        if (itemInBag) {
          const newQuantity = quantityToAdd + itemInBag.quantity;

          // Check if our quantity to update fits on the current merchant's stock
          // and if not, try adding less
          for (let i = newQuantity; i > itemInBag.quantity; i--) {
            if (i <= merchantQuantity) {
              await updateBagItem(
                itemInBag.id,
                {
                  ...requestData,
                  quantity: i,
                },
                undefined,
                metadata,
              );

              // Now we have less quantity to add to the next merchant
              quantityToHandle -= i - itemInBag.quantity;
              break;
            }
          }
        } else {
          // When the item is not in the bag, we add it
          await addBagItem(requestData, undefined, metadata);

          // Now we have less quantity to add to the next merchant
          quantityToHandle -= quantityToAdd;
        }

        // If there's no more quantity to add, we have finished
        if (quantityToHandle === 0) {
          break;
        }
      }

      // If after looping all the merchants we were
      // unable to add any quantity of the product to the
      // bag, throw an error.
      if (quantityToHandle === quantity) {
        throw new AddUpdateItemBagError(3);
      }
    },
    [addBagItem, items, updateBagItem],
  );

  const addItem = useCallback(
    (
      productId: number,
      { quantity, sizeId }: { quantity: number; sizeId: number },
      metadata?: BagItemActionMetadata,
    ) => {
      const state = getState();
      const product = getProductDenormalized(state, productId);

      if (!product) {
        throw new ProductError();
      }

      const size = product?.sizes?.find(size => size.id === sizeId);

      if (!size) {
        throw new SizeError();
      }

      return handleAddOrUpdateItem(
        {
          customAttributes: product?.customAttributes,
          product,
          quantity,
          size,
        },
        metadata,
      );
    },
    [getState, handleAddOrUpdateItem],
  );

  const handleQuantityChange = useCallback(
    (
      bagItem: BagItemHydrated,
      newQuantity: number,
      metadata?: BagItemActionMetadata,
    ) => {
      const quantityDelta = newQuantity - bagItem.quantity;

      if (!bagItem.product) {
        throw new ProductError();
      }

      if (quantityDelta < 0) {
        return updateBagItem(
          bagItem.id,
          {
            merchantId: bagItem.merchant,
            productId: bagItem.product.id,
            quantity: newQuantity,
            scale: bagItem.size.scale,
            size: bagItem.size.id,
          },
          undefined,
          metadata,
        );
      }

      const size = bagItem.product?.sizes?.find(
        size => size.id === bagItem.size.id,
      );

      if (!size) {
        throw new SizeError();
      }

      return handleAddOrUpdateItem(
        {
          customAttributes: bagItem?.customAttributes,
          productAggregatorId: bagItem?.productAggregator?.id,
          product: bagItem.product,
          quantity: quantityDelta,
          size,
        },
        metadata,
      );
    },
    [handleAddOrUpdateItem, updateBagItem],
  );

  /**
   * Handles the size update of a bag item. It automatically manages if the item
   * we're changing the size is already in the bag, and updates/removes accordingly.
   * The quantity/merchant stock is automatically managed.
   * <br /> This is useful for
   * when the size is updated isolated, for example in the bag page.
   * <br />
   * <br />
   * <i><small>This operation is over the bag item that instantiated the
   * hook.</small></i>.
   *
   * @param bagItem  - Bag item to update the size.
   * @param newSize  - Size to update the bag item into.
   * @param metadata - Metadata to be added to the dispatched action. This metadata can be used by redux middlewares (e.g. analytics bag middleware)
   */
  const handleSizeChange = useCallback(
    async (
      bagItem: BagItemHydrated,
      newSize: SizeAdapted['id'],
      metadata?: BagItemActionMetadata,
    ) => {
      if (!bagItem.product) {
        throw new ProductError();
      }

      // This extra logic is due to the fact that when changing sizes,
      // the verification to see if the bag item is already in bag
      // will always be false, thus never updating.
      const size = bagItem.product?.sizes?.find(size => size.id === newSize);

      if (!size) {
        throw new SizeError();
      }

      let quantityToHandle = bagItem.quantity;
      let sizeToHandle = size;

      const requestData = {
        merchantId: bagItem.merchant,
        productId: bagItem.product?.id,
        scale: size.scale,
        size: size.id,
      };

      // Checks if there is a merchant for that new size that is the
      // same merchant of this bag item.
      const currentMerchant = size?.stock.find(
        ({ merchantId }) => merchantId === bagItem.merchant,
      );

      if (currentMerchant) {
        const bagItemQuantity = bagItem.quantity;
        const merchantQuantity = currentMerchant.quantity;

        if (bagItemQuantity <= merchantQuantity) {
          // Update with bagItemQuantity
          await updateBagItem(
            bagItem.id,
            {
              ...requestData,
              quantity: bagItemQuantity,
            },
            undefined,
            metadata,
          );
          return;
        }

        // Update with merchantQuantity, removing the need
        // of trying to add the rest of the quantity in this merchant
        await updateBagItem(
          bagItem.id,
          {
            ...requestData,
            quantity: merchantQuantity,
          },
          undefined,
          metadata,
        );
        quantityToHandle -= merchantQuantity;
        // Remove the merchant of the future possibilities to add to the bag for
        // this size
        // TS: The stock here is manipulated, so it can be an empty array
        sizeToHandle = {
          ...size,
          stock:
            size?.stock.filter(
              ({ merchantId }) => merchantId !== currentMerchant.merchantId,
            ) || [],
        };
      } else {
        await removeItem(bagItem.id, undefined, metadata);
      }

      if (quantityToHandle) {
        // Add the left quantity in the other merchants
        handleAddOrUpdateItem(
          {
            customAttributes: bagItem?.customAttributes,
            productAggregatorId: bagItem?.productAggregator?.id,
            product: bagItem.product,
            quantity: quantityToHandle,
            size: sizeToHandle,
          },
          metadata,
        );
      }
    },
    [handleAddOrUpdateItem, removeItem, updateBagItem],
  );

  /**
   * Handles the size and quantity update at the same time on a bag item, managing
   * automatically the merchant to use.
   * <br /> This is useful for when the size and
   * quantity are updated simultaneously, for example in the bag page with a modal to
   * choose size and quantity.
   * <br />
   * <br />
   * <i><small>This operation is over the bag
   * item that instantiated the hook.</small></i>.
   *
   * @param bagItem   - Bag item to update.
   * @param newSizeId - Size to update the bag item into.
   * @param newQty    - Quantity to update the bag item into.
   * @param metadata  - Metadata to be added to the dispatched action. This metadata can be used by redux middlewares (e.g. analytics bag middleware)
   */
  const handleFullUpdate = useCallback(
    async (
      bagItem: BagItemHydrated,
      newSizeId: number,
      newQty: number,
      metadata?: BagItemActionMetadata,
    ) => {
      // In this case, we really want to update the bagItem,
      // so we force it on the first time.
      let didFirstUpdate = false;
      let quantityToHandle = Number(newQty);

      if (!bagItem.product) {
        throw new ProductError();
      }

      const size = bagItem.product?.sizes?.find(size => size.id === newSizeId);

      if (!size?.stock) {
        throw new SizeError();
      }

      // Iterate through the stock of the different merchants
      for (const { merchantId, quantity: merchantQuantity } of size.stock) {
        // If there is no quantity on this merchant jump to the next one
        if (merchantQuantity === 0) {
          continue;
        }

        // The quantity we want to update might be limited
        // by the merchant stock
        const quantityToManage = Math.min(quantityToHandle, merchantQuantity);

        // Format the data to send to the request
        const requestData = buildBagItem({
          customAttributes: bagItem.customAttributes,
          merchantId,
          product: bagItem.product,
          quantity: quantityToManage,
          productAggregatorId: bagItem?.productAggregator?.id,
          size,
        });

        if (!didFirstUpdate) {
          // Update the item
          await updateBagItem(
            bagItem.id,
            {
              ...requestData,
            },
            undefined,
            metadata,
          );

          didFirstUpdate = true;
        } else {
          // When we did the first update, we add the remaining quantity
          // to the bag
          await addBagItem(requestData, undefined, metadata);
        }

        quantityToHandle -= quantityToManage;

        // If there's no more quantity, we have finished
        if (quantityToHandle === 0) {
          break;
        }
      }

      // If after looping all the merchants we were
      // unable to add any quantity of the product to the
      // bag, throw an error.
      if (quantityToHandle === newQty) {
        throw new AddUpdateItemBagError(3);
      }
    },
    [addBagItem, updateBagItem],
  );

  const updateItem = useCallback(
    (
      bagItemId: number,
      {
        quantity,
        sizeId,
      }: {
        quantity?: number;
        sizeId?: number;
      },
      metadata?: BagItemActionMetadata,
    ) => {
      const bagItem = items.find(item => item.id === bagItemId);

      if (!bagItem || !bagItem.product) {
        throw new BagItemNotFoundError();
      }

      const newQuantity = quantity || bagItem.quantity;
      const newSizeId = sizeId || bagItem.size.id;

      if (newQuantity !== bagItem.quantity && newSizeId !== bagItem.size.id) {
        return handleFullUpdate(bagItem, newQuantity, newSizeId, metadata);
      }

      if (newQuantity !== bagItem.quantity) {
        return handleQuantityChange(bagItem, newQuantity, metadata);
      }

      if (newSizeId !== bagItem.size.id) {
        return handleSizeChange(bagItem, newSizeId, metadata);
      }

      return;
    },
    [handleFullUpdate, handleQuantityChange, handleSizeChange, items],
  );

  return {
    isLoading,
    error,
    isFetched,
    actions: {
      fetch,
      reset,
      addItem,
      updateItem,
      removeItem,
    },
    data: {
      ...bag,
      count,
      isEmpty,
      items,
    },
  };
};

export default useBag;
