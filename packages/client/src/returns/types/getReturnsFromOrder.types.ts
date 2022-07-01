import type { Config } from '../..';
import type { Return } from './return.types';

export type GetReturnsFromOrder = (
  id: string,
  config?: Config,
) => Promise<Return>;
