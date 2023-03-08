import type { Balance } from './index.js';
import type { Config } from '../../types/index.js';

export type GetUserCreditBalanceData = {
  creditUserId: string;
};

export type GetUserCreditBalance = (
  data: GetUserCreditBalanceData,
  config?: Config,
) => Promise<Balance>;
