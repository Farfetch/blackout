import type { Config } from '../../../types/index.js';
import type { UserPersonalIdPartial } from './userPersonalId.types.js';

export type PostUserPersonalIdData = {
  backImageId: string;
  frontImageId: string;
  idNumber: string;
  name: string;
};

export type PostUserPersonalId = (
  userId: number,
  data: PostUserPersonalIdData,
  config: Config,
) => Promise<UserPersonalIdPartial>;
