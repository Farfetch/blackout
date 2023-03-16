import type { Config } from '../../../types/index.js';
import type { User } from './user.types.js';

export type PutUserData = {
  name: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  gender?: string;
  receiveNewsletters?: boolean;
  personalShopperId?: number;
  titleId?: string;
  firstName?: string;
  lastName?: string;
};

export type PutUser = (
  userId: User['id'],
  data: PutUserData,
  config?: Config,
) => Promise<User>;
