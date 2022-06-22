import type { Config } from '../../types';
import type { GetCheckoutOrderResponse } from '.';

export type PutCheckoutOrderTags = (
  id: number,
  data: string[],
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
