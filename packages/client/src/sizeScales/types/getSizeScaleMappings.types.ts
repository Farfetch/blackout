import type { SizeScaleMapping } from './sizeScaleMapping.types';
import type { SizeScaleMappingsQuery } from './sizeScaleMappingsQuery.types';

export type GetSizeScaleMappings = (
  query: SizeScaleMappingsQuery,
  config?: Record<string, unknown>,
) => Promise<SizeScaleMapping>;
