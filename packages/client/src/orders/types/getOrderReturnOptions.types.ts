import type { OrderReturn } from './orderReturn.types';

export type GetOrderReturnOptions = (
  id: string,
  config?: Record<string, unknown>,
) => Promise<OrderReturn[]>;
