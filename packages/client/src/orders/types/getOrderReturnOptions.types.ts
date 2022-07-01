import type { Config } from '../..';
import type { OrderReturn } from './orderReturn.types';

export type GetOrderReturnOptions = (
  id: string,
  config?: Config,
) => Promise<OrderReturn[]>;
