import type { Config } from '../../../types/index.js';
import type { User } from './user.types.js';

export type PostAccountLinkData = {
  username: string;
  password: string;
};

export type PostAccountLink = (
  data: PostAccountLinkData,
  config?: Config,
) => Promise<User>;
