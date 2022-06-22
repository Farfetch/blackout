import type { Config } from '../../types';
import type { GetCheckoutOrderResponse } from '.';

export type PutCheckoutOrderItemTags = (
  id: number,
  itemId: number,
  data: string[],
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
