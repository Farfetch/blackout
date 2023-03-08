import type { ShippingOption } from './index.js';

export type CheckoutOrderMerchant = {
  merchantId: number;
  merchantName: string;
  salesTax: number;
  shipping: ShippingOption;
};
