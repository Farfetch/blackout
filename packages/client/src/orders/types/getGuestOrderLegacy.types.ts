import type { Config } from '../../types';
import type { OrderLegacy } from '.';

export type GetGuestOrderLegacy = (
  id: string,
  guestUserEmail: string,
  config?: Config,
) => Promise<OrderLegacy>;
