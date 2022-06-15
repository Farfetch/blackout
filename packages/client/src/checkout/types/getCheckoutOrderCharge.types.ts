import type { Config } from '../../types';
import type { GetCheckoutOrderChargeResponse } from '.';

export type GetCheckoutOrderCharge = (
  id: number | string,
  chargeId: string,
  config?: Config,
) => Promise<GetCheckoutOrderChargeResponse>;
