import type { Config } from '../../types';
import type { GetCheckoutResponse } from '.';

export type PutItemTags = (
  id: number,
  itemId: number,
  data: string[],
  config?: Config,
) => Promise<GetCheckoutResponse>;
