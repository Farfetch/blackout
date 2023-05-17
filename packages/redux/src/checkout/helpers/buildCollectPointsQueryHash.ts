import type { GetCollectPointsQuery } from '@farfetch/blackout-client';

/**
 * Creates a hash based on the get collection points query.
 *
 * @param query - Get collect points query object.
 *
 * @returns The unique hash for the passed query.
 */
const buildCollectPointsQueryHash = (query?: GetCollectPointsQuery) => {
  if (!query) {
    return '';
  }

  return `${query.orderId ?? 0}|${query.isStockAvailable ?? false}|${
    query.isClickAndCollectAvailable ?? false
  }`;
};

export default buildCollectPointsQueryHash;
