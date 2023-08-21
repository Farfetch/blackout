import { fetchUserClosetItemsFactory } from './factories/index.js';
import { getUserClosetItems } from '@farfetch/blackout-client';

/**
 * Fetch user closet items.
 */
export default fetchUserClosetItemsFactory(getUserClosetItems);
