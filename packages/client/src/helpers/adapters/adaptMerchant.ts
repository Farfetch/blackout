import type { AdaptMerchant } from './types';

/**
 * Adapt merchant to a structure that allows to create an entity.
 *
 * @param merchant - Merchant object with all related informations.
 *
 * @returns Merchant adapted ready to be an entity.
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
