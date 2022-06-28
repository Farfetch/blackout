import { deleteCheckoutOrderItem } from '@farfetch/blackout-client';
import removeCheckoutOrderItemFactory from './factories/removeCheckoutOrderItemFactory';

/**
 * Remove checkout order item
 */
export default removeCheckoutOrderItemFactory(deleteCheckoutOrderItem);
