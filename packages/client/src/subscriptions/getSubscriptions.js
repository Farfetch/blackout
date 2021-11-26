import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * @typedef {object} GetSubscriptionsQuery
 *
 * @alias GetSubscriptionsQuery
 * @memberof module:subscriptions
 *
 * @property {number} customerId - User id. Use this when you have a registered user. This parameter is mutually exclusive with `recipientHash`.
 * @property {string} recipientHash - Hash of the recipient's email. Use this when you do not have a registered user. This parameter is mutually exclusive with `customerId`.
 */

/**
 * Method responsible for retrieving data from subscriptions endpoint on MKT API.
 *
 * @function getSubscriptions
 * @memberof module:subscriptions
 *
 * @param {GetSubscriptionsQuery} query - Query parameters to apply.
 * @param {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise} Promise object.
 */
export default (query, config) =>
  client
    .get(
      join('/marketing/v1/subscriptions', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
