import { postRaffleParticipation } from '@farfetch/blackout-client';
import createRaffleParticipationFactory from './factories/createRaffleParticipationFactory.js';

/**
 * Create a participation for a raffle.
 */
export default createRaffleParticipationFactory(postRaffleParticipation);
