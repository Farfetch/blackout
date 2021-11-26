import { deletePaymentToken } from '@farfetch/blackout-client/payments';
import { removePaymentTokenFactory } from './factories';

/**
 * Remove payment token.
 *
 * @memberof module:payments/actions
 *
 * @name removePaymentToken
 *
 * @type {RemovePaymentTokenThunkFactory}
 */
export default removePaymentTokenFactory(deletePaymentToken);
