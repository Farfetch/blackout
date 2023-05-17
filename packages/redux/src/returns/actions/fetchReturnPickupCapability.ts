import { fetchReturnPickupCapabilityFactory } from './factories/index.js';
import { getReturnPickupCapability } from '@farfetch/blackout-client';

/**
 * Fetch return pickup capability for a specific return and pickup day.
 */
export default fetchReturnPickupCapabilityFactory(getReturnPickupCapability);
