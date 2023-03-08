import type { DeliveryWindow } from './index.js';

export type ItemDeliveryOption = {
  itemId: number;
  name: string;
  deliveryWindow: DeliveryWindow;
};

export type DeliveryBundle = {
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
  itemsDeliveryOptions: ItemDeliveryOption[];
};
