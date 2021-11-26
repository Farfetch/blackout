import type { Config } from '../../types';
import type { GetChargesResponse } from '.';

export type PostChargesData = {
  redirectUrl: string;
  returnUrl: string;
  cancelUrl: string;
};

export type PostCharges = (
  id: string,
  data: PostChargesData,
  config?: Config,
) => Promise<GetChargesResponse>;
