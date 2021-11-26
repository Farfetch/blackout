import { deleteBagItem } from '@farfetch/blackout-client/bags';
import { removeBagItemFactory } from './factories';

/**
 * Removes a specific bag item by id.
 *
 * @memberof module:bags/actions
 *
 * @name removeBagItem
 *
 * @type {RemoveBagItemThunkFactory}
 */

export default removeBagItemFactory(deleteBagItem);
