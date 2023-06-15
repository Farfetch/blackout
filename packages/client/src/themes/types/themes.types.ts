import type { Config, JSONValue } from '../../types/index.js';

export type Theme = {
  id: string;
  code: string;
  version: number;
  dependencies: Theme[];
  style: JSONValue;
  createdDate: string;
};

export type QueryTheme = {
  // The version number of a theme.
  version?: number;
};

export type GetTheme = (
  code: string,
  query?: QueryTheme,
  config?: Config,
) => Promise<Theme>;
