import type { CheckoutOrderDeliveryWindow } from './index.js';

export type CheckoutOrderDeliveryBundleItemDeliveryOption = {
  itemId: number;
  name: string;
  tags?: string[];
  deliveryWindow: CheckoutOrderDeliveryWindow;
};

export type CheckoutOrderDeliveryBundle = {
  id: string;
  name: string;
  isSelected: boolean;
  price: number;
  formattedPrice: string;
  finalPrice: number;
  formattedFinalPrice: string;
  discount: number;
  currency: string;
  rank: number;
  itemsDeliveryOptions: CheckoutOrderDeliveryBundleItemDeliveryOption[];
};
