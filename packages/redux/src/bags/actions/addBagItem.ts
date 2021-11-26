import { addBagItemFactory } from './factories';
import { postBagItem } from '@farfetch/blackout-client/bags';

/**
 * Adds a bag item with the given params.
 *
 * @memberof module:bags/actions
 *
 * @name addBagItem
 *
 * @type {AddBagItemThunkFactory}
 */

export default addBagItemFactory(postBagItem);
