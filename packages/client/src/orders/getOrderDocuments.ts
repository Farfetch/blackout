import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetOrderDocuments } from './types';

/**
 * Method responsible for fetching the documents of the respective order.
 *
 * @function getOrderDocuments
 * @memberof module:orders/client
 * @param {string} id - The identifier of the order.
 * @param {Array} [types] - A list of document types to filter (Ex: ['ComercialInvoice']).+.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const getOrderDocuments: GetOrderDocuments = (id, types, config) =>
  client
    .get(
      join('/account/v1/orders', id, 'documents', { query: { types } }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getOrderDocuments;
