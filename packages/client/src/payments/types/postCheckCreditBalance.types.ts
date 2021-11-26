import type { Balance } from '.';
import type { Config } from '../../types';

export type PostCheckCreditBalanceData = {
  creditUserId: string;
};

export type PostCheckCreditBalance = (
  data: PostCheckCreditBalanceData,
  config?: Config,
) => Promise<Balance>;
