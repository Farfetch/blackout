import type { Config } from '../../types/index.js';
import type { SizeScale } from './sizeScale.types.js';
import type { SizeScalesQuery } from './sizeScalesQuery.types.js';

export type GetSizeScales = (
  query: SizeScalesQuery,
  config?: Config,
) => Promise<SizeScale[]>;
