import type { Config } from '../../types';
import type { GetCheckoutOrderChargeResponse } from '.';

export type PostCheckoutOrderChargesData = {
  redirectUrl: string;
  returnUrl: string;
  cancelUrl: string;
};

export type PostCheckoutOrderCharges = (
  id: number,
  data: PostCheckoutOrderChargesData,
  config?: Config,
) => Promise<GetCheckoutOrderChargeResponse>;
