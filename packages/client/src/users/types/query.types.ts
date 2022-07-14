export type UserAttributesQuery = {
  channelCode?: string;
  interface?: string;
};

export type GetUserCreditMovementsQuery = {
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
};
