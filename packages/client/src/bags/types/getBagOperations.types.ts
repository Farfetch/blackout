import type { Bag } from './bag.types';
import type { BagOperation } from './bagOperation.types';
import type { Config, PagedResponse } from '../..';
import type { GetBagOperationsQuery } from './query.types';

export type BagOperations = PagedResponse<BagOperation>;

export type GetBagOperations = (
  id: Bag['id'],
  query?: GetBagOperationsQuery,
  config?: Config,
) => Promise<BagOperations>;
