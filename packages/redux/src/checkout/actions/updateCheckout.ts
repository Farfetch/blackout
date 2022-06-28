import { patchCheckoutOrder } from '@farfetch/blackout-client';
import { updateCheckoutFactory } from './factories';

/**
 * Update checkout.
 */
export default updateCheckoutFactory(patchCheckoutOrder);
