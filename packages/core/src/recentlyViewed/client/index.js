import { warnDeprecatedMethod } from '../../helpers';

/**
 * Recently Viewed clients.
 *
 * @module recentlyViewed/client
 * @category Recently Viewed
 * @subcategory Clients
 */

export { default as getRecentlyViewedProducts } from './getRecentlyViewedProducts';
export { default as deleteRecentlyViewedProduct } from './deleteRecentlyViewedProduct';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/recentlyViewed/client',
  '@farfetch/blackout-core/recentlyViewed',
);
