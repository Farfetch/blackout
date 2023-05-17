import type { CheckoutOrder, CheckoutOrderCharge } from './index.js';
import type { Config } from '../../types/index.js';

export type PostCheckoutOrderChargeData = {
  returnUrl: string;
  cancelUrl: string;
};

export type PostCheckoutOrderCharge = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PostCheckoutOrderChargeData,
  config?: Config,
) => Promise<CheckoutOrderCharge>;
