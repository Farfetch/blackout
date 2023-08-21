import type {
  Config,
  GetUserClosetItemsQuery,
} from '@farfetch/blackout-client';

export type UseUserClosetItemsOptions = {
  enableAutoFetch?: boolean;
  fetchQuery?: GetUserClosetItemsQuery;
  fetchConfig?: Config | undefined;
};
