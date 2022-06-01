import { fetchPaymentTokensFactory } from './factories';
import { getPaymentTokens } from '@farfetch/blackout-client/payments';

/**
 * Fetch payment tokens.
 */
export default fetchPaymentTokensFactory(getPaymentTokens);
