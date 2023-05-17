import { getRaffles } from '@farfetch/blackout-client';
import fetchRafflesFactory from './factories/fetchRafflesFactory.js';

/**
 * Fetch raffles.
 */
export default fetchRafflesFactory(getRaffles);
