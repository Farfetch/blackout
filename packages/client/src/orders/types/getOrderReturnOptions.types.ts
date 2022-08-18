import type { Config } from '../..';
import type { MerchantOrderReturnOptions } from './orderReturnOptions.types';

export type GetOrderReturnOptions = (
  id: string,
  config?: Config,
) => Promise<MerchantOrderReturnOptions[]>;
