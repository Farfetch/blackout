import type { Closet } from './closet.types.js';
import type { ClosetItems } from './closetItem.types.js';
import type { Config, User } from '../../../index.js';

export type GetUserClosetItemsQuerySort =
  | 'createdDate'
  | 'name'
  | 'isAvailable'
  | 'brand'
  | 'price'
  | 'purchasedPrice';

export type GetUserClosetItemsQuerySortDirection = 'desc' | 'asc';

export type GetUserClosetItemsQuery = {
  /** Number of the page to get, starting at 1. The default is 1. */
  page?: number;
  /** Size of each page, as a number between 1 and 180. The default is 60. */
  pageSize?: number;
  /** The product category id to filter. */
  categoryId?: number;
  /** The product color id to filter. */
  colorId?: number;
  /** The brand id to filter. */
  brandId?: number;
  /** Get products of some sizes, specified by their numeric identifiers, separated by pipes. */
  sizes?: string;
  /** Sort by specified value. The default is to sort by created date. */
  sort?: GetUserClosetItemsQuerySort;
  /** Sorts in ascending (asc) or descending (desc) order. Default value is desc */
  sortDirection?: GetUserClosetItemsQuerySortDirection;
};

export type GetUserClosetItems = (
  userId: User['id'],
  closetId: Closet['id'],
  query?: GetUserClosetItemsQuery,
  config?: Config,
) => Promise<ClosetItems>;
