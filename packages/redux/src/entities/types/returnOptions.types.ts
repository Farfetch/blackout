import type { MerchantEntity } from '..';
import type { MerchantOrderReturnOptions } from '@farfetch/blackout-client';

export type ReturnOptionEntity = MerchantOrderReturnOptions;

export type ReturnOptionEntityDenormalized = ReturnOptionEntity & {
  merchant?: MerchantEntity;
};

export type MerchantOrderReturnOptionsNormalized = Array<
  ReturnOptionEntity['merchantOrderId']
>;
