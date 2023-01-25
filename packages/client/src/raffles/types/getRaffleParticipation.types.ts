import type { Config } from '../..';
import type { Raffle, RaffleParticipation } from './raffles.types';

export type GetRaffleParticipation = (
  raffleId: Raffle['id'],
  participationId: RaffleParticipation['id'],
  config?: Config,
) => Promise<RaffleParticipation>;
