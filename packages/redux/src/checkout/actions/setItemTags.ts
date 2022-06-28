import { putCheckoutOrderItemTags } from '@farfetch/blackout-client';
import { setItemTagsFactory } from './factories';

/**
 * Set item tags.
 */
export default setItemTagsFactory(putCheckoutOrderItemTags);
