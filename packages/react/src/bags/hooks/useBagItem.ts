/**
 * Hook to provide all kinds of data for the business logic attached to the bag
 * items.
 *
 * @module useBagItem
 * @category Bags
 * @subcategory Hooks
 */
import {
  addBagItem as addBagItemAction,
  getBagItem,
  getBagItemError,
  getBagItems,
  isBagItemLoading,
  removeBagItem as removeBagItemAction,
  updateBagItem as updateBagItemAction,
} from '@farfetch/blackout-redux/bags';
import {
  buildBagItem,
  generateBagItemHash,
} from '@farfetch/blackout-redux/bags/utils';
import { shallowEqual, useSelector } from 'react-redux';
import { useAction } from '../../helpers';
import type {
  HandleAddOrUpdateItemType,
  HandleDeleteBagItemType,
  HandleFullUpdateType,
  HandleQuantityChangeType,
  HandleSizeChangeType,
  UseBagItem,
} from './types';
import type { SizeAdapted } from '@farfetch/blackout-client/helpers/adapters/types';
import type { StoreState } from '@farfetch/blackout-redux/src/types';

/**
 * Provides Redux actions and state access, as well as handlers for dealing with
 * bag items business logic.
 *
 * @memberof module:bags/hooks
 *
 * @param {number} [bagItemId] - Bag item id to work on. Optional only if you need
 * to use the `handleAddOrUpdateItem` method. For more information and/or future plans
 * check the [respective issue](https://github.com/Farfetch/blackout/issues/16).
 *
 * @returns {object} All the handlers, state, actions and relevant data needed
 * to manage any bag item or product bag-related operation.
 */
