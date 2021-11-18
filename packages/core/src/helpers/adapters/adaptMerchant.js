/**
 * Adapt merchant to a structure that allows to create an entity.
 *
 * @function adaptMerchant
 * @memberof module:helpers/adapters
 *
 * @param {object} merchant - Merchant object with all related informations.
 * @param {number} merchant.merchantId - Merchant id to adapt.
 * @param {string} merchant.merchantName - Merchant name to adapt.
 * @param {string} merchant.merchantShoppingUrl - Merchant shopping url to adapt.
 *
 * @returns {object} Merchand adapted ready to be an entity.
 */
export default ({ merchantId, merchantName, merchantShoppingUrl }) => {
  if (!merchantId) {
    return;
  }

  return {
    id: merchantId,
    name: merchantName,
    shoppingUrl: merchantShoppingUrl,
  };
};
