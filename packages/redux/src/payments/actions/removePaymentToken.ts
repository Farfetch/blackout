import { deletePaymentToken } from '@farfetch/blackout-client';
import { removePaymentTokenFactory } from './factories';

/**
 * Remove payment token.
 */
export default removePaymentTokenFactory(deletePaymentToken);
