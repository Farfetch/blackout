import { chargeFactory } from './factories';
import { postCharges } from '@farfetch/blackout-client/checkout';

/**
 * Charge checkout.
 */
export default chargeFactory(postCharges);
