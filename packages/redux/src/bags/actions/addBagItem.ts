import { addBagItemFactory } from './factories';
import { postBagItem } from '@farfetch/blackout-client';

/**
 * Adds a bag item with the given params.
 */

export default addBagItemFactory(postBagItem);
