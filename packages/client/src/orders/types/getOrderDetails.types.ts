import type { Order } from './order.types';

export type GetOrderDetails = (
  id: string,
  config?: Record<string, unknown>,
) => Promise<Order>;