const useBagItem: UseBagItem = bagItemId => {
  const bagItem = useSelector((state: StoreState) =>
    getBagItem(state, bagItemId),
  );
  const bagItems = useSelector(getBagItems, shallowEqual);
  const error = useSelector((state: StoreState) =>
    getBagItemError(state, bagItemId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isBagItemLoading(state, bagItemId),
  );
  const productSize = bagItem?.product?.sizes?.find(
    size => size.id === bagItem?.size?.id,
  );

  // Actions
  const addBagItem = useAction(addBagItemAction);
  const deleteBagItem = useAction(removeBagItemAction);
  const updateBagItem = useAction(updateBagItemAction);

  /**
   * Automatically manages the merchant available, according to its stock,
   * to be used in both "add" and "update" operations. It starts with the
   * preferred merchant, skips to the next when the previous runs out of
   * stock, and so on.
   * <br />
   * This is useful for when the operation is done outside the bag, for
   * example, on the "move to bag" from the wishlist or when adding to the bag
   * on a listing or PDP.
   * <br />
   * <br />
   * <i><small>This operation is over the bag item that instantiated the hook by
   * default.</small></i>.
   *
   * @function handleAddOrUpdateItem
   *
   * @param {object} [item] - Item to add/update the bag with.
   * @param {string} [item.customAttributes=''] - Bag item custom attributes.
   * @param {object} [item.product=bagItem.product] - Product of the bag item
   * to handle. Defaults to the product of the bag item that instantiated the
   * hook.
   * @param {number} [item.productAggregatorId=bagItem.productAggregator.id] -
   * Product aggregator identifier.
   * @param {number} [item.quantity=bagItem.quantity] - Quantity of the
   * product to add/update. Defaults to the quantity of the bag item that
   * instantiated the hook.
   * @param {object} [item.size=productSize] - Size of the product to
   * add/update. Defaults to the size of the bag item that instantiated the
   * hook.
   * @param {string} [item.from] - Provenience of action.
   */
  const handleAddOrUpdateItem: HandleAddOrUpdateItemType = async ({
    customAttributes = bagItem?.customAttributes,
    product = bagItem?.product,
    productAggregatorId = bagItem?.productAggregator?.id,
    quantity = bagItem?.quantity,
    size = productSize,
    ...otherParams
  }) => {
    let quantityToHandle = quantity;

    if (!size?.stock || !product) {
      return;
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
        ...otherParams,
      });
      // Checks if the item we want to add is already in bag
      // by comparing the bag items' hash
      const hash = generateBagItemHash(requestData);
      const itemInBag =
        bagItems && bagItems.find(item => generateBagItemHash(item) === hash);

      // When the item is in bag, we update its quantity
      if (itemInBag) {
        const newQuantity = quantityToAdd + itemInBag.quantity;

        // Check if our quantity to update fits on the current merchant's stock
        // and if not, try adding less
        for (let i = newQuantity; i > itemInBag.quantity; i--) {
          if (i <= merchantQuantity) {
            await updateBagItem(itemInBag.id, {
              ...requestData,
              quantity: i,
              oldQuantity: itemInBag.quantity,
              oldSize: itemInBag.size,
            });

            // Now we have less quantity to add to the next merchant
            quantityToHandle -= i - itemInBag.quantity;
            break;
          }
        }
      } else {
        // When the item is not in the bag, we add it
        await addBagItem(requestData);

        // Now we have less quantity to add to the next merchant
        quantityToHandle -= quantityToAdd;
      }

      // If there's no more quantity to add, we have finished
      if (quantityToHandle === 0) {
        return;
      }
    }
  };

  /**
   * Handles the quantity update of a bag item. If the quantity to
   * update is bigger than the stock of the current merchant, it'll be
   * automatically managed.
   * <br />
   * This is useful for when the quantity is updated isolatedly, for example
   * in the bag page.
   * <br />
   * <br />
   * <i><small>This operation is over the bag item that instantiated the
   * hook.</small></i>.
   *
   * @function handleQuantityChange
   *
   * @param {number} newQuantity - Quantity to update the bag item into.
   * @param {string} [from] - Provenience of action.
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

    handleAddOrUpdateItem({ quantity: quantityToAdd, from });
  };

  /**
   * Handles the size update of a bag item. It automatically manages if the
   * item we're changing the size is already in the bag, and updates/removes
   * accordingly. The quantity/merchant stock is automatically managed.
   * <br />
   * This is useful for when the size is updated isolated,
   * for example in the bag page.
   * <br />
   * <br />
   * <i><small>This operation is over the bag item that instantiated the
   * hook.</small></i>.
   *
   * @function handleSizeChange
   *
   * @param {number} newSize - Size to update the bag item into.
   * @param {string} [from] - Provenience of action.
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
   * Handles the size and quantity update at the same time on a bag item,
   * managing automatically the merchant to use.
   * <br />
   * This is useful for when the size and quantity are updated simultaneously,
   * for example in the bag page with a modal to choose size and quantity.
   * <br />
   * <br />
   * <i><small>This operation is over the bag item that instantiated the
   * hook.</small></i>.
   *
   * @function handleFullUpdate
   *
   * @param {number} newSizeId - Size to update the bag item into.
   * @param {number} newQty - Quantity to update the bag item into.
   * @param {string} [from] - Provenience of action.
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
   * <i><small>This operation is over the bag item that instantiated the
   * hook.</small></i>.
   *
   * @function handleDeleteBagItem
   *
   * @param {string} [from] - Provenience of action.
   */
  const handleDeleteBagItem: HandleDeleteBagItemType = from => {
    deleteBagItem(bagItem.id, { from });
  };

  return {
    /**
     * Adds a specific product to the bag.
     *
     * @type {Function}
     */
    addBagItem,
    /**
     * Deletes a specific item from the bag.
     *
     * @type {Function}
     */
    deleteBagItem,
    /**
     * Updates a specific item in the bag.
     *
     * @type {Function}
     */
    updateBagItem,
    /**
     * Bag item data.
     *
     * @type {object}
     */
    bagItem,
    /**
     * Bag item error, if any.
     *
     * @type {object|undefined}
     */
    error,
    /**
     * Whether the given bag item is loading.
     *
     * @type {boolean}
     */
    isLoading,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useBagItem~handleAddOrUpdateItem|handleAddOrUpdateItem} method
     */
    handleAddOrUpdateItem,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useBagItem~handleQuantityChange|handleQuantityChange} method
     */
    handleQuantityChange,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useBagItem~handleSizeChange|handleSizeChange} method
     */
    handleSizeChange,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useBagItem~handleFullUpdate|handleFullUpdate} method
     */
    handleFullUpdate,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useBagItem~handleDeleteBagItem|handleDeleteBagItem} method
     */
    handleDeleteBagItem,
  };
};

export default useBagItem;
