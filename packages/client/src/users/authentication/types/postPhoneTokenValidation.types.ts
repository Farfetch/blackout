import type { Config } from '../../../types';

export type PostPhoneTokenValidationData = {
  phoneNumber: string;
  token: string;
};

export type PostPhoneTokenValidation = (
  data: PostPhoneTokenValidationData,
  config?: Config,
) => Promise<number>;
