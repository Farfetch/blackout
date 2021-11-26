import type { FacetTypeEnum } from './facetTypeEnum.types';
import type { FacetValue } from './facetValue.types';

export type FacetGroup = {
  deep: number;
  description: string;
  type: FacetTypeEnum;
  values: FacetValue[][];
  order: number;
  key: string;
  format: string;
  _clearUrl: string;
  _isClearHidden: boolean;
  _isClosed: boolean;
  dynamic: number;
};
