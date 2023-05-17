import type { Config } from '../../index.js';
import type { SizeGuide } from './sizeGuides.types.js';
import type { SizeGuidesQuery } from './sizeGuidesQuery.types.js';

export type GetSizeGuides = (
  query?: SizeGuidesQuery,
  config?: Config,
) => Promise<SizeGuide[]>;
