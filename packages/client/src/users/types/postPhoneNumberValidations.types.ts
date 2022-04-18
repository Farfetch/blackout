import type { Config } from '@farfetch/blackout-client/types';

export type PostPhoneNumberValidationsData = {
  phoneNumber: string;
  token: string;
};

export type PostPhoneNumberValidations = (
  data: PostPhoneNumberValidationsData,
  config?: Config,
) => Promise<Record<string, unknown>>;
