import { fetchReturnPickupCapabilitiesFactory } from './factories';
import { getReturnPickupCapabilities } from '@farfetch/blackout-client/returns';

/**
 * Fetch pickup capabilities with given id.
 */
export default fetchReturnPickupCapabilitiesFactory(
  getReturnPickupCapabilities,
);
