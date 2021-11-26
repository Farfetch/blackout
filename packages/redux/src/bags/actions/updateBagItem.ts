import { patchBagItem } from '@farfetch/blackout-client/bags';
import { updateBagItemFactory } from './factories';

/**
 * Updates a specific bag item with the given params.
 *
 * @memberof module:bags/actions
 *
 * @name updateBagItem
 *
 * @type {UpdateBagItemThunkFactory}
 */

export default updateBagItemFactory(patchBagItem);
