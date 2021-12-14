import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} PostReturnData
 *
 * @alias PostReturnData
 * @memberof module:returns/client
 *
 * @property {object} [currentReturn] - Details of the return.
 */

/**
 * @typedef {object} PostReturnQuery
 *
 * @alias PostReturnQuery
 * @memberof module:returns/client
 *
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * Method responsible for creating a return.
 *
 * @function postReturn
 * @memberof module:returns/client
 *
 * @param {PostReturnData} data - Request data.
 * @param {PostReturnQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (data, query, config) =>
  client
    .post(join('/legacy/v1/returns', { query }), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
