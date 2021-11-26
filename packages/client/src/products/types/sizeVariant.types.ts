export type SizeVariant = {
  merchantId: number;
  formattedPrice: string;
  formattedPriceWithoutDiscount: string;
  quantity: number;
  barcodes: string[];
  priceInclTaxes: number;
  priceInclTaxesWithoutDiscount: number;
};
