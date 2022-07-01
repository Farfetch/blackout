import { fetchUserCreditBalanceFactory } from './factories';
import { getUserCreditBalance } from '@farfetch/blackout-client';

/**
 * Fetch user credit balance.
 */
export default fetchUserCreditBalanceFactory(getUserCreditBalance);
