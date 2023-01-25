import { getRaffleEstimation } from '@farfetch/blackout-client';
import fetchRaffleEstimationFactory from './factories/fetchRaffleEstimationFactory';

/**
 * Fetch raffle estimation by raffle id.
 */
export default fetchRaffleEstimationFactory(getRaffleEstimation);
