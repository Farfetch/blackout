import type { Config, Return } from '../..';

export type PatchReturnData = {
  start: string;
  end: string;
};

export type PatchReturn = (
  id: Return['id'],
  data: PatchReturnData,
  config?: Config,
) => Promise<void>;
