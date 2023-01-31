/**
 * Bags hooks.
 *
 * @module bags/hooks
 * @category Bags
 * @subcategory Hooks
 */
import { buildBagItem, createBagItemHash } from '../redux/utils';
import {
  name as PCKG_NAME,
  version as PCKG_VERSION,
} from '../../../package.json';
import { warnDeprecatedMethod } from '../../helpers';

// @TODO: Remove this hook in version 2.0.0.

/**
 * Hook which provides handlers for bag items business logic.
 *
 * @function
 * @memberof module:bags/hooks
 *
 * @deprecated Since version 1.x.x. Will be deleted in version 2.0.0.
 * To keep using this hook, use the useBagItem hook available on @farfetch/blackout-react package.
 *
 * @param {Array} bagItems - List of bag items.
 * @param {object} bagItem - Current bag item.
 * @param {Function} addBagItem - Add to bag item action.
 * @param {Function} deleteBagItem - Delete bag item action.
 * @param {Function} updateBagItem - Update bag item action.
 *
 * @returns {object} Handlers for dealing with bag items business logic - handleQuantityChange, handleSizeChange and handleDeleteBagItem.
 */
export function useBagItem(
  bagItems,
  bagItem,
  addBagItem,
  deleteBagItem,
  updateBagItem,
) {
  warnDeprecatedMethod(
    `${PCKG_NAME}@${PCKG_VERSION}`,
    'useBagItem',
    'useBagItem on @farfetch/blackout-react/hooks/bags',
  );

  const productSize =
    bagItem.product.sizes &&
    bagItem.product.sizes.find(size => size.id === bagItem.size.id);

  // Function that provides all tenant logic to deal with add,
  // update or add the next merchant available.
  const addOrUpdateItem = async ({
    productAggregatorId = bagItem.productAggregator?.id,
    quantity = bagItem.quantity,
    size = productSize,
    ...otherParams
  }) => {
    let quantityToHandle = quantity;

    // Iterate through the stock of different merchants
    for (const { merchantId, quantity: merchantQuantity } of size.stock) {
      // The quantity we want to add might be limited
      // by the merchant stock
      const quantityToAdd = Math.min(quantityToHandle, merchantQuantity);
      // Format the data to send to the request
      const requestData = buildBagItem({
        customAttributes: bagItem?.customAttributes,
        merchantId,
        product: bagItem.product,
        productAggregatorId,
        quantity: quantityToAdd,
        size,
        ...otherParams,
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

  const handleQuantityChange = newQuantity => {
    // When a user reduces the bag item quantity we
    // do not have to make any further verifications
    // and can update the bag item
    const parsedNewQuantity = parseInt(newQuantity);
    if (parsedNewQuantity < bagItem.quantity) {
      updateBagItem(bagItem.id, {
        merchantId: bagItem.merchant,
        productId: bagItem.product.id,
        quantity: parsedNewQuantity,
        scale: bagItem.size.scale,
        size: bagItem.size.id,
        oldQuantity: bagItem.quantity
          ? bagItem.quantity
          : bagItem.product.quantity,
        oldSize: bagItem.size || bagItem.product.size,
      });
      return;
    }
    const quantityToAdd = newQuantity - bagItem.quantity;

    addOrUpdateItem({ quantity: quantityToAdd });
  };

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
        await updateBagItem(bagItem.id, {
          ...requestData,
          quantity: bagItemQuantity,
          oldQuantity: bagItemQuantity,
          oldSize: bagItem.size,
        });
        return;
      } else if (bagItemQuantity > merchantQuantity) {
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
        quantity: bagItem.quantity,
        size: bagItem.size.id,
      });
    }

    if (quantityToHandle) {
      // Add the left quantity in the other merchants
      addOrUpdateItem({
        quantity: quantityToHandle,
        size: sizeToHandle,
      });
    }
  };

  const handleDeleteBagItem = () => {
    deleteBagItem(bagItem.id, {
      productId: bagItem.product.id,
      quantity: bagItem.quantity,
      size: bagItem.size.id,
    });
  };

  return {
    handleQuantityChange,
    handleSizeChange,
    handleDeleteBagItem,
  };
}
