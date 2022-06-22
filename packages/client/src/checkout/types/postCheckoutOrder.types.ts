import type { Config } from '../../types';
import type { GetCheckoutOrderResponse, ShippingMode } from '.';
import type { Product } from '../../products/types';

export type PostCheckoutOrderData = {
  bagId?: string;
  items?: {
    productId: Product['result']['id'];
    merchantId: number;
    variantId: string;
    quantity: number;
    customAttributes: string;
    productAggregatorId: number;
  }[];
  guestUserEmail: string;
  usePaymentIntent: boolean;
  shippingMode?: ShippingMode;
  removePurchasedItemsFromBag?: boolean;
};

export type PostCheckoutOrder = (
  data: PostCheckoutOrderData,
  config?: Config,
) => Promise<GetCheckoutOrderResponse>;
