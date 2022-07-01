import type { Attribute, PurchaseChannel } from '../../types';
import type { Price } from './price.types';

export type ProductVariant = {
  id: string;
  attributes: Attribute[];
  availableAt: number[];
  merchantId: number;
  price: Price;
  formattedPrice: string;
  formattedPriceWithoutDiscount: string;
  purchaseChannel: PurchaseChannel;
  barcodes: string[];
  quantity: number;
  size: string;
  scale: string;
  scaleAbbreviation: string;
  sizeDescription: string;
  isOneSize: boolean;
};
