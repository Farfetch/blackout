import type { CheckoutSession } from './checkoutSession.types.js';
import type { CheckoutSessionTags } from './getCheckoutSessionTags.types.js';
import type { Config } from '../../types/index.js';

export type PutCheckoutSessionTags = (
  checkoutSessionId: CheckoutSession['id'],
  data: CheckoutSessionTags,
  config?: Config,
) => Promise<number>;
