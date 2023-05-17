import type { Config, Order } from '../../index.js';
import type { MerchantOrderReturnOptions } from './orderReturnOptions.types.js';

export type GetOrderReturnOptions = (
  id: Order['id'],
  config?: Config,
) => Promise<MerchantOrderReturnOptions[]>;
