import type { Config } from '../..';
import type { Raffle, RaffleEstimation } from './raffles.types';
import type { RaffleEstimationQuery } from './rafflesQuery.types';

export type GetRaffleEstimation = (
  raffleId: Raffle['id'],
  query?: RaffleEstimationQuery,
  config?: Config,
) => Promise<RaffleEstimation>;
