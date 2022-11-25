export const mockPriceAdaptedEmpty = {
  discount: {
    excludingTaxes: undefined,
    includingTaxes: undefined,
    rate: undefined,
  },
  excludingTaxes: undefined,
  formatted: {
    includingTaxes: undefined,
    includingTaxesWithoutDiscount: undefined,
  },
  includingTaxes: undefined,
  includingTaxesWithoutDiscount: undefined,
  isFormatted: true,
  priceType: undefined,
  promotionType: undefined,
  tags: undefined,
  taxes: {
    amount: undefined,
    rate: undefined,
    type: undefined,
  },
  type: undefined,
};

export const mockPriceAdapted = {
  ...mockPriceAdaptedEmpty,
  discount: {
    rate: 40,
    includingTaxes: 124,
    excludingTaxes: 100.8133,
  },
  excludingTaxes: 151.22,
  formatted: {
    includingTaxes: '186,00 €',
    includingTaxesWithoutDiscount: '310,00 €',
  },
  includingTaxes: 186,
  includingTaxesWithoutDiscount: 310,
  isFormatted: true,
  tags: ['VAT'],
  taxes: {
    rate: 23,
    amount: 34.78,
    type: 'VAT',
  },
};

export const mockPriceResponse = {
  priceExclTaxes: 151.22,
  priceInclTaxes: 186,
  priceInclTaxesWithoutDiscount: 310,
  discountExclTaxes: 100.8133,
  discountInclTaxes: 124,
  discountRate: 40,
  taxesRate: 23,
  taxesValue: 34.78,
  tags: ['VAT'],
  formattedPrice: '186,00 €',
  formattedPriceWithoutDiscount: '310,00 €',
  formattedPriceWithoutCurrency: '186,00',
  formattedPriceWithoutDiscountAndCurrency: '310,00',
  taxType: 'VAT',
};

export const mockPricesResponse = [
  {
    discount: {
      excludingTaxes: undefined,
      includingTaxes: undefined,
      rate: 40,
    },
    excludingTaxes: undefined,
    formatted: {
      includingTaxes: '186,00 €',
      includingTaxesWithoutDiscount: '310,00 €',
    },
    includingTaxes: 100,
    includingTaxesWithoutDiscount: 100,
    isFormatted: true,
    priceType: undefined,
    tags: undefined,
    taxes: {
      amount: undefined,
      rate: undefined,
      type: undefined,
    },
    type: 0,
    promotionType: 'FullPrice',
  },
];
