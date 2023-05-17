import type { FacetGroup } from './facetGroup.types.js';
import type { FacetType } from './facetTypeEnum.types.js';
import type { FilterSegment } from './filterSegment.types.js';
import type { GenderCode, PagedResponse } from '../../types/index.js';
import type { ProductsBreadcrumb } from './productsBreadcrumb.types.js';
import type { ProductSummary } from './productSummary.types.js';
import type { ShoppingConfig } from './shoppingConfig.types.js';

export enum SearchRedirect {
  Stopwords = 0,
  Percolation,
}

export type ProductListing = {
  name: string | null;
  products: PagedResponse<ProductSummary>;
  facetGroups: FacetGroup[];
  filterSegments: FilterSegment[];
  config: ShoppingConfig;
  didYouMean: string[];
  breadCrumbs: ProductsBreadcrumb[];
  searchTerm: string | null;
  facetsBaseUrl: string;
  _sorts: string[] | null;
  _clearUrl: string | null;
  _isClearHidden: boolean;
  gender: GenderCode | null;
  redirectInformation: {
    redirectUrl: string;
    matchedType: FacetType;
    matchedId: number;
    searchRedirectSourceFeature: SearchRedirect;
  } | null;
  genderName: string | null;
};
