import { completePaymentCheckoutFactory } from './factories';
import { patchCheckoutCompletePayment } from '@farfetch/blackout-client/checkout';

/**
 * Complete payment checkout.
 */
export default completePaymentCheckoutFactory(patchCheckoutCompletePayment);
