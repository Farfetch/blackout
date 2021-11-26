import type { ShippingCostType } from '.';

export type CheckoutOrderMerchant = {
  merchantId: number;
  merchantName: string;
  salesTax: number;
  shipping: {
    currency: string;
    discount: number;
    merchants: number[];
    price: number;
    formattedPrice: string;
    shippingCostType: ShippingCostType;
    shippingService: {
      description: string;
      id: number;
      name: string;
      type: string;
      minEstimatedDeliveryHour: number;
      maxEstimatedDeliveryHour: number;
      trackingCodes: string[];
    };
    shippingWithoutCapped: number;
    baseFlatRate: number;
  };
};
