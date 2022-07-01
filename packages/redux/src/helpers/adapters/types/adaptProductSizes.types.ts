import type {
  ProductVariant,
  Size,
  SizeVariant,
} from '@farfetch/blackout-client';

export type SizeAdapted = {
  globalQuantity: number;
  id: number;
  isOneSize: boolean;
  isOutOfStock: boolean;
  name: Size['sizeDescription'];
  scale: number;
  scaleAbbreviation: Size['scaleAbbreviation'];
  scaleDescription: string | undefined;
  stock: Array<{
    barcodes: SizeVariant['barcodes'];
    merchantId: SizeVariant['merchantId'];
    price: {
      formatted: {
        includingTaxes: SizeVariant['formattedPrice'];
        includingTaxesWithoutDiscount: SizeVariant['formattedPriceWithoutDiscount'];
      };
    };
    purchaseChannel: number | null;
    quantity: SizeVariant['quantity'];
  }>;
};

export type SizesAdapted = SizeAdapted[] | undefined;

export type ComposePurchaseChannels = (
  variants: ProductVariant[],
) => Record<string, ProductVariant['purchaseChannel']> | Record<string, never>;

export type GetAttributesBySizeId = (
  sizeId: Size['sizeId'],
  variants: ProductVariant[],
) => Record<string, string> | Record<string, never>;

export type AdaptProductSizes = (
  sizes?: Size[],
  variants?: ProductVariant[],
) => SizesAdapted;
