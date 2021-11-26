import type { Configurations } from './configurations';
import type { Query } from './query';

export type GetConfigurations = (
  query: Query,
  config?: Record<string, unknown>,
) => Promise<Configurations>;
