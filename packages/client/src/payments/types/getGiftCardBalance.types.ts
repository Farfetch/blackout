import type { Balance } from '.';
import type { Config } from '../../types';

export type GetGiftCardBalanceData = {
  giftCardNumber: string;
  giftCardCsc: string;
};

export type GetGiftCardBalance = (
  data: GetGiftCardBalanceData,
  config?: Config,
) => Promise<Balance>;
