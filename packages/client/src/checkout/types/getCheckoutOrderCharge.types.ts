import type { CheckoutOrder, CheckoutOrderCharge } from './index.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutOrderCharge = (
  checkoutOrderId: CheckoutOrder['id'],
  chargeId: CheckoutOrderCharge['id'],
  config?: Config,
) => Promise<CheckoutOrderCharge>;
