import type { Config } from '../../types';

export type PostPhoneTokensData = {
  phoneNumber: string;
};

export type PostPhoneTokensResponse = Record<string, unknown>;

export type PostPhoneTokens = (
  data: PostPhoneTokensData,
  config?: Config,
) => Promise<PostPhoneTokensResponse>;
