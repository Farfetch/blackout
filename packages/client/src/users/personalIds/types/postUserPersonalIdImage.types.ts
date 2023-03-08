import type { Config } from '../../../types/index.js';
import type { User } from '../../authentication/types/user.types.js';

export type PostUserPersonalIdImageData = {
  file: string;
};

export enum UserPersonalIdImageSide {
  FRONT = 'FRONT',
  BACK = 'BACK',
  UNKNOWN = 'UNKNOWN',
}

export type UserPersonalIdImage = {
  id: string;
  side: UserPersonalIdImageSide;
};

export type PostUserPersonalIdImage = (
  userId: User['id'],
  data: PostUserPersonalIdImageData,
  config: Config,
) => Promise<UserPersonalIdImage>;
