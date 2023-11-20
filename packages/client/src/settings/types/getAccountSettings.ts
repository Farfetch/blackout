import type { Config } from '../../index.js';

export type PasswordRules = {
  rules: [
    {
      name: string;
      regex: string;
    },
  ];
  differFromLastPass: number;
};

export type AccountSettingsQuery = {
  channelCode?: string;
  type: 'PasswordRules' | string;
};

export type AccountSettings = {
  channelCode?: string;
  type: string;
  details: PasswordRules | object;
};

export type GetAccountSettings = (
  query?: AccountSettingsQuery,
  config?: Config,
) => Promise<AccountSettings>;
