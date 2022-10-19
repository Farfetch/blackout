import type { Bag } from '../../bags';
import type { Config } from '../../types';
import type { GetCheckoutOrderResponse, ShippingMode } from '.';
import type { Product } from '../../products/types';

export type PostCheckoutOrderData = {
  guestUserEmail?: string;
  usePaymentIntent?: boolean;
  shippingMode?: ShippingMode;
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
