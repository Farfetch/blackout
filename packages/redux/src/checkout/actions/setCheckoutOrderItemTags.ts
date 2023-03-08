import { putCheckoutOrderItemTags } from '@farfetch/blackout-client';
import { setCheckoutOrderItemTagsFactory } from './factories/index.js';

/**
 * Set checkout order item tags.
 */
export default setCheckoutOrderItemTagsFactory(putCheckoutOrderItemTags);
