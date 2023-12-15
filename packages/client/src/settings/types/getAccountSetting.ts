import type { Config } from '../../index.js';

export type AccountSetting = {
  id: string;
  channelCode?: string;
  type: string;
  details: Record<string, unknown>;
};

export type GetAccountSetting = (
  settingId: string,
  config?: Config,
) => Promise<AccountSetting>;
