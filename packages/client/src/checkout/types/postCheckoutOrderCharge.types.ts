import type { CheckoutOrder, CheckoutOrderCharge } from '.';
import type { Config } from '../../types';

export type PostCheckoutOrderChargeData = {
  returnUrl: string;
  cancelUrl: string;
};

export type PostCheckoutOrderCharge = (
  checkoutOrderId: CheckoutOrder['id'],
  data: PostCheckoutOrderChargeData,
  config?: Config,
) => Promise<CheckoutOrderCharge>;
