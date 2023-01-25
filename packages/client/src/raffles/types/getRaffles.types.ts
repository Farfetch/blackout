import type { Config } from '../..';
import type { Raffles } from './raffles.types';
import type { RafflesQuery } from './rafflesQuery.types';

export type GetRaffles = (
  query?: RafflesQuery,
  config?: Config,
) => Promise<Raffles>;
