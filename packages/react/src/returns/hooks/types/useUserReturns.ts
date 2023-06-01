import type {
  Config,
  GetUserReturnsLegacyData,
  GetUserReturnsQuery,
} from '@farfetch/blackout-client';

export type UseUserReturnsOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
  fetchQuery?: GetUserReturnsQuery;
  useLegacyGuestFlow?: boolean;
  guestUserEmail?: GetUserReturnsLegacyData['guestUserEmail'];
};
