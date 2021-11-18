import { warnDeprecatedMethod } from '../../helpers';

warnDeprecatedMethod(
  '@farfetch/blackout-core',
  '@farfetch/blackout-core/recommendedSets/client',
  '@farfetch/blackout-core/recommendedSets',
);

/**
 * Recommended sets clients.
 *
 * @module recommendedSets/client
 * @category Recommended sets
 * @subcategory Clients
 */
export { default as getRecommendedSet } from './getRecommendedSet';
