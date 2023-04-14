import type { CheckoutOrder, GetCheckoutOrderResponse } from './index.js';
import type { Config } from '../../types/index.js';

/**
 * Put checkout order promocodes data type.
 * The `promocodes` property is typed as a string array
 * but due to a limitation it only supports one element
 * right now.
 */
export type PutCheckoutOrderPromocodesData = {
  promocodes: string[];
};

export type PutCheckoutOrderPromocodes = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PutCheckoutOrderPromocodesData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
