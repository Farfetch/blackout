import type {
  Config,
  Product,
  ProductDetailsQuery,
} from '@farfetch/blackout-client';

export type ProductId = Product['result']['id'];

export type UseProductDetailsOptions = {
  fetchConfig?: Config;
  enableAutoFetch?: boolean;
  fetchForceDispatch?: boolean;
  fetchQuery?: ProductDetailsQuery;
};
