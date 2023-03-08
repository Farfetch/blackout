import { deleteBagItem } from '@farfetch/blackout-client';
import { removeBagItemFactory } from './factories/index.js';

/**
 * Removes a specific bag item by id.
 */

export default removeBagItemFactory(deleteBagItem);
