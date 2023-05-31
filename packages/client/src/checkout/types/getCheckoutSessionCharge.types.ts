import type { Charge } from '../../payments/types/paymentIntentCharge.types.js';
import type { CheckoutSession } from './checkoutSession.types.js';
import type { Config } from '../../types/index.js';

export type CheckoutSessionCharge = Charge;

export type GetCheckoutSessionCharge = (
  checkoutSessionId: CheckoutSession['id'],
  chargeId: CheckoutSessionCharge['id'],
  config?: Config,
) => Promise<CheckoutSessionCharge>;
