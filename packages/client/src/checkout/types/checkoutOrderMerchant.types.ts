import type { ShippingOption } from '.';

export type CheckoutOrderMerchant = {
  merchantId: number;
  merchantName: string;
  salesTax: number;
  shipping: ShippingOption;
};
