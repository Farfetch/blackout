import { getSet } from '../../products/client';

/**
 * Method responsible for getting the recommended set data.
 *
 * @function getRecommendedSet
 * @memberof module:recommendedSets/client
 *
 * @param {string} id - Recommended set identifier.
 * @param {object} [query] - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, query, config) => getSet(id, query, config);
