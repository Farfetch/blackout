import type { CheckoutOrderCharge } from '.';
import type { Config } from '../../types';

export type PostCheckoutOrderChargeData = {
  redirectUrl: string;
  returnUrl: string;
  cancelUrl: string;
};

export type PostCheckoutOrderCharge = (
  id: number,
  data: PostCheckoutOrderChargeData,
  config?: Config,
) => Promise<CheckoutOrderCharge>;