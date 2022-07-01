import type { Config } from '../..';
import type { Return } from './return.types';

export type PatchReturnData = {
  start: string;
  end: string;
};

export type PatchReturn = (
  id: number,
  data: PatchReturnData,
  config?: Config,
) => Promise<Return>;
