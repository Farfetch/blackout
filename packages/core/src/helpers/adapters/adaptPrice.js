import deepCompact from 'deep-compact';
import isEmpty from 'lodash/isEmpty';

/**
 * Returns a price object adapted to all site areas (plp, pdp, bag, etc).
 *
 * @function adaptPrice
 * @memberof module:helpers/adapters
 *
 * @param {object} legacyPrice - Price to adapt.
 *
 * @returns {object} Price adapted to fit all site areas.
 */
export default legacyPrice => {
  if (!legacyPrice) {
    return;
  }

  if (legacyPrice.isFormatted) {
    return legacyPrice;
  }

  const priceFormatted = deepCompact({
    includingTaxes:
      legacyPrice.price !== undefined
        ? legacyPrice.price
        : legacyPrice.priceInclTaxes,
    includingTaxesWithoutDiscount:
      legacyPrice.priceWithoutDiscount !== undefined
        ? legacyPrice.priceWithoutDiscount
        : legacyPrice.priceInclTaxesWithoutDiscount,
    excludingTaxes: legacyPrice.priceExclTaxes,
    taxes: {
      rate: legacyPrice.taxesRate,
      amount: legacyPrice.taxesValue,
      type: legacyPrice.taxType,
    },
    discount: {
      rate:
        legacyPrice.discountRate !== undefined
          ? legacyPrice.discountRate
          : legacyPrice.promotionPercentage,
      includingTaxes: legacyPrice.discountInclTaxes,
      excludingTaxes: legacyPrice.discountExclTaxes,
    },
    tags: legacyPrice.tags,
    formatted: {
      includingTaxes: legacyPrice.formattedPrice,
      includingTaxesWithoutDiscount: legacyPrice.formattedPriceWithoutDiscount,
    },
    promocode: {
      rate: legacyPrice.promocodeDiscountPercentage,
    },
    // Price limit type for price range as an integer - { 0: minimum, 1: maximum }
    type: legacyPrice.type,
    // Promotion type as a string ["FullPrice", "Sale", "PrivateSale"]
    promotionType: legacyPrice.promotionType,
    // Type of price as an integer - { 0: FullPrice, 1: Sale, 2: PrivateSale }
    priceType: legacyPrice.priceType,
  });

  if (isEmpty(priceFormatted)) {
    return;
  }

  // We have to use the isFormatted flag to avoid re-adapting the price
  // when it is already formatted.
  return { ...priceFormatted, isFormatted: true };
};
