import type { GetSubscriptionPackagesQuery } from '@farfetch/blackout-client';

/**
 * Creates a hash based on the subscription packages query.
 *
 * @param params - The params needed to create a hash.
 *
 * @returns The hash created.
 */
const generateSubscriptionPackagesHash = (
  query?: GetSubscriptionPackagesQuery,
) => {
  if (!query) {
    return '';
  }

  return query.id.map(packageId => `id=${packageId}`).join('&');
};

export default generateSubscriptionPackagesHash;
