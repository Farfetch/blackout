import type { MerchantEntity } from './merchant.types.js';
import type {
  MerchantOrderReturnOptions,
  ReturnOption,
} from '@farfetch/blackout-client';

export type ReturnOptionEntity = ReturnOption & {
  merchant: MerchantOrderReturnOptions['merchantId'];
  merchantOrderId: MerchantOrderReturnOptions['merchantOrderId'];
  id: string;
};

export type ReturnOptionEntityDenormalized = Omit<
  ReturnOptionEntity,
  'merchant'
> & {
  merchant: MerchantEntity;
};

export type MerchantOrderReturnOptionsNormalized = Omit<
  MerchantOrderReturnOptions,
  'options'
> & {
  options: Array<ReturnOptionEntity['id']>;
};
