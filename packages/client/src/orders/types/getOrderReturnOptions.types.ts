import type { Config, Order } from '../..';
import type { MerchantOrderReturnOptions } from './orderReturnOptions.types';

export type GetOrderReturnOptions = (
  id: Order['id'],
  config?: Config,
) => Promise<MerchantOrderReturnOptions[]>;
