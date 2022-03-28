import type { Config } from '../../types';
import type { PutDefaultPersonalIdResponse } from './personalId.types';

export type PutDefaultPersonalIdData = {
  id: string;
};

export type PutDefaultPersonalId = (
  id: number,
  data: PutDefaultPersonalIdData,
  config: Config,
) => Promise<PutDefaultPersonalIdResponse>;
