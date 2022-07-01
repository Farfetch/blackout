import { fetchReturnFactory } from './factories';
import { getReturn } from '@farfetch/blackout-client';

/**
 * Fetch return with given id.
 */
export default fetchReturnFactory(getReturn);
