import { fetchBagOperationFactory } from './factories/index.js';
import { getBagOperation } from '@farfetch/blackout-client';

/**
 * Fetches the bag operation.
 */
export default fetchBagOperationFactory(getBagOperation);
