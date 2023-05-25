import type { Config } from '../../../types/index.js';
import type { User, UserMetadata } from './user.types.js';

export type PostUserData = {
  countryCode: string;
  email: string;
  password: string;
  username: string;
  name: string;
  phoneNumber?: string;
  titleId?: string;
  firstName?: string;
  lastName?: string;
  receiveNewsletters?: boolean;
  metadata?: UserMetadata;
};

export type PostUser = (data: PostUserData, config?: Config) => Promise<User>;
