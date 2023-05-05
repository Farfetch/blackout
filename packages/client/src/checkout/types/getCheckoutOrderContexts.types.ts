import type { CheckoutOrder, CheckoutOrderContext } from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderContexts = (
  checkoutOrderId: CheckoutOrder['id'],
  config?: Config,
) => Promise<CheckoutOrderContext[]>;
