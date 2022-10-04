import type { Config } from '../..';
import type { Configuration } from './configuration';
import type { ConfigurationQuery } from './configurationQuery';

export type GetConfiguration = (
  code: Configuration['code'],
  query: ConfigurationQuery,
  config?: Config,
) => Promise<Configuration>;
