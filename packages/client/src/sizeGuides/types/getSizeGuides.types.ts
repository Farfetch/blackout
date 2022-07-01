import type { Config } from '../..';
import type { SizeGuide } from './sizeGuides.types';
import type { SizeGuidesQuery } from './sizeGuidesQuery.types';

export type GetSizeGuides = (
  query?: SizeGuidesQuery,
  config?: Config,
) => Promise<SizeGuide[]>;
