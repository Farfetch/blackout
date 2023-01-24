import type { FacetGroup } from './facetGroup.types.js';
import type { FilterSegment } from './filterSegment.types.js';
import type { GenderCode, PagedResponse } from '../../types/index.js';
import type { ProductsBreadcrumb } from './productsBreadcrumb.types.js';
import type { ProductSummary } from './productSummary.types.js';
import type { ShoppingConfig } from './shoppingConfig.types.js';

export type ProductSet = {
  id: number;
  name: string;
  products: PagedResponse<ProductSummary>;
  facetGroups: FacetGroup[];
  filterSegments: FilterSegment[];
  config: ShoppingConfig;
  breadCrumbs: ProductsBreadcrumb[];
  searchTerm: string | null;
  facetsBaseUrl: string;
  _sorts: string[] | null;
  _clearUrl: string | null;
  _isClearHidden: boolean;
  gender: GenderCode;
  genderName: string;
};
