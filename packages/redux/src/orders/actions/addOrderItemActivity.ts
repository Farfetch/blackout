import { addOrderItemActivityFactory } from './factories';
import { postOrderItemActivity } from '@farfetch/blackout-client';

/**
 * Add activity to a certain order item.
 */
export default addOrderItemActivityFactory(postOrderItemActivity);
