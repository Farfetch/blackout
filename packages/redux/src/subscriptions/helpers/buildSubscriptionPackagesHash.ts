import type { GetSubscriptionPackagesQuery } from '@farfetch/blackout-client';

/**
 * Creates a hash based on the subscription packages query.
 *
 * @param params - The params needed to create a hash.
 *
 * @returns The hash created.
 */
const buildSubscriptionPackagesHash = ({ id }: GetSubscriptionPackagesQuery) =>
  id.map(packageId => `id=${packageId}`).join('&');

export default buildSubscriptionPackagesHash;
