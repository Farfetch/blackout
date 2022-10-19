import type { CheckoutOrder, GetCheckoutOrderResponse } from '.';
import type { Config } from '../../types';

export type PutCheckoutOrderTags = (
  checkoutOrderId: CheckoutOrder['id'],
  data: string[],
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
