import type { Bag } from './bag.types';
import type { BagItem } from './bagItem.types';
import type { Config } from '../..';
import type { DeleteBagItemQuery } from './query.types';

export type DeleteBagItem = (
  id: Bag['id'] | null,
  itemId: BagItem['id'],
  query?: DeleteBagItemQuery,
  config?: Config,
) => Promise<Bag>;
