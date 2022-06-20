import { deleteCheckoutOrderItem } from '@farfetch/blackout-client/checkout';
import removeCheckoutOrderItemFactory from './factories/removeCheckoutOrderItemFactory';

/**
 * Remove checkout order item
 */
export default removeCheckoutOrderItemFactory(deleteCheckoutOrderItem);
