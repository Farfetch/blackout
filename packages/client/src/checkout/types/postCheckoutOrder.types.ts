import type { Bag } from '../../bags/index.js';
import type { Config } from '../../types/index.js';
import type { GetCheckoutOrderResponse, ShippingMode } from './index.js';
import type { Metadata } from '../../types/common/metadata.types.js';
import type { Product } from '../../products/types/index.js';

export type PostCheckoutOrderMetadata = Metadata;

export type PostCheckoutOrderData = {
  guestUserEmail?: string;
  shippingMode?: ShippingMode;
  metadata?: PostCheckoutOrderMetadata;
};

export type PostCheckoutOrderDataWithItems = PostCheckoutOrderData & {
  items: {
    productId: Product['result']['id'];
    merchantId: number;
    variantId: string;
    quantity: number;
    customAttributes: string;
    productAggregatorId: number;
  }[];
};

export type PostCheckoutOrderDataWithBag = PostCheckoutOrderData & {
  bagId: Bag['id'];
  removePurchasedItemsFromBag?: boolean;
};

export type PostCheckoutOrder = (
  data: PostCheckoutOrderDataWithItems | PostCheckoutOrderDataWithBag,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
