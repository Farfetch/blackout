import { getRaffleParticipation } from '@farfetch/blackout-client';
import fetchRaffleParticipationFactory from './factories/fetchRaffleParticipationFactory';

/**
 * Fetch raffle participation by raffle id and participation id.
 */
export default fetchRaffleParticipationFactory(getRaffleParticipation);
