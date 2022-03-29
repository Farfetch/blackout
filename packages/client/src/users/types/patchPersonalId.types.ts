import type { Config } from '../../types';
import type {
  PatchPersonalIdData,
  PatchPersonalIdResponse,
} from './personalId.types';

export type PatchPersonalId = (
  userId: number,
  personalId: string,
  data: PatchPersonalIdData,
  config: Config,
) => Promise<PatchPersonalIdResponse>;
