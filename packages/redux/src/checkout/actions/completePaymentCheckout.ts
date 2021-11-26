import { completePaymentCheckoutFactory } from './factories';
import { patchCheckoutCompletePayment } from '@farfetch/blackout-client/checkout';

/**
 * Complete payment checkout.
 *
 * @memberof module:checkout/actions
 *
 * @name completePaymentCheckout
 *
 * @type {CompletePaymentCheckoutThunkFactory}
 */
export default completePaymentCheckoutFactory(patchCheckoutCompletePayment);
