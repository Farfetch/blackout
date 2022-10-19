import type { CheckoutOrder, CheckoutOrderCharge } from '.';
import type { Config } from '../../types';

export type GetCheckoutOrderCharge = (
  checkoutOrderId: CheckoutOrder['id'],
  chargeId: CheckoutOrderCharge['id'],
  config?: Config,
) => Promise<CheckoutOrderCharge>;
