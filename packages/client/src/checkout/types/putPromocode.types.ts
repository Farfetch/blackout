import type { Config } from '../../types';
import type { GetCheckoutResponse } from '.';

export type PutPromocodeData = {
  promocode: string;
};

export type PutPromocode = (
  id: number,
  data: PutPromocodeData,
  config?: Config,
) => Promise<GetCheckoutResponse>;
