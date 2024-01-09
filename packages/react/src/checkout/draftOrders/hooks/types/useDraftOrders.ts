import type { CheckoutOrder, Config } from '@farfetch/blackout-client';

export type UseDraftOrdersOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  orderId?: CheckoutOrder['id'];
};
