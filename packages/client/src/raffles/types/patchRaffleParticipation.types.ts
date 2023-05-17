import type { Config } from '../../index.js';
import type { OpPatch } from 'json-patch';
import type { Raffle, RaffleParticipation } from './raffles.types.js';

export type PatchRaffleParticipationOperation = OpPatch;

export type PatchRaffleParticipation = (
  raffleId: Raffle['id'],
  participationId: RaffleParticipation['id'],
  data: PatchRaffleParticipationOperation[],
  config?: Config,
) => Promise<number>;
