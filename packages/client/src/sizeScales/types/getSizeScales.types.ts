import type { Config } from '../../types';
import type { SizeScale } from './sizeScale.types';
import type { SizeScalesQuery } from './sizeScalesQuery.types';

export type GetSizeScales = (
  query: SizeScalesQuery,
  config?: Config,
) => Promise<SizeScale[]>;
