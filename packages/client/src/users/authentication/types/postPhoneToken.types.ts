import type { Config } from '../../../types/index.js';

export type PostPhoneTokenData = {
  phoneNumber: string;
};

export type PostPhoneToken = (
  data: PostPhoneTokenData,
  config?: Config,
) => Promise<number>;
