import { chargeFactory } from './factories';
import { postCharges } from '@farfetch/blackout-client/payments';

/**
 * Payments charge. To be used by pay-by-link 1.5 only.
 *
 * @memberof module:payments/actions
 *
 * @name charge
 *
 * @type {ChargeThunkFactory}
 */
export default chargeFactory(postCharges);
