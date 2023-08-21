import { deleteUserClosetItem } from '@farfetch/blackout-client';
import { removeUserClosetItemFactory } from './factories/index.js';

/**
 * Remove user closet item.
 */
export default removeUserClosetItemFactory(deleteUserClosetItem);
