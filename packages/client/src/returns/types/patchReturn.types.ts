import type { Config, Return } from '../..';

export type PatchReturnData = {
  start: string;
  end: string;
};

export type PatchReturn = (
  returnId: Return['id'],
  data: PatchReturnData,
  config?: Config,
) => Promise<void>;
