import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetUserAttributesQuery
 * @property {string} channelCode - Channel code.
 * @property {string} type - Possible value: Castle, Generic,
 * AddressPredictionProvider, FarfetchLogin.
 */

/**
 * Method responsible for getting all the user attributes.
 *
 * @function getUserAttributes
 * @memberof module:profile/client
 *
 * @param {number} userId - The user's id.
 * @param {GetUserAttributesQuery} [query] - Query object with search terms to apply.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, query, config) =>
  client
    .get(join('/account/v1/users', userId, '/attributes', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
