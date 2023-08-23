import type { CheckoutOrder, GetCheckoutOrderResponse } from './index.js';
import type { Config } from '../../types/index.js';

/**
 * Put checkout order promocodes data type.
 * The `promocodes` property is not supported yet
 * This will give the flexibility to avoid breaking changes
 * in the future when the `promocodes` is supported
 */
export type PutCheckoutOrderPromocodesData = {
  promocodes?: string[];
  promocode?: string;
};

export type PutCheckoutOrderPromocodes = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PutCheckoutOrderPromocodesData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
