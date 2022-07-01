import type { CheckoutOrderCharge } from '.';
import type { Config } from '../../types';

export type PostCheckoutOrderChargesData = {
  redirectUrl: string;
  returnUrl: string;
  cancelUrl: string;
};

export type PostCheckoutOrderCharges = (
  id: number,
  data: PostCheckoutOrderChargesData,
  config?: Config,
) => Promise<CheckoutOrderCharge>;
