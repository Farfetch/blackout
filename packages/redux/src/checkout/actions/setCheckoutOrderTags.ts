import { putCheckoutOrderTags } from '@farfetch/blackout-client';
import { setCheckoutOrderTagsFactory } from './factories/index.js';

/**
 * Set checkout order tags.
 */
export default setCheckoutOrderTagsFactory(putCheckoutOrderTags);
