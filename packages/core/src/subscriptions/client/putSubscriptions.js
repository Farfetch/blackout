import client, { adaptError } from '../../helpers/client';

/**
 * Method responsible for putting data to subscriptions endpoint on MKT API.
 *
 * @function putSubscriptions
 * @memberof module:subscriptions/client
 *
 * @param   {object} data - Payload to be sent on the body of the put request.
 * @param   {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise} Promise object.
 */
export default (data, config) =>
  client
    .put('/marketing/v1/subscriptions', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
