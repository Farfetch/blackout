import type { Bag } from './bag.types';
import type { Config } from '../..';
import type { GetBagQuery } from './query.types';

export type GetBag = (
  id: Bag['id'] | null,
  query?: GetBagQuery,
  config?: Config,
) => Promise<Bag>;
