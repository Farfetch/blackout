import { fetchPaymentTokensFactory } from './factories/index.js';
import { getPaymentTokens } from '@farfetch/blackout-client';

/**
 * Fetch payment tokens.
 */
export default fetchPaymentTokensFactory(getPaymentTokens);
