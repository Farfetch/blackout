import type { CheckoutSession } from './checkoutSession.types.js';
import type { Config } from '../../types/index.js';

export type GetCheckoutSession = (
  checkoutSessionId: CheckoutSession['id'],
  config?: Config,
) => Promise<CheckoutSession>;
