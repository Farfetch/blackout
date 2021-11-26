import type { Bag } from './bag.types';
import type { BagItem } from './bagItem.types';
import type { Query } from './query.types';

export type DeleteBagItem = (
  id: Bag['id'] | null,
  itemId: BagItem['id'],
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Bag>;
