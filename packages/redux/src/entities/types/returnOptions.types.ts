import type { MerchantEntity } from './merchant.types.js';
import type {
  MerchantOrderReturnOptions,
  Order,
} from '@farfetch/blackout-client';

export type ReturnOptionEntity = MerchantOrderReturnOptions & {
  orderId: Order['id'];
};

export type ReturnOptionEntityDenormalized = ReturnOptionEntity & {
  merchant?: MerchantEntity;
};

export type MerchantOrderReturnOptionsNormalized = Array<
  ReturnOptionEntity['merchantOrderId']
>;
