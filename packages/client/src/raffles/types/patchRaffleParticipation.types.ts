import type { Config } from '../..';
import type { Raffle, RaffleParticipation } from './raffles.types';

export type PatchRaffleParticipationOperation = {
  value: unknown;
  path: string;
  op: string;
  from: string;
};

export type PatchRaffleParticipation = (
  raffleId: Raffle['id'],
  participationId: RaffleParticipation['id'],
  data: PatchRaffleParticipationOperation[],
  config?: Config,
) => Promise<number>;
