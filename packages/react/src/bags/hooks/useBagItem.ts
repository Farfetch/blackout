/**
 * Hook to provide all kinds of data for the business logic attached to the bag
 * items.
 */
import {
  addBagItem as addBagItemAction,
  buildBagItem,
  getBagItem,
  getBagItemError,
  isBagItemLoading,
  removeBagItem as removeBagItemAction,
  SizeAdapted,
  StoreState,
  updateBagItem as updateBagItemAction,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useSelector } from 'react-redux';
import useAddOrUpdateBagItem from './useAddOrUpdateBagItem';
import type {
  HandleDeleteBagItemType,
  HandleFullUpdateType,
  HandleQuantityChangeType,
  HandleSizeChangeType,
  UseBagItem,
} from './types';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * bag items business logic.
 *
 * @param bagItemId - Bag item id to work on.
 *
 * @returns All the handlers, state, actions and relevant data needed to manage any bag item or product
 * bag-related operation.
 */
const useBagItem: UseBagItem = bagItemId => {
  // Selectors
  const bagItem = useSelector((state: StoreState) =>
    getBagItem(state, bagItemId),
  );
  const error = useSelector((state: StoreState) =>
    getBagItemError(state, bagItemId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isBagItemLoading(state, bagItemId),
  );

  // Actions
  const addBagItem = useAction(addBagItemAction);
  const deleteBagItem = useAction(removeBagItemAction);
  const updateBagItem = useAction(updateBagItemAction);
  const handleAddOrUpdateItem = useAddOrUpdateBagItem(bagItem);
  /**
   * Handles the quantity update of a bag item. If the quantity to update is bigger
   * than the stock of the current merchant, it'll be automatically managed.
   * <br />
   * This is useful for when the quantity is updated isolated, for example in the
   * bag page.
   * <br />
   * <br />
   * <i><small>This operation is over the bag item that
   * instantiated the hook.</small></i>.
   *
   * @param newQuantity - Quantity to update the bag item into.
   * @param from        - Provenience of action.
   */
  const handleQuantityChange: HandleQuantityChangeType = (
    newQuantity,
    from,
  ) => {
    const quantityToHandle = Number(newQuantity);
    // If a bag item quantity is decreased, there's no need to make
    // any further verifications and update the bag item can proceed
    if (quantityToHandle < bagItem.quantity) {
      updateBagItem(bagItem.id, {
        merchantId: bagItem.merchant,
        productId: bagItem.product?.id,
        quantity: quantityToHandle,
        scale: bagItem.size.scale,
        size: bagItem.size.id,
        oldQuantity: bagItem.quantity,
        oldSize: bagItem.size,
        from,
      });

      return;
    }

    const quantityToAdd = quantityToHandle - bagItem.quantity;

    handleAddOrUpdateItem({
      from,
      quantity: quantityToAdd,
    });
  };

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
   * @param newSize - Size to update the bag item into.
   * @param from    - Provenience of action.
   */
  const handleSizeChange: HandleSizeChangeType = async (newSize, from) => {
    // This extra logic is due to the fact that when changing sizes,
    // the verification to see if the bag item is already in bag
    // will always be false, thus never updating.
    const size = bagItem.product?.sizes?.find(size => size.id === newSize);
    let quantityToHandle = bagItem.quantity;
    let sizeToHandle = size;

    const requestData = {
      merchantId: bagItem.merchant,
      productId: bagItem.product?.id,
      scale: size?.scale,
      size: size?.id,
      from,
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
        await updateBagItem(bagItem.id, {
          ...requestData,
          quantity: bagItemQuantity,
          oldQuantity: bagItemQuantity,
          oldSize: bagItem.size,
        });
        return;
      } else {
        // Update with merchantQuantity, removing the need
        // of trying to add the rest of the quantity in this merchant
        await updateBagItem(bagItem.id, {
          ...requestData,
          quantity: merchantQuantity,
          oldQuantity: bagItemQuantity,
          oldSize: bagItem.size,
        });
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
        } as Omit<SizeAdapted, 'stock'> & { stock: SizeAdapted['stock'] | [] };
      }
    } else {
      await deleteBagItem(bagItem.id, from);
    }

    if (quantityToHandle) {
      // Add the left quantity in the other merchants
      handleAddOrUpdateItem({
        quantity: quantityToHandle,
        size: sizeToHandle,
        from,
      });
    }
  };

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
   * @param newSizeId - Size to update the bag item into.
   * @param newQty    - Quantity to update the bag item into.
   * @param from      - Provenience of action.
   */
  const handleFullUpdate: HandleFullUpdateType = async (
    newSizeId,
    newQty,
    from,
  ) => {
    // In this case, we really want to update the bagItem,
    // so we force it on the first time.
    let didFirstUpdate = false;
    let quantityToHandle = Number(newQty);
    const size = bagItem.product?.sizes?.find(size => size.id === newSizeId);

    if (!size?.stock || !bagItem.product) {
      return;
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
        from,
      });

      if (!didFirstUpdate) {
        // Update the item
        await updateBagItem(bagItem.id, {
          ...requestData,
          oldQuantity: bagItem.quantity,
          oldSize: bagItem.size,
        });

        didFirstUpdate = true;
      } else {
        // When we did the first update, we add the remaining quantity
        // to the bag
        await addBagItem(requestData);
      }

      quantityToHandle -= quantityToManage;

      // If there's no more quantity, we have finished
      if (quantityToHandle === 0) {
        return;
      }
    }
  };

  /**
   * Handles the removal of the bag item.
   * <br />
   * <br />
   * <i><small>This operation is
   * over the bag item that instantiated the hook.</small></i>.
   *
   * @param from - Provenience of action.
   */
  const handleDeleteBagItem: HandleDeleteBagItemType = from => {
    deleteBagItem(bagItem.id, { from });
  };

  return {
    /**
     * Deletes a specific item from the bag.
     */
    deleteBagItem,
    /**
     * Updates a specific item in the bag.
     */
    updateBagItem,
    /**
     * Bag item data.
     */
    bagItem,
    /**
     * Bag item error, if any.
     */
    error,
    /**
     * Whether the given bag item is loading.
     */
    isLoading,

    handleQuantityChange,

    handleSizeChange,

    handleFullUpdate,

    handleDeleteBagItem,
  };
};

export default useBagItem;
