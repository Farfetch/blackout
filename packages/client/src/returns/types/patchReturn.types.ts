import type { Query } from './query.types';
import type { Return } from './return.types';

export type PatchReturnData = {
  start: string;
  end: string;
};

export type PatchReturn = (
  id: number,
  data: PatchReturnData,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Return>;
