import type { FacetType } from './facetTypeEnum.types';
import type { Gender } from '../../types';

export type FilterSegment = {
  order: number;
  type: FacetType;
  key: string;
  gender: Gender;
  value: number;
  valueUpperBound: number;
  slug: string;
  description: string;
  deep: number;
  parentId: number;
  fromQueryString: boolean;
  negativeFilter: boolean;
};
