import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetReferences } from './types';

/**
 * @typedef {object} GetReferencesQuery
 *
 * @alias GetReferencesQuery
 * @memberof module:returns/client
 *
 * @property {string} [guestOrderId] - Order identifier. Only required if
 * the user is not registered (guest).
 * @property {string} [guestUserEmail] - User email. Only required if
 * the user is not registered (guest).
 */

/**
 * Method responsible for obtaining a specific return reference.
 *
 * @function getReferences
 * @memberof module:returns/client
 *
 * @param {string} id - Return identifier.
 * @param {string} name - Reference name. Possible values: `ReturnNote`,
 * `ReturnCustomerRequestedAWB`,`ReturnLabelAWB`, `DropOffLocationsPage`.
 * @param {GetReferencesQuery} query - Query parameters.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getReferences: GetReferences = (id, name, query, config) =>
  client
    .get(join('/account/v1/returns', id, 'references', name, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getReferences;
