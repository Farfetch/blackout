import type { Config } from '../../types';
import type { GetCheckoutOrderResponse } from '.';

export type GetCheckoutOrderQuery = {
  fields?: string;
};

export type GetCheckoutOrder = (
  id: number,
  query?: GetCheckoutOrderQuery,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
