import type { AccountSettingsQuery } from '@farfetch/blackout-client';

/**
 * Function that hashes the query params of the account settings request.
 */
export const buildAccountSettingsQuery = (
  query?: AccountSettingsQuery,
): string => {
  const hash = query ? `${query.type}_${query.channelCode}` : 'noqueries';

  return hash;
};
