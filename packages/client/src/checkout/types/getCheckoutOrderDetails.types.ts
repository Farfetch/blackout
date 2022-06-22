import type { Config } from '../../types';
import type { GetCheckoutOrderDetailsResponse } from '.';

export type GetCheckoutOrderDetails = (
  id: number,
  config?: Config,
) => Promise<GetCheckoutOrderDetailsResponse>;
