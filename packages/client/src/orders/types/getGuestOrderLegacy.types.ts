import type { Config } from '../../types/index.js';
import type { OrderLegacy } from './index.js';

export type GetGuestOrderLegacy = (
  id: string,
  guestUserEmail: string,
  config?: Config,
) => Promise<OrderLegacy>;
