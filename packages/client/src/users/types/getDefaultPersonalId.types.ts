import type { Config } from '../../types';
import type { DefaultPersonalIdResponse } from './personalId.types';

export type GetDefaultPersonalId = (
  id: number,
  config: Config,
) => Promise<DefaultPersonalIdResponse>;
