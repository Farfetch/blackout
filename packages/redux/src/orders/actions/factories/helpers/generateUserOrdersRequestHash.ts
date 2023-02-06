import type { GetUserOrdersQuery, User } from '@farfetch/blackout-client';

export type HashedFetchUserOrdersQuery = string;

export default function generateUserOrdersRequestHash(
  userId: User['id'],
  query: GetUserOrdersQuery = { page: 1, pageSize: 60 },
): HashedFetchUserOrdersQuery {
  const hashedObject = {
    userId,
    page: query.page,
    pageSize: query.pageSize,
    ...(query.orderStatuses?.length && {
      orderStatuses: query.orderStatuses?.sort()?.join(','),
    }),
  };
  const hashedQuery = Object.values(hashedObject).join('|');

  return hashedQuery;
}
