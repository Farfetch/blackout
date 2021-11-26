import { putItemTags } from '@farfetch/blackout-client/checkout';
import { setItemTagsFactory } from './factories';

/**
 * Set item tags.
 *
 * @memberof module:checkout/actions
 *
 * @name setItemTags
 *
 * @returns {SetItemTagsThunkFactory}
 */
export default setItemTagsFactory(putItemTags);
