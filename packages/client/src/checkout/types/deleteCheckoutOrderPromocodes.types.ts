import type { CheckoutOrder, GetCheckoutOrderResponse } from './index.js';
import type { Config } from '../../types/index.js';

export type DeleteCheckoutOrderPromocodes = (
  checkoutOrderId: CheckoutOrder['id'],
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
