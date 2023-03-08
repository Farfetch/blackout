import type { FacetType } from './facetTypeEnum.types.js';
import type { GenderCode } from '../../types/index.js';

export type FilterSegment = {
  order: number;
  type: FacetType;
  key: string;
  gender: GenderCode | null;
  value: number;
  valueUpperBound: number;
  slug: string;
  description: string;
  deep: number;
  parentId: number;
  fromQueryString: boolean;
  negativeFilter: boolean;
};
