import type { Config } from '../../../types/index.js';

export type PostPhoneNumberValidationData = {
  phoneNumber: string;
  token: string;
};

export type PostPhoneNumberValidation = (
  data: PostPhoneNumberValidationData,
  config?: Config,
) => Promise<number>;
