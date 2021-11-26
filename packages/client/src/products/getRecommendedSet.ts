import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetRecommendedSet } from './types';

/**
 * Method responsible for getting the information of a specific recommended set.
 * This does not return a listing like a regular set, but instead a list of
 * product ids - which may have stock or not. A regular set doesn't return products
 * that are OOS, so this endpoint is to fill that gap.
 *
 * @memberof module:recommendedSets/client
 *
 * @param {number} id - The identifier of the recommended set.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getRecommendedSet: GetRecommendedSet = (id, config) =>
  client
    .get(join('/commerce/v1/recommendedsets', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getRecommendedSet;
