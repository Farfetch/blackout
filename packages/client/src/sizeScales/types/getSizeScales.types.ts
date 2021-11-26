import type { SizeScale } from './sizeScale.types';
import type { SizeScalesQuery } from './sizeScalesQuery.types';

export type GetSizeScales = (
  query: SizeScalesQuery,
  config?: Record<string, unknown>,
) => Promise<SizeScale[]>;
