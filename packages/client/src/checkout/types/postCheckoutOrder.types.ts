import type { Bag } from '../../bags/index.js';
import type { Config, Metadata } from '../../types/index.js';
import type { GetCheckoutOrderResponse, ShippingMode } from './index.js';
import type { Product } from '../../products/types/index.js';

export type PostCheckoutOrderMetadata = Record<string, string>;

export type PostCheckoutOrderData = {
  guestUserEmail?: string;
  shippingMode?: ShippingMode;
  metadata?: PostCheckoutOrderMetadata;
};

export type PostCheckoutOrderItem = {
  productId: Product['result']['id'];
  merchantId: number;
  variantId: string;
  quantity: number;
  customAttributes: string;
  productAggregatorId: number;
};

export type PostCheckoutOrderDataWithItems = PostCheckoutOrderData & {
  items: PostCheckoutOrderItem[];
  metadata?: Metadata;
};

export type PostCheckoutOrderDataWithBag = PostCheckoutOrderData & {
  bagId: Bag['id'];
  removePurchasedItemsFromBag?: boolean;
  metadata?: Metadata;
};

export type PostCheckoutOrderDataWithDraftOrder = {
  draftOrderId: string;
};

export type PostCheckoutOrder = (
  data:
    | PostCheckoutOrderDataWithItems
    | PostCheckoutOrderDataWithBag
    | PostCheckoutOrderDataWithDraftOrder,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
