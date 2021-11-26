import { fetchPaymentMethodsFactory } from './factories';
import { getPaymentMethods } from '@farfetch/blackout-client/payments';

/**
 * Fetch payment methods.
 *
 * @memberof module:payments/actions
 *
 * @name fetchPaymentMethods
 *
 * @type {FetchPaymentMethodsThunkFactory}
 */
export default fetchPaymentMethodsFactory(getPaymentMethods);
