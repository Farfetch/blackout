import get from 'lodash/get';

/**
 * Creates a hash based on the merchant, product, size ids and custom attributes.
 *
 * @function createBagItemHash
 * @memberof module:bags/utils
 *
 * @param {object} params - The params needed to create a hash.
 *
 * @returns {string} The hash created.
 */
export default params => {
  const productId = get(params, 'productId') || get(params, 'product.id');
  const merchantId = get(params, 'merchantId') || get(params, 'merchant');
  const sizeId = get(params, 'size.id') || get(params, 'size');
  const sizeScale = get(params, 'size.scale') || get(params, 'scale');
  const customAttributes = get(params, 'customAttributes');
  const productAggregatorId =
    get(params, 'productAggregatorId') || get(params, 'productAggregator.id');

  if (!merchantId || !productId || !sizeId || !sizeScale) {
    throw new Error(
      'Item is missing some important properties, please check your `merchantId`, `productId`, `size.id` or `size.scale`',
    );
  }

  return `${merchantId}!${productId}!${sizeId}!${sizeScale}${
    customAttributes ? `!${customAttributes}` : ''
  }${productAggregatorId ? `!${productAggregatorId}` : ''}`;
};
