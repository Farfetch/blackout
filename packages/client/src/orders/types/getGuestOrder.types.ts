import type { Order } from './order.types';

export type GetGuestOrder = (
  id: string,
  guestUserEmail: string,
  config?: Record<string, unknown>,
) => Promise<Order>;
