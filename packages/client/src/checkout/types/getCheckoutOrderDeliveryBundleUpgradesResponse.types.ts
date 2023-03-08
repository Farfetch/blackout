import type { DeliveryWindow } from './index.js';

export type DeliveryBundleUpgrade = {
  id: string;
  index: number;
  name: string;
  isSelected: boolean;
  price: number;
  formattedPrice: string;
  currency: string;
  rank: number;
  itemId: number;
  deliveryWindow: DeliveryWindow;
};

export type DeliveryBundleUpgrades = {
  [itemId: number]: {
    Nominated?: DeliveryBundleUpgrade[];
    Estimated?: DeliveryBundleUpgrade[];
  };
};
