import type { Config } from '../../types';
import type { Order } from '.';

export type GetGuestOrderLegacy = (
  id: string,
  guestUserEmail: string,
  config?: Config,
) => Promise<Order>;
