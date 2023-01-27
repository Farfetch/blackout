export type BagQueryBase = {
  includeOutOfStock?: boolean;
};

export type GetBagQuery = BagQueryBase;
export type DeleteBagItemQuery = BagQueryBase;
export type PostBagItemQuery = BagQueryBase;
export type PatchBagItemQuery = BagQueryBase;

export type BagOperationsQuerySort = 'createdDate:desc' | 'createdDate:asc';

export type GetBagOperationsQuery = {
  page?: number;
  pageSize?: number;
  sort?: Array<BagOperationsQuerySort>;
  createdDate?: string;
};
