import type { Bag } from './bag.types';
import type { BagOperation } from './bagOperation.types';
import type { Config } from '../..';

export type GetBagOperation = (
  id: Bag['id'],
  bagOperationId: BagOperation['id'],
  config?: Config,
) => Promise<BagOperation>;
