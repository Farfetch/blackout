import { fetchBagOperationFactory } from './factories';
import { getBagOperation } from '@farfetch/blackout-client';

/**
 * Fetches the bag operation.
 */
export default fetchBagOperationFactory(getBagOperation);
