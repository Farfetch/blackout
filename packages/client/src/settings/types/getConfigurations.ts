import type { Config } from '../..';
import type { Configurations } from './configurations';
import type { ConfigurationsQuery } from './configurationsQuery';

export type GetConfigurations = (
  query: ConfigurationsQuery,
  config?: Config,
) => Promise<Configurations>;
