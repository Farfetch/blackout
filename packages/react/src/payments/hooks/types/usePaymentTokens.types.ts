import type { Config, GetPaymentTokensQuery } from '@farfetch/blackout-client';

export type UsePaymentTokensOptions = {
  enableAutoFetch?: boolean;
  fetchQuery?: GetPaymentTokensQuery;
  fetchConfig?: Config;
};
