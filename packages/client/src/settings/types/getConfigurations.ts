import type { Config } from '../../index.js';
import type { Configurations } from './configurations.js';
import type { ConfigurationsQuery } from './configurationsQuery.js';

export type GetConfigurations = (
  query?: ConfigurationsQuery,
  config?: Config,
) => Promise<Configurations>;
