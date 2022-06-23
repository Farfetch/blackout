import type { Config, Order } from '../..';
import type { Return } from '../../returns/types';

export type GetOrderReturns = (
  id: Order['id'],
  config?: Config,
) => Promise<Return[]>;
