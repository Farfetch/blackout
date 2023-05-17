import type { Config } from '../../index.js';
import type { Raffle, RaffleParticipation } from './raffles.types.js';

export type GetRaffleParticipation = (
  raffleId: Raffle['id'],
  participationId: RaffleParticipation['id'],
  config?: Config,
) => Promise<RaffleParticipation>;
