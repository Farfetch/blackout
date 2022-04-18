import type { Config } from '@farfetch/blackout-client/types';

export type PostPhoneTokensData = {
  phoneNumber: string;
};

export type PostPhoneTokensResponse = Record<string, unknown>;

export type PostPhoneTokens = (
  data: PostPhoneTokensData,
  config?: Config,
) => Promise<PostPhoneTokensResponse>;
