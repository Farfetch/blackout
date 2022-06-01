import { fetchPickupCapabilitiesFactory } from './factories';
import { getPickupCapabilities } from '@farfetch/blackout-client/returns';

/**
 * Fetch pickup capabilities with given id.
 */
export default fetchPickupCapabilitiesFactory(getPickupCapabilities);
