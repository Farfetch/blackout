import type { Config, OrderItem } from '@farfetch/blackout-client';

export type UseExchangeOptions = {
  orderItemUuid?: OrderItem['shippingOrderLineId'];
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
};
