import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetDraftOrders } from './types/index.js';

/**
 * Method responsible for fetching the draft orders.
 *
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getDraftOrders: GetDraftOrders = (query, config) =>
  client
    .get(join('/checkout/v1/draftOrders', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getDraftOrders;
