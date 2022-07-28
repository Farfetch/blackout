import type { BreadCrumb } from './breadCrumb.types';
import type { FacetGroup } from './facetGroup.types';
import type { FacetType } from './facetTypeEnum.types';
import type { FilterSegment } from './filterSegment.types';
import type { GenderCode, PagedResponse } from '../../types';
import type { ProductSummary } from './productSummary.types';
import type { ShoppingConfig } from './shoppingConfig.types';

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
  breadCrumbs: BreadCrumb[];
  searchTerm: string | null;
  facetsBaseUrl: string;
  _sorts: string[] | null;
  _clearUrl: string | null;
  _isClearHidden: boolean;
  gender: GenderCode;
  redirectInformation: {
    redirectUrl: string;
    matchedType: FacetType;
    matchedId: number;
    searchRedirectSourceFeature: SearchRedirect;
  } | null;
  genderName: string;
};
