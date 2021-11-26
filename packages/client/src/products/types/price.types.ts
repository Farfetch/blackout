export type Price = {
  priceExclTaxes: number;
  priceInclTaxes: number;
  priceInclTaxesWithoutDiscount: number;
  discountExclTaxes: number;
  discountInclTaxes: number;
  discountRate: number;
  taxesRate: number;
  taxesValue: number;
  tags: string[];
  formattedPrice: string;
  formattedPriceWithoutDiscount: string;
  formattedPriceWithoutCurrency: string;
  formattedPriceWithoutDiscountAndCurrency: string;
  taxType: string;
};
