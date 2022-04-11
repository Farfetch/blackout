import type { Config } from '../../types';
import type { PostTokenResponse } from './tokens.types';

interface Data {
  impersonatorUserName: string;
  impersonatorPassword: string;
  impersonateeUserName: string;
}

export type PostUserImpersonation = (
  data: Data,
  config?: Config,
) => Promise<PostTokenResponse>;
