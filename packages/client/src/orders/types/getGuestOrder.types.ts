import type { Config } from '../../types';
import type { Order } from './order.types';

export type GetGuestOrder = (
  id: string,
  guestUserEmail: string,
  config?: Config,
) => Promise<Order>;
