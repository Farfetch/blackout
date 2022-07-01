import type { CheckoutOrderCharge } from '.';
import type { Config } from '../../types';

export type GetCheckoutOrderCharge = (
  id: number | string,
  chargeId: string,
  config?: Config,
) => Promise<CheckoutOrderCharge>;
