import type { Config } from '../..';
import type { Return } from './return.types';

export type GetReturn = (
  returnId: Return['id'],
  config?: Config,
) => Promise<Return>;
