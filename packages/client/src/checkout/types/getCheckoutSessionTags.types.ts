import type { CheckoutSession } from './checkoutSession.types.js';
import type { Config } from '../../types/index.js';

export type CheckoutSessionTags = string[];

export type GetCheckoutSessionTags = (
  checkoutSessionId: CheckoutSession['id'],
  config?: Config,
) => Promise<CheckoutSessionTags>;
