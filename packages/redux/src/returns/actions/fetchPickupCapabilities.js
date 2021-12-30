import { fetchPickupCapabilitiesFactory } from './factories';
import { getPickupCapabilities } from '@farfetch/blackout-client/returns';

/**
 * Get pickup capabilities.
 *
 * @memberof module:returns/actions
 *
 * @name getPickupCapabilities
 *
 * @type {GetPickupCapabilitiesThunkFactory}
 */
export default fetchPickupCapabilitiesFactory(getPickupCapabilities);
