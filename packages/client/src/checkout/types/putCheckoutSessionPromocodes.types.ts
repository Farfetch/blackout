import type { CheckoutSession } from './checkoutSession.types.js';
import type { Config } from '../../types/index.js';

export type PutCheckoutSessionPromocodesData = {
  promocode: string;
};

export type PutCheckoutSessionPromocodes = (
  checkoutSessionId: CheckoutSession['id'],
  data: PutCheckoutSessionPromocodesData,
  config?: Config,
) => Promise<number>;
