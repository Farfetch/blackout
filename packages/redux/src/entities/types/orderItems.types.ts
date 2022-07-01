import type { Attribute, Image } from '@farfetch/blackout-client';

export type OrderItemEntity = {
  id: number;
  customAttributes: string;
  images: Image[];
  merchant: number;
  price: Price;
  tag: string;
  merchantOrderId: number;
  productId: number;
  attributes: Attribute[];
  orderStatus: string;
  orderItemStatus: string;
  creationChannel: string;
  shippingService: Shipping;
  isReturnAvailable: boolean;
  returnRestriction: string;
  isCustomizable: boolean;
  isExclusive: boolean;
  size: string;
  brand: number;
  shortDescription: string;
  categories: number[];
  colors: Colors[];
  productSlug: string;
  productType: string;
  merchantOrderCode: string;
};

type Price = {
  discountExclTaxes: number;
  discountInclTaxes: number;
  discountRate: number;
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

type Shipping = {
  description: string;
  id: number;
  name: string;
  type: string;
  minEstimatedDeliveryHour: number;
  maxEstimatedDeliveryHour: number;
  trackingCode: string[];
};

type Colors = {
  color: { id: number; name: string };
  tags: string[];
};
