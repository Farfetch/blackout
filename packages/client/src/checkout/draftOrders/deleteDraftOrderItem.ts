import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteDraftOrderItem } from './types/index.js';

/**
 * Method responsible for deleting a draft order item
 *
 * @param draftOrderId - Universal identifier of the draft order.
 * @param itemId - draft order item identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteDraftOrderItem: DeleteDraftOrderItem = (
  draftOrderId,
  itemId,
  config,
) =>
  client
    .delete(
      join('/checkout/v1/draftOrders/', draftOrderId, 'items', itemId),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteDraftOrderItem;
