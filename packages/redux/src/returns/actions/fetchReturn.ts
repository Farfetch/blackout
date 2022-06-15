import { fetchReturnFactory } from './factories';
import { getReturn } from '@farfetch/blackout-client/returns';

/**
 * Fetch return with given id.
 */
export default fetchReturnFactory(getReturn);