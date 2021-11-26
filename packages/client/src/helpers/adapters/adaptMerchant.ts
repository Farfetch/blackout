import type { AdaptMerchant } from './types';

/**
 * Adapt merchant to a structure that allows to create an entity.
 *
 * @function
 * @memberof module:helpers/adapters
 *
 * @param {object} merchant - Merchant object with all related informations.
 * @param {number} [merchant.merchantId] - Merchant id to adapt.
 * @param {string} [merchant.merchantName] - Merchant name to adapt.
 * @param {string} [merchant.merchantShoppingUrl] - Merchant shopping url to adapt.
 *
 * @returns {object} Merchant adapted ready to be an entity.
 */
const adaptMerchant: AdaptMerchant = ({
  merchantId,
  merchantName,
  merchantShoppingUrl,
}) => {
  if (!merchantId) {
    return;
  }

  return {
    id: merchantId,
    name: merchantName,
    shoppingUrl: merchantShoppingUrl,
  };
};

export default adaptMerchant;
