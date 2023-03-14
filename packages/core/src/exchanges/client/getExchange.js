import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for obtaining an exchange by its id.
 *
 * @function getExchange
 * @memberof module:exchanges/client
 *
 * @param {string} id - Exchange identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, config) =>
  client
    .get(join('/account/v1/exchanges', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
