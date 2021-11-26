import type { SizeGuide } from './sizeGuides.types';
import type { SizeGuidesQuery } from './sizeGuidesQuery.types';

export type GetSizeGuides = (
  query?: SizeGuidesQuery,
  config?: Record<string, unknown>,
) => Promise<SizeGuide[]>;
