import type { Config } from '../../index.js';
import type { Raffles } from './raffles.types.js';
import type { RafflesQuery } from './rafflesQuery.types.js';

export type GetRaffles = (
  query?: RafflesQuery,
  config?: Config,
) => Promise<Raffles>;
