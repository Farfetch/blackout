import type { Price } from './price.types';
import type { VariantAttribute } from './variantAttribute.types';

enum PurchaseChannelEnum {
  AddToBag,
  EmailOnly,
  PhoneOnly,
  SuperCatalog,
}

export type ProductVariant = {
  id: string;
  attributes: VariantAttribute[];
  availableAt: number[];
  merchantId: number;
  price: Price;
  formattedPrice: string;
  formattedPriceWithoutDiscount: string;
  purchaseChannel: PurchaseChannelEnum;
  barcodes: string[];
  quantity: number;
  size: string;
  scale: string;
  scaleAbbreviation: string;
  sizeDescription: string;
  isOneSize: boolean;
};
