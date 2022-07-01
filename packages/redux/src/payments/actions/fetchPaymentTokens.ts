import { fetchPaymentTokensFactory } from './factories';
import { getPaymentTokens } from '@farfetch/blackout-client';

/**
 * Fetch payment tokens.
 */
export default fetchPaymentTokensFactory(getPaymentTokens);
