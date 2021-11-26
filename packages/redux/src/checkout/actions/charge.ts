import { chargeFactory } from './factories';
import { postCharges } from '@farfetch/blackout-client/checkout';

/**
 * Charge checkout.
 *
 * @memberof module:checkout/actions
 *
 * @name charge
 *
 * @type {ChargeThunkFactory}
 */
export default chargeFactory(postCharges);
