import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';
import type { UserPersonalIdPartial } from './index.js';

export type PatchUserPersonalIdData = {
  backImageId: string;
  expiryDate: string;
  frontImageId: string;
  idNumber: string;
  name: string;
};

export type PatchUserPersonalId = (
  userId: User['id'],
  personalId: string,
  data: PatchUserPersonalIdData,
  config: Config,
) => Promise<UserPersonalIdPartial>;
