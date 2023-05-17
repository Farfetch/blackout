import type { CheckoutOrder, GetCheckoutOrderResponse } from './index.js';
import type { Config } from '../../types/index.js';

export type PutCheckoutOrderTags = (
  checkoutOrderId: CheckoutOrder['id'],
  data: string[],
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
