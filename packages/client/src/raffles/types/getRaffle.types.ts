import type { Config } from '../../index.js';
import type { Raffle } from './raffles.types.js';

export type GetRaffle = (
  raffleId: Raffle['id'],
  config?: Config,
) => Promise<Raffle>;
