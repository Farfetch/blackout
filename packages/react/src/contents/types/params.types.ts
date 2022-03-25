import type { GenderEnum } from '@farfetch/blackout-client/types';
import type { PriceTypeEnum } from '@farfetch/blackout-client/products/types';
import type { Type } from '@farfetch/blackout-client/contents/types';

export type Params = {
  countryCode?: string;
  cultureCode?: string;
  benefits?: string;
  contentzone?: string;
  environmentcode?: string;
  preview?: string;
};

export type CommercePagesParams = {
  type: Type;
  id?: string;
  gender?: GenderEnum;
  brand?: number;
  category?: string;
  priceType?: PriceTypeEnum;
  sku?: number;
};
