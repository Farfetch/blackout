import type { FacetType } from './facetTypeEnum.types';

export type ShoppingConfig = {
  pageIndex: number;
  pageSize: number;
  mobilePageSize: number | null;
  filtersStartHidden: boolean;
  filterTypes: Array<{
    id: FacetType;
    deep: number;
    order: number;
  }>;
  noResultsImageUrl: string | null;
  discount: string | null;
  availableSorts: string[];
  sort: string;
  sortDirection: string;
  query: string | null;
  encodedQuery: string | null;
  showChildrenCategories: boolean;
  removeSingleValueFacets: boolean;
  mixedMode: {
    startDate: string;
    endDate: string;
    forceFullPrice: boolean;
  };
  imageSizes: Array<{
    size: number;
  }>;
  contextFilters: string | null;
  scenarios: string | null;
};
