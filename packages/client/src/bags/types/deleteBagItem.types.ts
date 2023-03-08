import type { Bag } from './bag.types.js';
import type { BagItem } from './bagItem.types.js';
import type { Config } from '../../index.js';
import type { DeleteBagItemQuery } from './query.types.js';

export type DeleteBagItem = (
  id: Bag['id'] | null,
  itemId: BagItem['id'],
  query?: DeleteBagItemQuery,
  config?: Config,
) => Promise<Bag>;
