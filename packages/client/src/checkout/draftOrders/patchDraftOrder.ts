import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { PatchDraftOrder } from './types/index.js';

/**
 * Method responsible for updating a Draft Order
 *
 * @param id - Universal identifier of the draft order.
 * @param data - Order item properties to update
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchDraftOrder: PatchDraftOrder = (id, data, config) =>
  client
    .patch(join('/checkout/v1/draftOrders/', id), data, config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default patchDraftOrder;
