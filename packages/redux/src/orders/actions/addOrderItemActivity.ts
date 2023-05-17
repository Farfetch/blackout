import { addOrderItemActivityFactory } from './factories/index.js';
import { postOrderItemActivity } from '@farfetch/blackout-client';

/**
 * Add activity to a certain order item.
 */
export default addOrderItemActivityFactory(postOrderItemActivity);
