import type { CheckoutOrder, GetCheckoutOrderResponse } from './index.js';
import type { Config } from '../../types/index.js';

export type PutCheckoutOrderPromocodeData = {
  promocode: string;
};

export type PutCheckoutOrderPromocode = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PutCheckoutOrderPromocodeData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
