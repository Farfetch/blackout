import { putCheckoutOrderTags } from '@farfetch/blackout-client';
import { setTagsFactory } from './factories';

/**
 * Set tags.
 */
export default setTagsFactory(putCheckoutOrderTags);
