import type { OrderSummary } from './orderSummary.types';

export type GetGuestOrders = (
  guestUserEmail: string,
  config?: Record<string, unknown>,
) => Promise<OrderSummary>;

export type GetGuestOrdersQuery = { query: { guestUserEmail: string } };
