import type { Attribute, PurchaseChannel } from '../../types/index.js';
import type { Price } from './price.types.js';

export enum PublicationFeatureCode {
  IMMEDIATE_FULFILMENT = 'IMMEDIATE_FULFILMENT',
  PREORDER = 'PREORDER',
  BACKORDER = 'BACKORDER',
}

export type PublicationFeature = {
  /**
   * Code of the publication feature.
   * For example: "IMMEDIATE_FULFILMENT", "PREORDER", "BACKORDER".
   */
  code: PublicationFeatureCode | string;
};

export type ProductVariant = {
  id: string;
  attributes: Attribute[];
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
