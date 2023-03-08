import { getRaffle } from '@farfetch/blackout-client';
import fetchRaffleFactory from './factories/fetchRaffleFactory.js';

/**
 * Fetch raffle by id.
 */
export default fetchRaffleFactory(getRaffle);
