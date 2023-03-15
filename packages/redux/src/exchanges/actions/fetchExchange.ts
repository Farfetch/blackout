import { fetchExchangeFactory } from './factories/index.js';
import { getExchange } from '@farfetch/blackout-client';

/**
 * Fetch exchange with given id.
 */
export default fetchExchangeFactory(getExchange);
