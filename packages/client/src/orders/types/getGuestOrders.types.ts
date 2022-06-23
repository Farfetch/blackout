import type { Config } from '../../types';
import type { Order } from './order.types';

export type GetGuestOrders = (
  guestUserEmail: string,
  config?: Config,
) => Promise<Order[]>;

export type GetGuestOrdersQuery = { query: { guestUserEmail: string } };
