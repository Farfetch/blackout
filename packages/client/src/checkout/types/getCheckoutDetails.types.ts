import type { Config } from '../../types';
import type { GetCheckoutDetailsResponse } from '.';

export type GetCheckoutDetails = (
  id: number,
  config?: Config,
) => Promise<GetCheckoutDetailsResponse>;
