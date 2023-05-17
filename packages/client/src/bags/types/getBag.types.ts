import type { Bag } from './bag.types.js';
import type { Config } from '../../index.js';
import type { GetBagQuery } from './query.types.js';

export type GetBag = (
  id: Bag['id'] | null,
  query?: GetBagQuery,
  config?: Config,
) => Promise<Bag>;
