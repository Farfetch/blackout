import { deletePaymentToken } from '@farfetch/blackout-client/payments';
import { removePaymentTokenFactory } from './factories';

/**
 * Remove payment token.
 */
export default removePaymentTokenFactory(deletePaymentToken);
