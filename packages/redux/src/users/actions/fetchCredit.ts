import { fetchCreditFactory } from './factories';
import { getCredit } from '@farfetch/blackout-client/users';

/**
 * Fetch user credit balance.
 */
export default fetchCreditFactory(getCredit);
