import { fetchGuestOrderLegacyFactory } from './factories/index.js';
import { getGuestOrderLegacy } from '@farfetch/blackout-client';

/**
 * Fetch guest order details using the legacy endpoint.
 */
export default fetchGuestOrderLegacyFactory(getGuestOrderLegacy);
