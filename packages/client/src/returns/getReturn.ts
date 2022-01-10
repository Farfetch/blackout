import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetReturn } from './types';

/**
 * @typedef {object} GetReturnQuery
 *
 * @alias GetReturnQuery
 * @memberof module:returns/client
 *
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * Method responsible for obtaining a specific return.
 *
 * @function getReturn
 * @memberof module:returns/client
 *
 * @param {number} id - Return identifier.
 * @param {GetReturnQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getReturn: GetReturn = (id, query, config) =>
  client
    .get(join('/account/v1/returns', id, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getReturn;
