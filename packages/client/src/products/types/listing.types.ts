import type { BreadCrumb } from './breadCrumb.types';
import type { FacetGroup } from './facetGroup.types';
import type { FacetType } from './facetTypeEnum.types';
import type { FilterSegment } from './filterSegment.types';
import type { Gender } from '../../types';
import type { ProductSummary } from './productSummary.types';
import type { ShoppingConfig } from './shoppingConfig.types';

enum SearchRedirect {
  Stopwords = 0,
  Percolation,
}

export type Listing = {
  name: string;
  products: {
    entries: ProductSummary[];
    number: number;
    totalItems: number;
    totalPages: number;
  };
  facetGroups: FacetGroup[];
  filterSegments: FilterSegment[];
  config: ShoppingConfig;
  didYouMean: string[];
  breadCrumbs: BreadCrumb[];
  searchTerm: string;
  facetsBaseUrl: string;
  _sorts: string[];
  _clearUrl: string;
  _isClearHidden: boolean;
  gender: Gender;
  redirectInformation: {
    redirectUrl: string;
    matchedType: FacetType;
    matchedId: number;
    searchRedirectSourceFeature: SearchRedirect;
  };
  genderName: string;
};
