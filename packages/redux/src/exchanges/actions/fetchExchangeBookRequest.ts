import { fetchExchangeBookRequestFactory } from './factories/index.js';
import { getExchangeBookRequest } from '@farfetch/blackout-client';

/**
 * Fetch exchange book request with given id.
 */
export default fetchExchangeBookRequestFactory(getExchangeBookRequest);
