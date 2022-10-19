import type { CheckoutOrder, GetCheckoutOrderResponse } from '.';
import type { Config } from '../../types';

export type PutCheckoutOrderPromocodeData = {
  promocode: string;
};

export type PutCheckoutOrderPromocode = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PutCheckoutOrderPromocodeData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
