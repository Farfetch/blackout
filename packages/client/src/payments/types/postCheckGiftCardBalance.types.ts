import type { Balance } from '.';
import type { Config } from '../../types';

export type PostCheckGiftCardBalanceData = {
  giftCardNumber: string;
  giftCardCsc: string;
};

export type PostCheckGiftCardBalance = (
  data: PostCheckGiftCardBalanceData,
  config?: Config,
) => Promise<Balance>;
