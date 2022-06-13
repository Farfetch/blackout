// @ts-ignore This is needed while products aren't migrated
import { fetchRecommendedSetFactory } from './factories';
import { getRecommendedSet } from '@farfetch/blackout-client';

/**
 * Fetch a recommended set by id.
 */
export const fetchRecommendedSet =
  fetchRecommendedSetFactory(getRecommendedSet);
