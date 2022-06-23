import type { Item as CheckoutOrderItem } from '@farfetch/blackout-client/checkout/types';
import type {
  Price,
  ProductSummaryPrice,
  ProductSummaryTypedPrice,
} from '@farfetch/blackout-client/products/types';

export type PlpPrice = ProductSummaryPrice & ProductSummaryTypedPrice;

// There are several properties marked as optional due to the source of the data. For instance:
// - from a PLP's `prices` - there is no `discount.includingTaxes`, `discount.excludingTaxes`,
//   `excludingTaxes`, `priceType`, `tags` and `taxes`
// - from a PDP's `price` - there is no `type` and `promotionType`
// - from a checkout order item - only place with `discount.rate`
export type PriceAdapted =
  | {
      discount?: {
        rate: Price['discountRate'];
        includingTaxes?: Price['discountInclTaxes'];
        excludingTaxes?: Price['discountExclTaxes'];
      };
      excludingTaxes?: Price['priceExclTaxes'];
      formatted: {
        includingTaxes: Price['formattedPrice'];
        includingTaxesWithoutDiscount: Price['formattedPriceWithoutDiscount'];
      };
      includingTaxes: Price['priceInclTaxes'];
      includingTaxesWithoutDiscount: Price['priceInclTaxesWithoutDiscount'];
      isFormatted: boolean;
      priceType?: ProductSummaryPrice['priceType'];
      promocode?: {
        rate: CheckoutOrderItem['promocodeDiscountPercentage'];
      };
      promotionType?: ProductSummaryTypedPrice['promotionType'];
      tags?: Price['tags'];
      taxes?: {
        rate: Price['taxesRate'];
        amount: Price['taxesValue'];
        type: Price['taxType'];
      };
      type?: ProductSummaryTypedPrice['type'];
    }
  | undefined;

export type AdaptPrice = (
  priceToAdapt:
    | Price
    | ProductSummaryPrice
    | ProductSummaryTypedPrice
    | PriceAdapted,
) => PriceAdapted;
