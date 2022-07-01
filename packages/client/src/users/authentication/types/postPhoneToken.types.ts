import type { Config } from '../../../types';

export type PostPhoneTokenData = {
  phoneNumber: string;
};

export type PostPhoneToken = (
  data: PostPhoneTokenData,
  config?: Config,
) => Promise<number>;
