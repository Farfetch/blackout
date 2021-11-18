import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for retrieving data from subscriptions endpoint on MKT API.
 *
 * @function getSubscriptions
 * @memberof module:subscriptions/client
 *
 * @param   {object} query - Query parameters to apply.
 * @param   {number} query.customerId - Id of the user to retrieve subscriptions from. Either this or `recipientHash` must be provided.
 * @param   {string} query.recipientHash - SHA256 hash of the email for guest users. Either this or `customerId` must be provided.
 * @param   {object} [config] - Custom configurations to send to the client instance (axios).
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
