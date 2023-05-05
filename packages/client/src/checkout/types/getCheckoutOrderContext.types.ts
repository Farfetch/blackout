import type { CheckoutOrder, CheckoutOrderContext } from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderContext = (
  checkoutOrderId: CheckoutOrder['id'],
  contextId: CheckoutOrderContext['id'],
  config?: Config,
) => Promise<CheckoutOrderContext>;
