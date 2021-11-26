import type { Config } from '../../types';
import type { GetChargesResponse } from '.';

export type GetCharges = (
  id: number | string,
  config?: Config,
) => Promise<GetChargesResponse>;
