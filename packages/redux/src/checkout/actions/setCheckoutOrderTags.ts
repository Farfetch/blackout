import { putCheckoutOrderTags } from '@farfetch/blackout-client';
import { setCheckoutOrderTagsFactory } from './factories';

/**
 * Set checkout order tags.
 */
export default setCheckoutOrderTagsFactory(putCheckoutOrderTags);
