import { addBagItemFactory } from './factories/index.js';
import { postBagItem } from '@farfetch/blackout-client';

/**
 * Adds a bag item with the given params.
 */

export default addBagItemFactory(postBagItem);
