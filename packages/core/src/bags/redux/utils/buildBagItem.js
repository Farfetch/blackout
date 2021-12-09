/**
 * Build a bag item ready to bag requests (add or update).
 *
 * @function buildBagItem
 * @memberof module:bags/utils
 *
 * @param {object} data - Details of the bag item to build.
 * @param {string} [data.authCode=''] - Authorization code (for SMS
 * restrictions, for example).
 * @param {string} [data.customAttributes=''] - Custom attributes.
 * @param {number} data.merchantId - Specific merchant id.
 * @param {object} data.product - Product with all information.
 * @param {number} data.productAggregatorId - Product's aggregator (bundle variant) id.
 * @param {number} [data.quantity=1] - Number of units.
 * @param {object} data.size - Size information.
 * @param {object} [data.from] - Provenience of action.
 *
 * @returns {object} Bag item data ready to perform add or update requests.
 */
export default ({
  authCode,
  customAttributes = '',
  merchantId,
  product,
  productAggregatorId,
  quantity = 1,
  size,
  ...otherParams
}) => {
  const sizeHydrated = product.sizes.find(({ id }) => id === size.id);

  return {
    authCode,
    customAttributes,
    merchantId: merchantId || sizeHydrated.stock[0].merchantId,
    productAggregatorId,
    productId: product.id,
    quantity,
    scale: size.scale,
    size: size.id,
    ...otherParams,
  };
};
