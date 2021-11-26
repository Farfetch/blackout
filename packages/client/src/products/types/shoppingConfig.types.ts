import type { FacetTypeEnum } from './facetTypeEnum.types';

export type ShoppingConfig = {
  pageIndex: number;
  pageSize: number;
  mobilePageSize: number;
  filtersStartHidden: boolean;
  filterTypes: Array<{
    id: FacetTypeEnum;
    deep: number;
    order: number;
  }>;
  noResultsImageUrl: string;
  discount: string;
  availableSorts: string[];
  sort: string;
  sortDirection: string;
  query: string;
  encodedQuery: string;
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
  contextFilters: string;
};
