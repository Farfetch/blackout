import { fetchUserCreditBalanceFactory } from './factories/index.js';
import { getUserCreditBalance } from '@farfetch/blackout-client';

/**
 * Fetch user credit balance.
 */
export default fetchUserCreditBalanceFactory(getUserCreditBalance);
