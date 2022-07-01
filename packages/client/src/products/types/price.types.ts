// PDP, bag item and wishlist item price object
export type Price = {
  discountExclTaxes: number;
  discountInclTaxes: number;
  discountRate?: number;
  formattedPrice: string;
  formattedPriceWithoutCurrency: string;
  formattedPriceWithoutDiscount: string;
  formattedPriceWithoutDiscountAndCurrency: string;
  priceExclTaxes: number;
  priceInclTaxes: number;
  priceInclTaxesWithoutDiscount: number;
  tags: string[];
  taxesRate: number;
  taxesValue: number;
  taxType: string;
};

// PLP product price (scattered in `ProductSummary`, which is the name in Swagger)
export type ProductSummaryPrice = {
  currencyIsoCode: string;
  formattedPrice: string;
  formattedPriceWithoutDiscount: string;
  price: number;
  priceType: PriceType;
  priceWithoutDiscount: number;
  promotionPercentage: number;
};

enum ProductPriceType {
  Min,
  Max,
}

// PLP product `prices` individual object (`ProductSummaryTypedPrice` is the name in Swagger)
export type ProductSummaryTypedPrice = {
  formattedPrice: string;
  formattedPriceWithoutCurrency: string;
  formattedPriceWithoutDiscount: string;
  formattedPriceWithoutDiscountAndCurrency: string;
  price: number;
  priceWithoutDiscount: number;
  promotionPercentage: number;
  promotionType: string;
  type: ProductPriceType;
  typeDescription: string;
};

export enum PriceType {
  FullPrice,
  Sale,
  PrivateSale,
  VipPrivateSale,
}
