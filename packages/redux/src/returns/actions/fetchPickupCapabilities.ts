import { fetchPickupCapabilitiesFactory } from './factories';
import { getPickupCapabilities } from '@farfetch/blackout-client/returns';

/**
 * Fetch pickup capabilities with given id.
 *
 * @memberof module:returns/actions
 *
 * @function fetchPickupCapabilities
 *
 * @type {FetchPickupCapabilitiesThunkFactory}
 */
export default fetchPickupCapabilitiesFactory(getPickupCapabilities);
