import type { Bag } from './bag.types.js';
import type { BagOperation } from './bagOperation.types.js';
import type { Config } from '../../index.js';

export type GetBagOperation = (
  id: Bag['id'],
  bagOperationId: BagOperation['id'],
  config?: Config,
) => Promise<BagOperation>;
