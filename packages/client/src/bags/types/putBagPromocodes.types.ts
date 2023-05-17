import type { Bag } from './bag.types.js';
import type { Config } from '../../index.js';

export type PromocodeInformation = {
  promoCode: string;
  isValid: boolean;
  error?: {
    code: string;
    message: string;
  };
};

export type BagPromocodesInformation = {
  promoCodesInformation: PromocodeInformation[];
};

export type PutBagPromocodesData = {
  promocodes: string[];
};

export type PutBagPromocodes = (
  id: Bag['id'],
  data: PutBagPromocodesData,
  config?: Config,
) => Promise<BagPromocodesInformation>;
