import type { Config } from '../../types/index.js';
import type { OrderLegacy } from './index.js';

export type GetGuestOrderLegacyData = {
  guestUserEmail: string;
};

export type GetGuestOrderLegacy = (
  id: string,
  data: GetGuestOrderLegacyData,
  config?: Config,
) => Promise<OrderLegacy>;
