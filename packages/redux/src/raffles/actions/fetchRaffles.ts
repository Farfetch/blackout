import { getRaffles } from '@farfetch/blackout-client';
import fetchRafflesFactory from './factories/fetchRafflesFactory';

/**
 * Fetch raffles.
 */
export default fetchRafflesFactory(getRaffles);
