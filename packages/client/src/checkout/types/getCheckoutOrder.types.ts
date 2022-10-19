import type { CheckoutOrder, GetCheckoutOrderResponse } from '.';
import type { Config } from '../../types';

export type GetCheckoutOrderQuery = {
  fields?: string;
};

export type GetCheckoutOrder = (
  checkoutOrderId: CheckoutOrder['id'],
  query?: GetCheckoutOrderQuery,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
