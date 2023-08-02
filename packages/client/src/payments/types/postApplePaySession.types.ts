import type { Config } from '../../types/index.js';

export type PostApplePaySessionData = {
  validationUrl: string;
};

export type PostApplePaySessionResponse = {
  merchantIdentifier: string;
  displayName: string;
  initiative: string;
  initiativeContext: string;
};

export type PostApplePaySession = (
  data?: PostApplePaySessionData,
  config?: Config,
) => Promise<PostApplePaySessionResponse>;
