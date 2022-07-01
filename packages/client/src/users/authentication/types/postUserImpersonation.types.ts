import type { Config } from '../../../types';
import type { PostTokenResponse } from './tokens.types';

export interface PostUserImpersonationData {
  impersonatorUserName: string;
  impersonatorPassword: string;
  impersonateeUserName: string;
}

export type PostUserImpersonation = (
  data: PostUserImpersonationData,
  config?: Config,
) => Promise<PostTokenResponse>;
