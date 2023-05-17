import type { Config } from '../../index.js';
import type { Return } from './return.types.js';

export type GetReturn = (
  returnId: Return['id'],
  config?: Config,
) => Promise<Return>;
