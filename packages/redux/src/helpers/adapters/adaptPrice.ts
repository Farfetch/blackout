import isEmpty from 'lodash/isEmpty';
import type { AdaptPrice, PlpPrice } from './types/adaptPrice.types';
import type {
  Price,
  ProductSummaryPrice,
  ProductSummaryTypedPrice,
} from '@farfetch/blackout-client';

/**
 * Returns a price object adapted to all site areas (plp, pdp, bag, etc).
 *
 * @param priceToAdapt - Price to adapt.
 *
 * @returns Price adapted to fit all site areas.
 */
const adaptPrice: AdaptPrice = priceToAdapt => {
  if (!priceToAdapt || isEmpty(priceToAdapt)) {
    return;
  }

  // If the price is already adapted/formatted, return it
  if ('isFormatted' in priceToAdapt) {
    return priceToAdapt;
  }

  // Have to manually define the type of the `priceToAdapt` for each situation, because it can
  // always be multiple things and TS (correctly) doesn't know.
  const priceFormatted = {
    discount: {
      excludingTaxes: (priceToAdapt as Price).discountExclTaxes,
      includingTaxes: (priceToAdapt as Price).discountInclTaxes,
      rate:
        (priceToAdapt as Price).discountRate ??
        (priceToAdapt as PlpPrice).promotionPercentage,
    },
    excludingTaxes: (priceToAdapt as Price).priceExclTaxes,
    formatted: {
      includingTaxes: priceToAdapt.formattedPrice,
      includingTaxesWithoutDiscount: priceToAdapt.formattedPriceWithoutDiscount,
    },
    includingTaxes:
      (priceToAdapt as PlpPrice).price ??
      (priceToAdapt as Price).priceInclTaxes,
    includingTaxesWithoutDiscount:
      (priceToAdapt as PlpPrice).priceWithoutDiscount ??
      (priceToAdapt as Price).priceInclTaxesWithoutDiscount,
    // Type of price as an integer - { 0: FullPrice, 1: Sale, 2: PrivateSale }
    priceType: (priceToAdapt as ProductSummaryPrice).priceType,
    promocode: {
      // Only exists on the checkout order item
      // @TODO: Verify if this is actually being done, because in the checkout order item entity
      // only the price is being adapted, there's no reference to `promocodeDiscountPercentage`
      // @ts-ignore
      rate: priceToAdapt.promocodeDiscountPercentage,
    },
    // Promotion type as a string ["FullPrice", "Sale", "PrivateSale"]. It comes
    // within the PLP's `prices`
    promotionType: (priceToAdapt as ProductSummaryTypedPrice).promotionType,
    tags: (priceToAdapt as Price).tags,
    taxes: {
      amount: (priceToAdapt as Price).taxesValue,
      rate: (priceToAdapt as Price).taxesRate,
      type: (priceToAdapt as Price).taxType,
    },
    // Price limit type for price range as an integer - { 0: minimum, 1: maximum }
    type: (priceToAdapt as ProductSummaryTypedPrice).type,
  };

  // Add the `isFormatted` flag to avoid re-adapting the price
  return {
    ...priceFormatted,
    isFormatted: true,
  };
};

export default adaptPrice;
