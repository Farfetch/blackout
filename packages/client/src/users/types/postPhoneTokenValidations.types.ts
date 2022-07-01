import type { Config } from '../../types';

export type PostPhoneTokenValidationsData = {
  phoneNumber: string;
  token: string;
};

export type PostPhoneTokenValidations = (
  data: PostPhoneTokenValidationsData,
  config?: Config,
) => Promise<Record<string, unknown>>;
