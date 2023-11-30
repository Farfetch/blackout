import type { Config } from '../../../index.js';
import type { DraftOrder } from './draftOrder.types.js';

export type DeleteDraftOrder = (
  id: DraftOrder['id'],
  config?: Config,
) => Promise<number>;
