import { fetchCreditBalanceFactory } from './factories';
import { postCheckCreditBalance } from '@farfetch/blackout-client/payments';

/**
 * Fetch credit balance.
 */
export default fetchCreditBalanceFactory(postCheckCreditBalance);
