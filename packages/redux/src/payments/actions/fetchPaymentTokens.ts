import { fetchPaymentTokensFactory } from './factories';
import { getPaymentTokens } from '@farfetch/blackout-client/payments';

/**
 * Fetch payment tokens.
 *
 * @memberof module:payments/actions
 *
 * @name fetchPaymentTokens
 *
 * @type {FetchPaymentTokensThunkFactory}
 */
export default fetchPaymentTokensFactory(getPaymentTokens);
