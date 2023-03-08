import type { Config } from '../../../types/index.js';
import type { User } from './user.types.js';

export interface PostUserData {
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
}

export type PostUser = (data: PostUserData, config?: Config) => Promise<User>;
