import type { Config, Order } from '../../index.js';
import type { Return } from '../../returns/types/index.js';

export type GetOrderReturns = (
  id: Order['id'],
  config?: Config,
) => Promise<Return[]>;
