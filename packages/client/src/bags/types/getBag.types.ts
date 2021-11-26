import type { Bag } from './bag.types';
import type { Query } from './query.types';

export type GetBag = (
  id: Bag['id'] | null,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Bag>;
