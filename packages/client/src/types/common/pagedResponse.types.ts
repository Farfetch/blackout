export type PagedResponse<T> = {
  entries: T[];
  number: number;
  totalItems: number;
  totalPages: number;
};

export type PagedResponseWithPageSize<T> = Omit<PagedResponse<T>, 'number'> & {
  pageSize: number;
  pageNumber: number;
};
