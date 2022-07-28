import type { FacetType } from './facetTypeEnum.types';
import type { GenderCode } from '../../types';

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
