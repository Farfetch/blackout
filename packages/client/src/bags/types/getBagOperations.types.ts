import type { Bag } from './bag.types.js';
import type { BagOperation } from './bagOperation.types.js';
import type { Config, PagedResponse } from '../../index.js';
import type { GetBagOperationsQuery } from './query.types.js';

export type BagOperations = PagedResponse<BagOperation>;

export type GetBagOperations = (
  id: Bag['id'],
  query?: GetBagOperationsQuery,
  config?: Config,
) => Promise<BagOperations>;
