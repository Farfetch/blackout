import type { Config } from '../../../types';
import type { UserPersonalIdPartial } from './userPersonalId.types';

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
