import type { Balance } from '.';
import type { Config } from '../../types';

export type GetUserCreditBalanceData = {
  creditUserId: string;
};

export type GetUserCreditBalance = (
  data: GetUserCreditBalanceData,
  config?: Config,
) => Promise<Balance>;
