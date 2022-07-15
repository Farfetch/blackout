import type { Order } from './order.types';

export type GetOrder = (
  id: string,
  config?: Record<string, unknown>,
) => Promise<Order>;
