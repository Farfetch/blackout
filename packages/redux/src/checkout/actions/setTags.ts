import { putTags } from '@farfetch/blackout-client/checkout';
import { setTagsFactory } from './factories';

/**
 * Set tags.
 *
 * @memberof module:checkout/actions
 *
 * @name setTags
 *
 * @returns {SetTagsThunkFactory}
 */
export default setTagsFactory(putTags);
