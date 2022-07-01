import type { Config } from '../..';
import type { Configurations } from './configurations';
import type { Query } from './query';

export type GetConfigurations = (
  query: Query,
  config?: Config,
) => Promise<Configurations>;
