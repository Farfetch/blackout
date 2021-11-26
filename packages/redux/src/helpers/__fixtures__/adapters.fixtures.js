const basePrice = {
  discountExclTaxes: 104.17,
  discountInclTaxes: 125,
  discountRate: 50,
  formattedPrice: '125,00 €',
  formattedPriceWithoutCurrency: '125,00',
  formattedPriceWithoutDiscount: '250,00 €',
  formattedPriceWithoutDiscountAndCurrency: '250,00',
  priceExclTaxes: 104.17,
  promocodeDiscountPercentage: 50,
  tags: ['VAT'],
  taxesRate: 20,
  taxesValue: 20.83,
  taxType: 'VAT',
  type: 0,
  promotionType: 'FullPrice',
  priceType: 0,
};

const generateSizeAttributes = (
  sizeId = '20',
  description = 'S',
  scale = '115',
) => [
  { type: 0, description: 'Size', value: String(sizeId) },
  { type: 1, description: 'SizeDescription', value: description },
  { type: 2, description: 'Scale', value: String(scale) },
  { type: 3, description: 'ScaleDescription', value: 'Clothing standard' },
  { type: 4, description: 'ScaleAbbreviation', value: 'IT' },
];

const generateMockImg = (size, pos, name = 'foo') => ({
  size: String(size),
  url: `https://cdn-images.farfetch.com/${name}_${pos}_${size}.jpg`,
});

export const sizeAttributes = generateSizeAttributes();

export const priceWithInclTaxesKeys = {
  ...basePrice,
  priceInclTaxes: 125,
  priceInclTaxesWithoutDiscount: 250,
};

export const priceNoInclTaxesKeys = {
  ...basePrice,
  price: 125,
  priceWithoutDiscount: 250,
};

export const priceWithPromotionPercentage = {
  ...basePrice,
  discountRate: undefined,
  promotionPercentage: 50,
};

export const pricesForPriceRange = [
  {
    ...basePrice,
  },
  {
    discountExclTaxes: 150.17,
    discountInclTaxes: 180,
    discountRate: 50,
    formattedPrice: '180,00 €',
    formattedPriceWithoutCurrency: '180,00',
    formattedPriceWithoutDiscount: '250,00 €',
    formattedPriceWithoutDiscountAndCurrency: '250,00',
    priceExclTaxes: 150.17,
    promocodeDiscountPercentage: 50,
    tags: ['VAT'],
    taxesRate: 20,
    taxesValue: 20.83,
    taxType: 'VAT',
    type: 1,
    promotionType: 'FullPrice',
    priceType: 0,
  },
];

export const priceForFreeItem = {
  discountExclTaxes: 0,
  discountInclTaxes: 0,
  discountRate: 0,
  formattedPrice: '0,00 €',
  formattedPriceWithoutCurrency: '0,00',
  formattedPriceWithoutDiscount: '0,00 €',
  formattedPriceWithoutDiscountAndCurrency: '0,00',
  priceExclTaxes: 0,
  priceInclTaxes: 0,
  priceInclTaxesWithoutDiscount: 0,
  tags: ['VAT'],
  taxesRate: 20,
  taxesValue: 0,
  taxType: 'VAT',
};

export const groupedProductImages = [
  {
    order: 1,
    images: [generateMockImg(250, 1), generateMockImg(500, 1)],
  },
  {
    order: 2,
    images: [generateMockImg(250, 2), generateMockImg(500, 2)],
  },
  {
    order: 3,
    images: [generateMockImg(250, 3), generateMockImg(500, 3)],
  },
];

export const productImages = [
  {
    order: 1,
    ...generateMockImg(250, 1),
  },
  {
    order: 1,
    ...generateMockImg(500, 1),
  },
  {
    order: 2,
    ...generateMockImg(250, 2),
  },
  {
    order: 2,
    ...generateMockImg(500, 2),
  },
  {
    order: 3,
    ...generateMockImg(250, 3),
  },
  {
    order: 3,
    ...generateMockImg(500, 3),
  },
];

export const digitalAssets = [
  {
    mediaType: 'image/jpeg',
    displayOrder: 1,
    type: 0,
    ...generateMockImg(250, 1),
  },
  {
    mediaType: 'image/jpeg',
    displayOrder: 1,
    type: 0,
    ...generateMockImg(500, 1),
  },
];

export const mockDateStructure = {
  timestamp: 631152000000,
  string: '1990-1-1',
  jsonDate: '/Date(631152000000)/',
  jsonDateWithTime: '/Date(1580828400000+0549)/',
  jsonDateWithTimeTimestamp: 1580849340000,
};

const generateProductVariant = (quantity = 10, merchantId = 10001) => ({
  barcodes: ['23123423435365'],
  quantity,
  merchantId,
  formattedPrice: '€ 100.00',
  formattedPriceWithoutDiscount: '€ 100.00',
});

export const twoSizesProductVariants = [
  {
    size: '20',
    scale: '115',
    merchantId: 10001,
    purchaseChannel: 0,
    attributes: sizeAttributes,
  },
  {
    size: '21',
    scale: '115',
    merchantId: 10002,
    purchaseChannel: 1,
    attributes: [generateSizeAttributes(21, 'M')],
  },
];

export const productWithTwoSizes = [
  {
    sizeId: '20',
    sizeDescription: 'S',
    isOneSize: false,
    scale: '115',
    scaleAbbreviation: 'IT',
    variants: [
      generateProductVariant(20, 10001),
      generateProductVariant(20, 10002),
    ],
  },
  {
    sizeId: '21',
    sizeDescription: 'M',
    isOneSize: false,
    scale: '115',
    scaleAbbreviation: 'IT',
    variants: [generateProductVariant()],
  },
];

export const oneSizeProduct = [
  {
    sizeId: '17',
    sizeDescription: 'One Size',
    scale: '14',
    isOneSize: true,
    variants: [generateProductVariant()],
  },
];

export const outOfStockProduct = [
  {
    sizeId: '17',
    sizeDescription: 'One Size',
    scale: '14',
    isOneSize: true,
    variants: [generateProductVariant(0)],
  },
];

export const merchantNotAdapted = {
  merchantId: 123,
  merchantName: 'merchant123',
  merchantShoppingUrl: 'merchant-url',
};

export const merchantAdapted = {
  id: 123,
  name: 'merchant123',
  shoppingUrl: 'merchant-url',
};
