export type RecentlyViewedProducts = RecentlyViewedProductsPaginationData &
  RecentlyViewedProductsEntriesData;

export type RecentlyViewedProductsPaginationData = {
  number: number;
  totalPages: number;
  totalItems: number;
};

export type RecentlyViewedProductsEntriesData = {
  entries: RecentlyViewedProductsEntriesItem[];
};

export type RecentlyViewedProductsEntriesItem = {
  productId: number;
  lastVisitDate: string;
};
