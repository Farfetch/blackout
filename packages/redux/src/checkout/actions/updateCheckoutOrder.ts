import { patchCheckoutOrder } from '@farfetch/blackout-client';
import { updateCheckoutOrderFactory } from './factories';

/**
 * Update checkout order.
 */
export default updateCheckoutOrderFactory(patchCheckoutOrder);
