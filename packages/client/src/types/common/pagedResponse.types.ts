export type PagedResponse<T> = {
  entries: T[];
  number: number;
  totalItems: number;
  totalPages: number;
};
