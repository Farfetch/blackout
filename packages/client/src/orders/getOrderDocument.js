import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for fetching a specific document of a certain order.
 *
 * @function getOrderDocuments
 * @memberof module:orders/client
 * @param {object} props - Props object.
 * @param {string} props.orderId - The identifier of the order.
 * @param {string} props.fileId - TThe identifier of the document.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default ({ orderId, fileId }, config) =>
  client
    .get(join('/account/v1/orders', orderId, 'documents', fileId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
