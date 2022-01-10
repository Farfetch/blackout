import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PatchReturn } from './types';

/**
 * @typedef {object} PatchReturnData
 *
 * @alias PatchReturnData
 * @memberof module:returns/client
 *
 * @property {string} [start] - The date of the start of the return slot.
 * The value should be a timestamp.
 * @property {string} [end] - The date of the end of the return slot.
 * The value should be a timestamp.
 */

/**
 * @typedef {object} PatchReturnQuery
 *
 * @alias PatchReturnQuery
 * @memberof module:returns/client
 *
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * Method responsible for updating the pickup schedule of a return.
 *
 * @function patchReturn
 * @memberof module:returns/client
 *
 * @param {number} id - Return identifier.
 * @param {PatchReturnData} data - Request data.
 * @param {PatchReturnQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const patchReturn: PatchReturn = (id, data, query, config) =>
  client
    .patch(join('/account/v1/returns', id, { query }), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchReturn;
