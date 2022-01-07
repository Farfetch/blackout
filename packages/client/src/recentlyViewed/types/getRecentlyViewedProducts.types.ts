export type GetRecentlyViewedProductsQuery = {
  page: number;
  pageSize: number;
};

export type GetRecentlyViewedProductsData =
  RecentlyViewedProductsPaginationData & {
    entries: {
      productId: number;
      lastVisitDate: string;
    }[];
  };

export type RecentlyViewedProductsPaginationData = {
  productId: number;
  number: number;
  totalPages: number;
  totalItems: number;
};

export type GetRecentlyViewedProducts = (
  query?: GetRecentlyViewedProductsQuery,
  config?: Record<string, unknown>,
) => Promise<GetRecentlyViewedProductsData>;
