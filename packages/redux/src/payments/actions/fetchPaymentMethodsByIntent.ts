import { fetchPaymentMethodsByIntentFactory } from './factories';
import { getPaymentMethodsByIntent } from '@farfetch/blackout-client/payments';

/**
 * Fetch payment methods.
 *
 * @memberof module:payments/actions
 *
 * @name fetchPaymentMethodsByIntent
 *
 * @type {FetchPaymentMethodsByIntentThunkFactory}
 */
export default fetchPaymentMethodsByIntentFactory(getPaymentMethodsByIntent);
