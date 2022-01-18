import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching the documents of the respective order.
 *
 * @function getOrderDocuments
 * @memberof module:orders/client
 * @param {object} props - Props object.
 * @param {string} props.orderId - The identifier of the order.
 * @param {Array} [props.types] - A list of document types to filter (Ex: ['ComercialInvoice']).+.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ orderId, types }, config) =>
  client
    .get(
      join('/account/v1/orders', orderId, 'documents', { query: { types } }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
