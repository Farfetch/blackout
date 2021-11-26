import type { Config } from '../../types';
import type { GetCheckoutResponse } from '.';

export type PutTags = (
  id: number,
  data: string[],
  config?: Config,
) => Promise<GetCheckoutResponse>;
