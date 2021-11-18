/**
 * Hook to provide all kinds of data for the business logic attached to the bag
 * items.
 *
 * @module useBagItem
 * @category Bags
 * @subcategory Hooks
 */
import {
  buildBagItem,
  createBagItemHash,
} from '@farfetch/blackout-core/bags/redux/utils';
import {
  deleteBagItem as deleteBagItemClient,
  patchBagItem as patchBagItemClient,
  postBagItem as postBagItemClient,
} from '@farfetch/blackout-core/bags/client';
import {
  doAddBagItem,
  doDeleteBagItem,
  doUpdateBagItem,
  getBagItem,
  getBagItemError,
  getBagItems,
  isBagItemLoading,
} from '@farfetch/blackout-core/bags/redux';
import { shallowEqual, useSelector } from 'react-redux';
import { useAction } from '../../utils';

/**
 * @function useBagItem
 * @memberof module:bags/hooks
 *
 * @param {number} [bagItemId] - Bag item id to work on. Send nothing if you
 * just need the actions to add a product to the bag, for example.
 *
 * @returns {object} All the handlers, state, actions and relevant data needed
 * to manage any bag item or product bag-related operation.
 */
export default bagItemId => {
  const bagItem = useSelector(state => getBagItem(state, bagItemId));
  const bagItems = useSelector(getBagItems, shallowEqual);
  const error = useSelector(state => getBagItemError(state, bagItemId));
  const isLoading = useSelector(state => isBagItemLoading(state, bagItemId));
  const productSize = bagItem?.product?.sizes?.find(
    size => size.id === bagItem?.size?.id,
  );

  // Actions
  const addBagItem = useAction(doAddBagItem(postBagItemClient));
  const deleteBagItem = useAction(doDeleteBagItem(deleteBagItemClient));
  const updateBagItem = useAction(doUpdateBagItem(patchBagItemClient));

  /**
   * Automatically manages the merchant available, according to its stock,
   * to be used in both "add" and "update" operations. It starts with the
   * preferred merchant, skips to the next when the previous runs out of
   * stock, and so on.
   * <br />
   * This is useful for when the operation is done outside the bag, for
   * example, on the "move to bag" from the wishlist.
   * <br />
   * <br />
   * <i><small>This operation is over the bag item that instantiated the hook by
   * default.</small></i>.
   *
   * @function handleAddOrUpdateItem
   * @param {object} [item] - Item to add/update the bag with.
   * @param {string} [item.customAttributes=''] - Custom attributes of the bag
   * item to handle.
   * @param {object} [item.product=bagItem.product] - Product of the bag item
   * to handle. Defaults to the product of the bag item that instantiated the
   * hook.
   * @param {number} [item.quantity=bagItem.quantity] - Quantity of the
   * product to add/update. Defaults to the quantity of the bag item that
   * instantiated the hook.
   * @param {object} [item.size=productSize] - Size of the product to
   * add/update. Defaults to the size of the bag item that instantiated the
   * hook.
   */
  const handleAddOrUpdateItem = async ({
    customAttributes = bagItem.customAttributes,
    product = bagItem.product,
    quantity = bagItem.quantity,
    size = productSize,
  }) => {
    let quantityToHandle = quantity;
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
        quantity: quantityToAdd,
        size,
      });
      // Checks if the item we want to add is already in bag
      // by comparing the bag items' hash
      const hash = createBagItemHash(requestData);
      const itemInBag =
        bagItems && bagItems.find(item => createBagItemHash(item) === hash);

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
   */
  const handleQuantityChange = newQuantity => {
    // If a bag item quantity is decreased, there's no need to make
    // any further verifications and update the bag item can proceed
    if (newQuantity < bagItem.quantity) {
      updateBagItem(bagItem.id, {
        merchantId: bagItem.merchant,
        productId: bagItem.product.id,
        quantity: newQuantity,
        scale: bagItem.size.scale,
        size: bagItem.size.id,
        oldQuantity: bagItem.quantity,
        oldSize: bagItem.size,
      });
      return;
    }

    const quantityToAdd = newQuantity - bagItem.quantity;

    handleAddOrUpdateItem({ quantity: quantityToAdd });
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
   */
  const handleSizeChange = async newSize => {
    // This extra logic is due to the fact that when changing sizes,
    // the verification to see if the bag item is already in bag
    // will always be false, thus never updating.
    const size = bagItem.product.sizes.find(
      size => size.id === parseInt(newSize, 10),
    );

    let quantityToHandle = bagItem.quantity;
    let sizeToHandle = size;

    const requestData = {
      merchantId: bagItem.merchant,
      productId: bagItem.product.id,
      scale: size.scale,
      size: size.id,
    };

    // Checks if there is a merchant for that new size that is the
    // same merchant of this bag item.
    const currentMerchant = size.stock.find(
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
        sizeToHandle = {
          ...size,
          stock: size.stock.filter(
            ({ merchantId }) => merchantId !== currentMerchant.merchantId,
          ),
        };
      }
    } else {
      await deleteBagItem(bagItem.id, {
        productId: bagItem.product.id,
      });
    }

    if (quantityToHandle) {
      // Add the left quantity in the other merchants
      handleAddOrUpdateItem({
        quantity: quantityToHandle,
        size: sizeToHandle,
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
   */
  const handleFullUpdate = async (newSizeId, newQty) => {
    // In this case, we really want to update the bagItem,
    // so we force it on the first time.
    let didFirstUpdate = false;
    let quantityToHandle = Number(newQty);
    const size = bagItem.product.sizes.find(size => size.id === newSizeId);

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
        size,
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
   */
  const handleDeleteBagItem = () => {
    deleteBagItem(bagItem.id, {
      productId: bagItem.product.id,
      quantity: bagItem.quantity,
    });
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
