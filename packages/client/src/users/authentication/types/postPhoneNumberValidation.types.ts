import type { Config } from '../../../types';

export type PostPhoneNumberValidationData = {
  phoneNumber: string;
  token: string;
};

export type PostPhoneNumberValidation = (
  data: PostPhoneNumberValidationData,
  config?: Config,
) => Promise<number>;
