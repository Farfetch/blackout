/**
 * Hook to provide all kinds of data for the business logic attached to the actions
 * of adding or updating an item to the bag.
 */
import {
  addBagItem as addBagItemAction,
  buildBagItem,
  generateBagItemHash,
  getBagItems,
  updateBagItem as updateBagItemAction,
} from '@farfetch/blackout-redux';
import { shallowEqual, useSelector } from 'react-redux';
import { useAction } from '../../helpers';
import type { HandleAddOrUpdateItem, UseAddOrUpdateBagItem } from './types';

/**
 * Provides handler for adding or updating a bag item.
 *
 * @param bagItem - Bag item to work on.
 *
 * @returns Handle to manage bag item related operations.
 */
const useAddOrUpdateBagItem: UseAddOrUpdateBagItem = bagItem => {
  // Selectors
  const bagItems = useSelector(getBagItems, shallowEqual);
  // Actions
  const addBagItem = useAction(addBagItemAction);
  const updateBagItem = useAction(updateBagItemAction);
  const productSize = bagItem?.product?.sizes?.find(
    size => size.id === bagItem?.size?.id,
  );

  /**
   * Automatically manages the merchant available, according to its stock, to be used
   * in both "add" and "update" operations. It starts with the preferred merchant,
   * skips to the next when the previous runs out of stock, and so on.
   * <br /> This is
   * useful for when the operation is done outside the bag, for example, on the "move
   * to bag" from the wishlist.
   * <br />
   * <br />
   * <i><small>This operation is over the
   * bag item that instantiated the hook by default.</small></i>.
   *
   * @param item - Item to add/update the bag with.
   */
  const handleAddOrUpdateItem: HandleAddOrUpdateItem = async ({
    customAttributes = bagItem?.customAttributes,
    product = bagItem?.product,
    productAggregatorId = bagItem?.productAggregator?.id,
    quantity = bagItem?.quantity || 1,
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
      const itemInBag = bagItems?.find(
        item => generateBagItemHash(item) === hash,
      );

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

  return handleAddOrUpdateItem;
};

export default useAddOrUpdateBagItem;
