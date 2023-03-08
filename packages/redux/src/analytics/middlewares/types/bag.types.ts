import type {
  BagItemEntity,
  MerchantEntity,
  ProductEntity,
} from '../../../entities/types/index.js';

export type BagProductActionMetadata = {
  authCode: string;
  bagId: string;
  bagItemId: BagItemEntity['id'];
  customAttributes: string;
  from: string;
  merchantId: MerchantEntity['id'];
  productAggregatorId: number;
  productId: ProductEntity['id'];
  quantity: BagItemEntity['quantity'];
  scale: number;
  size: number;
};

export type BagActionProcessedOptions = {
  ADD_BAG_ITEM_SUCCESS: string;
  UPDATE_BAG_ITEM_SUCCESS: string;
  REMOVE_BAG_ITEM_SUCCESS: string;
};

export type BagActionMiddlewareOptions = Partial<BagActionProcessedOptions>;
