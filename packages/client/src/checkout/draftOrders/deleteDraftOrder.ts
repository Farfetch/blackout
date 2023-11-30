import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteDraftOrder } from './types/index.js';

/**
 * Method responsible for deleting a Draft Order item
 *
 * @param id - Universal identifier of the draft order.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteDraftOrder: DeleteDraftOrder = (id, config) =>
  client
    .delete(join('/checkout/v1/draftOrders/', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteDraftOrder;
