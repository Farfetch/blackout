import type {
  Config,
  GetCheckoutOrderQuery,
  PostCheckoutOrderDataWithBag,
  PostCheckoutOrderDataWithItems,
} from '@farfetch/blackout-client';

export type UseCheckoutOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  fetchQuery?: GetCheckoutOrderQuery;
  enableAutoCreate?: boolean;
  createData?: PostCheckoutOrderDataWithItems | PostCheckoutOrderDataWithBag;
  createConfig?: Config;
};
