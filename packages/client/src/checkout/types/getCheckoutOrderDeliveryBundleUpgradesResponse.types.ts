import type { CheckoutOrderDeliveryWindow } from './index.js';

export type CheckoutOrderDeliveryBundleUpgrade = {
  id: string;
  index: number;
  name: string;
  isSelected: boolean;
  price: number;
  formattedPrice: string;
  currency: string;
  rank: number;
  itemId: number;
  deliveryWindow: CheckoutOrderDeliveryWindow;
};

export type CheckoutOrderDeliveryBundleUpgrades = {
  [itemId: number]: {
    Nominated?: CheckoutOrderDeliveryBundleUpgrade[];
    Estimated?: CheckoutOrderDeliveryBundleUpgrade[];
  };
};
