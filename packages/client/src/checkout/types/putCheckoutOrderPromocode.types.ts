import type { Config } from '../../types';
import type { GetCheckoutOrderResponse } from '.';

export type PutCheckoutOrderPromocodeData = {
  promocode: string;
};

export type PutCheckoutOrderPromocode = (
  id: number,
  data: PutCheckoutOrderPromocodeData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
