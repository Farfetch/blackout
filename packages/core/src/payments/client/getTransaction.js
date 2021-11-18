import client, { adaptError } from '../../helpers/client';

/**
 * Method responsible for loading a Transaction from a link.
 *
 * @function getTransaction
 * @memberof module:payments/client
 *
 * @param {string} id - Guid that represents the Order on a link.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, config) =>
  client
    .get(`/checkout/v1/transactions/${id}`, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
