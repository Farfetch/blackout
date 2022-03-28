import type { Config } from '../../types';
import type { PersonalIdsResponse } from './personalId.types';

export type GetPersonalIds = (
  id: number,
  config: Config,
) => Promise<PersonalIdsResponse>;
