import {
  type ProductVariantAttribute,
  SaleIntent as PublicationFeatureCode,
  type PurchaseChannel,
} from '../../types/index.js';
import type { Price } from './price.types.js';

export { PublicationFeatureCode };

export type PublicationFeature = {
  /**
   * Code of the publication feature.
   * For example: "IMMEDIATE_FULFILMENT", "PREORDER", "BACKORDER".
   */
  code: PublicationFeatureCode | string;
};

export type ProductVariant = {
  id: string;
  attributes: ProductVariantAttribute[];
  availableAt: number[];
  merchantId: number;
  price: Price;
  formattedPrice: string;
  formattedPriceWithoutDiscount: string;
  purchaseChannel: PurchaseChannel;
  barcodes?: string[];
  quantity: number;
  size: string;
  scale: string;
  scaleAbbreviation: string;
  sizeDescription: string;
  isOneSize: boolean;
  publicationFeatures?: PublicationFeature[];
};
