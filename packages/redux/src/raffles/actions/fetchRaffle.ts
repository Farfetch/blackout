import { getRaffle } from '@farfetch/blackout-client';
import fetchRaffleFactory from './factories/fetchRaffleFactory';

/**
 * Fetch raffle by id.
 */
export default fetchRaffleFactory(getRaffle);
