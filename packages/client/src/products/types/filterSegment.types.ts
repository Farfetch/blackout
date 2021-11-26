import type { FacetTypeEnum } from './facetTypeEnum.types';
import type { GenderEnum } from '../../types';

export type FilterSegment = {
  order: number;
  type: FacetTypeEnum;
  key: string;
  gender: GenderEnum;
  value: number;
  valueUpperBound: number;
  slug: string;
  description: string;
  deep: number;
  parentId: number;
  fromQueryString: boolean;
  negativeFilter: boolean;
};
