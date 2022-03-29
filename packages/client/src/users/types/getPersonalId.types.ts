import type { Config } from '../../types';
import type { PersonalIdResponse } from './personalId.types';

export type GetPersonalId = (
  userId: number,
  personalId: string,
  config: Config,
) => Promise<PersonalIdResponse>;
