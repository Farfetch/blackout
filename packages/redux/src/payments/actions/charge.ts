import { chargeFactory } from './factories';
import { postCharges } from '@farfetch/blackout-client/payments';

/**
 * Payments charge. To be used by pay-by-link 1.5 only.
 */
export default chargeFactory(postCharges);
