import type { CheckoutOrder, GetCheckoutOrderResponse } from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderQuery = {
  fields?: string;
};

export type GetCheckoutOrder = (
  checkoutOrderId: CheckoutOrder['id'],
  query?: GetCheckoutOrderQuery,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
