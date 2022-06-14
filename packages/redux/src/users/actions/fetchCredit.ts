import { fetchCreditFactory } from './factories';
import { getUserCredit } from '@farfetch/blackout-client/users';

/**
 * Fetch user credit balance.
 */
export default fetchCreditFactory(getUserCredit);
