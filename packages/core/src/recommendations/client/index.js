import { warnDeprecatedMethod } from '../../helpers';

/**
 * Recommendations clients.
 *
 * @module recommendations/client
 * @category Recommendations
 * @subcategory Clients
 */

export { default as getProductRecommendations } from './getProductRecommendations';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/recommendations/client',
  '@farfetch/blackout-core/recommendations',
);
