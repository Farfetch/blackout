import type { Balance } from './index.js';
import type { Config } from '../../types/index.js';

export type GetGiftCardBalanceData = {
  giftCardNumber: string;
  giftCardCsc: string;
};

export type GetGiftCardBalance = (
  data: GetGiftCardBalanceData,
  config?: Config,
) => Promise<Balance>;
