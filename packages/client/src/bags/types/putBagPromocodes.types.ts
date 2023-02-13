import type { Bag } from './bag.types';
import type { Config } from '../..';

export type PromoCodeInformation = {
  promoCode: string;
  isValid: boolean;
  error?: {
    code: string;
    message: string;
  };
};

export type BagPromocodesInformation = {
  promoCodesInformation: PromoCodeInformation[];
};

export type PutBagPromocodesData = {
  promocodes: string[];
};

export type PutBagPromocodes = (
  id: Bag['id'],
  data: PutBagPromocodesData,
  config?: Config,
) => Promise<BagPromocodesInformation>;
