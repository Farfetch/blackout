import type { Price, ProductSummaryPrice } from '../../../products/types';

export type PriceAdapted =
  | {
      isFormatted: boolean;
      includingTaxes: Price['priceInclTaxes'];
      includingTaxesWithoutDiscount: Price['priceInclTaxesWithoutDiscount'];
      excludingTaxes: Price['priceExclTaxes'];
      taxes: {
        rate: Price['taxesRate'];
        amount: Price['taxesValue'];
        type: Price['taxType'];
      };
      discount: {
        rate: Price['discountRate'];
        includingTaxes: Price['discountInclTaxes'];
        excludingTaxes: Price['discountExclTaxes'];
      };
      tags: Price['tags'];
      formatted: {
        includingTaxes: Price['formattedPrice'];
        includingTaxesWithoutDiscount: Price['formattedPriceWithoutDiscount'];
      };
      promocode: {
        rate: number;
      };
      type: number;
      promotionType: number;
      priceType: number;
    }
  | undefined;

export type AdaptPrice = (
  legacyPrice:
    | (Price & Record<string, unknown>)
    | (ProductSummaryPrice & Record<string, unknown>)
    | {
        price: number;
        formattedPrice: string;
        formattedPriceWithoutDiscount: string;
        priceType: number;
        priceWithoutDiscount: number;
        currencyIsoCode: string;
        promotionPercentage: number;
        [k: string]: unknown;
      }
    | (PriceAdapted & Record<string, unknown>),
) => PriceAdapted;
