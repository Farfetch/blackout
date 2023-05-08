import type { Config } from '../../../types/index.js';
import type { PostUserData } from './postUser.types.js';
import type { UserLegacy } from './login.types.js';

export type PostUserDataLegacy = Omit<PostUserData, 'receiveNewsletters'> & {
  loyalty?: {
    join: boolean;
    rewardsCardNumber?: string;
    referralToken?: string;
  };
  referralUser?: {
    referralToken: string;
    rewardsCardNumber: string;
    joinRewards?: boolean;
  };
};

export type PostUserLegacy = (
  data: PostUserDataLegacy,
  config?: Config,
) => Promise<UserLegacy>;
