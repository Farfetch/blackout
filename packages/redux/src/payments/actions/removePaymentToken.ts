import { deletePaymentToken } from '@farfetch/blackout-client';
import { removePaymentTokenFactory } from './factories/index.js';

/**
 * Remove payment token.
 */
export default removePaymentTokenFactory(deletePaymentToken);
