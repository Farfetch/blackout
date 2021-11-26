import type { Config } from '../../types';
import type { GetCheckoutResponse, ShippingMode } from '.';
import type { Product } from '../../products/types';

export type PostCheckoutData = {
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

export type PostCheckout = (
  data: PostCheckoutData,
  config?: Config,
) => Promise<GetCheckoutResponse>;
