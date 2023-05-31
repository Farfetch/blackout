import type { CheckoutSession } from './checkoutSession.types.js';
import type { CheckoutSessionCharge } from './getCheckoutSessionCharge.types.js';
import type { Config } from '../../types/index.js';

export type PostCheckoutSessionChargeData = {
  returnUrl: string;
  cancelUrl: string;
};

export type PostCheckoutSessionCharge = (
  checkoutSessionId: CheckoutSession['id'],
  data: PostCheckoutSessionChargeData,
  config?: Config,
) => Promise<CheckoutSessionCharge>;
