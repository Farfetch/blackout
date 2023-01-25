import type { Config } from '../..';
import type { Raffle } from './raffles.types';

export type GetRaffle = (
  raffleId: Raffle['id'],
  config?: Config,
) => Promise<Raffle>;
