import type {
  Config,
  GetUserCreditMovementsQuery,
} from '@farfetch/blackout-client';

export type UseUserCreditOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config | undefined;
  queryUserCreditMovements?: GetUserCreditMovementsQuery;
};
