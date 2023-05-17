import type { Config, Return } from '../../index.js';

export type PatchReturnData = {
  start: string;
  end: string;
};

export type PatchReturn = (
  returnId: Return['id'],
  data: PatchReturnData,
  config?: Config,
) => Promise<void>;
