import type { Config } from '../../index.js';
import type { Raffle, RaffleEstimation } from './raffles.types.js';
import type { RaffleEstimationQuery } from './rafflesQuery.types.js';

export type GetRaffleEstimation = (
  raffleId: Raffle['id'],
  query?: RaffleEstimationQuery,
  config?: Config,
) => Promise<RaffleEstimation>;
