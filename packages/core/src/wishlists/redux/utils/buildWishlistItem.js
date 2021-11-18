import get from 'lodash/get';

/**
 * Build the wishlist item object ready to perform wishlist requests
 * (add or update).
 *
 * @function buildWishlistItem
 * @memberof module:wishlists/utils
 *
 * @param {object} product - Product with all its information.
 * @param {object} [size={}] - Selected product size to add to the wihslist.
 * @param {object} [size.id] - Size id.
 * @param {object} [size.scale] - Size scale id.
 * @param {number} [quantity=1] - Quantity to add to the wihslist.
 *
 * @returns {object} Wishlist item object ready to wishlist requests.
 */
export default (product, size = {}, quantity = 1) => {
  let merchantId;
  // If the sizeId is populated we can send the merchantID
  const sizeId = get(size, 'id');

  if (sizeId) {
    const sizeHydrated = product.sizes.find(({ id }) => id === sizeId);

    merchantId = sizeHydrated.stock[0].merchantId;
  }

  return {
    merchantId,
    productId: product.id,
    quantity,
    scale: size.scale,
    size: sizeId,
  };
};
