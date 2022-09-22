import type { Config } from '../../../types';
import type { User } from './user.types';

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