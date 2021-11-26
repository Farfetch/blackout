import { fetchCreditBalanceFactory } from './factories';
import { postCheckCreditBalance } from '@farfetch/blackout-client/payments';

/**
 * Fetch credit balance.
 *
 * @memberof module:payments/actions
 *
 * @name fetchCreditBalance
 *
 * @type {FetchCreditBalanceThunkFactory}
 */
export default fetchCreditBalanceFactory(postCheckCreditBalance);
