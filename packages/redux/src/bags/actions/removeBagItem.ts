import { deleteBagItem } from '@farfetch/blackout-client/bags';
import { removeBagItemFactory } from './factories';

/**
 * Removes a specific bag item by id.
 */

export default removeBagItemFactory(deleteBagItem);
