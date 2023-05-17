import type { Config } from '../../index.js';
import type { Configuration } from './configuration.js';
import type { ConfigurationQuery } from './configurationQuery.js';

export type GetConfiguration = (
  code: Configuration['code'],
  query?: ConfigurationQuery,
  config?: Config,
) => Promise<Configuration>;
