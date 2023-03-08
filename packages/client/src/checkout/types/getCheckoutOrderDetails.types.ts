import type { CheckoutOrder, CheckoutOrderDetails } from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderDetails = (
  checkoutOrderId: CheckoutOrder['id'],
  config?: Config,
) => Promise<CheckoutOrderDetails>;
