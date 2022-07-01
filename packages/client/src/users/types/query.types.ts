export type UserAttributesQuery = {
  channelCode?: string;
  interface?: string;
};

export type GetTitlesQuery = {
  page?: number;
  pageSize?: number;
};

export type GetUserCreditMovementsQuery = {
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};
