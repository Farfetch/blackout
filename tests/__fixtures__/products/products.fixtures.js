import { mockMerchantId } from './merchants.fixtures';

export const mockProductId = 11766695;
export const mockBrandId = 6326412;
export const mockVariantId = 'c6a09292-76a0-4219-ae33-b3737e3432a3';
export const mockSetId = 1050;
export const mockSetWithOutOfStockId = 202382;
export const mockSizeScaleId = 117;
export const mockProductTypeToExclude = 3;

export const mockPriceAdapted = {
  includingTaxes: 129.7446,
  includingTaxesWithoutDiscount: 129.7446,
};

export const mockPriceResponse = {
  priceExclTaxes: 500,
  priceInclTaxes: 610,
  priceInclTaxesWithoutDiscount: 610,
  discountExclTaxes: 0,
  discountInclTaxes: 0,
  discountRate: 0,
  taxesRate: 22,
  taxesValue: 110,
  tags: ['VAT'],
  formattedPrice: '610,00 €',
  formattedPriceWithoutDiscount: '610,00 €',
  formattedPriceWithoutCurrency: '610,00',
  formattedPriceWithoutDiscountAndCurrency: '610,00',
  taxType: 'VAT',
};

export const mockSize = {
  id: 1,
  globalQuantity: 10,
  scale: mockSizeScaleId,
  stock: [
    { merchantId: mockMerchantId, quantity: 2 },
    { merchantId: 788, quantity: 8 },
  ],
  isOneSize: false,
  isOutOfStock: false,
  name: '39',
};

export const mockSizesResponse = [
  {
    sizeId: '21',
    sizeDescription: '36',
    scale: '206',
    scaleAbbreviation: 'IT',
    isOneSize: false,
    variants: [
      {
        merchantId: 11554,
        formattedPrice: '4 300 €',
        formattedPriceWithoutDiscount: '4 300 €',
        quantity: 2,
        barcodes: ['2013323497172'],
      },
    ],
  },
];

export const mockSizes = [
  mockSize,
  {
    id: 2,
    globalQuantity: 10,
    scale: mockSizeScaleId,
    stock: [{ merchantId: mockMerchantId, quantity: 2 }],
    isOneSize: false,
    isOutOfStock: false,
    name: '40',
  },
  {
    id: 3,
    name: '12',
    scale: 'IT',
    stock: [{ merchantId: 333, quantity: 2 }],
  },
  {
    id: 4,
    name: '13',
    scale: 4,
    stock: [{ merchantId: mockMerchantId, quantity: 6 }],
  },
  {
    id: 5,
    scale: 5,
    stock: [
      { merchantId: 545, quantity: 0 },
      { merchantId: mockMerchantId, quantity: 2 },
      { merchantId: 896, quantity: 4 },
    ],
  },
  {
    id: 6,
    globalQuantity: 44,
    scale: mockSizeScaleId,
    stock: [{ merchantId: mockMerchantId, quantity: 7 }],
    isOneSize: false,
    isOutOfStock: false,
    name: '41',
  },
  {
    id: 7,
    globalQuantity: 1,
    scale: mockSizeScaleId,
    stock: [{ merchantId: mockMerchantId, quantity: 1 }],
    isOneSize: false,
    isOutOfStock: false,
    name: '43',
  },
  {
    id: 8,
    globalQuantity: 3,
    scale: mockSizeScaleId,
    stock: [
      { merchantId: mockMerchantId, quantity: 1 },
      { merchantId: 22, quantity: 2 },
    ],
    isOneSize: false,
    isOutOfStock: false,
    name: '44',
  },
  {
    id: 23,
    name: '23',
    scale: 'IT',
    stock: [
      { merchantId: mockMerchantId, quantity: 7 },
      { merchantId: 213, quantity: 5 },
      { merchantId: 456, quantity: 2 },
    ],
  },
];

export const mockOneSizeSizes = [
  {
    ...mockSize,
    isOneSize: true,
  },
];

export const mockOutOfStockSizes = [
  ...mockSizes,
  {
    ...mockSize,
    isOutOfStock: true,
  },
];

export const mockTag = { name: 'NewSeason', id: 1 };

export const mockPromotions = [
  {
    id: '1234-5678-9fa01',
    name: 'Mock Promotion',
  },
];

export const mockLabels = [
  { id: 1502, name: 'Label 2', priority: 2 },
  { id: 1503, name: 'Label 3', priority: 3 },
  { id: 1501, name: 'Label 1', priority: 1 },
];

export const mockSortedLabels = [
  { id: 1501, name: 'Label 1', priority: 1 },
  { id: 1502, name: 'Label 2', priority: 2 },
  { id: 1503, name: 'Label 3', priority: 3 },
];

export const mockMeasurements = [
  {
    attributes: [
      {
        type: 0,
        value: '17',
        description: 'Size',
      },
      {
        type: 1,
        value: '34',
        description: 'SizeDescription',
      },
    ],
    measurements: [],
  },
];

export const mockColorGrouping = [
  {
    entries: [
      {
        digitalAssets: [
          {
            mediaType: 'image/jpeg',
            displayOrder: 1,
            size: '54',
            url: 'https://api.blackout.com/14/26/08/35/14260835_20007113_54.jpg',
            type: 0,
          },
        ],
        color: '9075 WHITE',
        slug: 'woman-scarf-14260835',
        hasStock: true,
        id: 14260832,
        order: 1,
        isDefault: true,
        variantId: null,
      },
      {
        digitalAssets: [
          {
            mediaType: 'image/jpeg',
            displayOrder: 1,
            size: '54',
            url: 'https://api.blackout.com/14/26/08/34/14260834_20007111_54.jpg',
            type: 0,
          },
        ],
        color: '9075 PINK',
        slug: 'woman-scarf-14260834',
        hasStock: true,
        id: 14260833,
        order: 1,
        isDefault: null,
        variantId: null,
      },
    ],
    number: 0,
    totalItems: 2,
    totalPages: 1,
  },
  {
    entries: [
      {
        digitalAssets: [
          {
            mediaType: 'image/jpeg',
            displayOrder: 1,
            size: '54',
            url: 'https://api.blackout.com/14/26/08/35/14260835_20007113_54.jpg',
            type: 0,
          },
        ],
        color: '9075 YELLOW',
        slug: 'woman-scarf-14260835',
        hasStock: true,
        id: 14260834,
        order: 1,
        isDefault: true,
        variantId: null,
      },
      {
        digitalAssets: [
          {
            mediaType: 'image/jpeg',
            displayOrder: 1,
            size: '54',
            url: 'https://api.blackout.com/14/26/08/34/14260834_20007111_54.jpg',
            type: 0,
          },
        ],
        color: '9075 BLACK',
        slug: 'woman-scarf-14260834',
        hasStock: true,
        id: 14260835,
        order: 1,
        isDefault: null,
        variantId: null,
      },
    ],
    number: 1,
    totalItems: 2,
    totalPages: 1,
  },
];

export const mockAttributes = [
  {
    id: 7,
    name: 'Sleeve Length',
    values: [
      {
        id: 12,
        value: 'Longsleeved',
      },
    ],
  },
  {
    id: 8,
    name: 'Neckline',
    values: [
      {
        id: 14,
        value: 'Round Neck',
      },
    ],
  },
];

export const mockMerchantsLocations = [
  { merchantLocationId: 1, quantity: 0, variantId: mockVariantId },
  { merchantLocationId: 2, quantity: 1, variantId: 123 },
  { merchantLocationId: 3, quantity: 99, variantId: 456 },
];

export const mockVariants = [
  {
    id: mockVariantId,
    merchantId: 10948,
    price: {
      formatted: {
        includingTaxes: '$666',
      },
    },
    size: '25',
    merchantsLocations: mockMerchantsLocations,
  },
];

export const mockSizeguides = [
  {
    brand: {
      id: 4062,
      name: 'Alexander Wang',
    },
    maps: [
      {
        sizeScaleId: 4058,
        description: 'ALEXANDER WANG STANDARD',
        abbreviation: '',
        maps: [
          {
            description: 'XXS',
            position: 0,
          },
          {
            description: 'XXS',
            position: 1,
          },
        ],
      },
      {
        sizeScaleId: 1321,
        description: 'ALEXANDER WANG JEANS SIZE (IN)',
        abbreviation: 'IN',
        maps: [
          {
            description: '22',
            position: 0,
          },
          {
            description: '23',
            position: 1,
          },
        ],
      },
    ],
    annotations: [],
    order: 0,
  },
];

export const mockSizeScale = {
  sizeScaleId: mockSizeScaleId,
  description: 'Jeans (waist)',
  abbreviation: 'Waist',
  maps: [
    { description: '22', position: 17 },
    { description: '23', position: 18 },
    { description: '24', position: 19 },
    { description: '25', position: 20 },
    { description: '26', position: 21 },
    { description: '27', position: 22 },
    { description: '28', position: 23 },
    { description: '29', position: 24 },
    { description: '30', position: 25 },
    { description: '31', position: 26 },
    { description: '32', position: 27 },
    { description: '33', position: 28 },
    { description: '34', position: 29 },
    { description: '35', position: 30 },
    { description: '36', position: 31 },
    { description: '37', position: 32 },
    { description: '38', position: 33 },
  ],
};

export const mockBreadCrumbs = [
  {
    text: 'Woman',
    slug: 'woman',
    link: 'shopping/woman',
  },
];

export const mockSet = {
  name: 'cool set',
  gender: 0,
  genderName: 'foo-bar',
  products: {
    entries: [
      {
        id: 12913172,
        shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
        images: [
          {
            order: 1,
            size: '54',
            url: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
          },
        ],
        price: 129.7446,
        prices: [],
        slug: 'chuck-70-u-throat-ballet-sneakers-12913172',
        quantity: 7,
      },
    ],
    number: 1,
    totalItems: 40,
    totalPages: 2,
  },
  facetGroups: [
    {
      deep: 3,
      description: 'Categories',
      type: 6,
      values: [
        [
          {
            value: 136103,
            description: 'A-Line Skirts',
            slug: 'skirts-a-line-skirts',
            url: 'woman/skirts-a-line-skirts',
          },
        ],
      ],
      key: 'categories',
    },
  ],
};

export const mockRecommendedSet = {
  id: mockSetId,
  platformSetId: 9999,
  name: 'cool recommended set',
  slug: 'cool-recommended-set',
  products: [mockProductId],
};

export const mockFittings = [
  {
    type: 'Size Selection',
    description:
      'This piece fits true to size. We recommend you get your regular size',
  },
  {
    type: 'Overall fit',
    description: 'Cut for a slim fit',
  },
  {
    type: 'Fabric weifht & type',
    description: 'Made with a mid-weight fabric',
  },
];

export const mockProduct = {
  merchant: mockMerchantId,
  price: mockPriceAdapted,
  sizes: mockSizes,
  tag: mockTag,
  id: mockProductId,
  shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
  brand: mockBrandId,
  slug: 'chuck-70-u-throat-ballet-sneakers-12913174',
  quantity: 7,
  promotions: mockPromotions,
  labels: mockLabels,
  measurements: mockMeasurements,
  colorGrouping: mockColorGrouping,
  attributes: mockAttributes,
  variants: mockVariants,
  fittings: mockFittings,
  sizeguides: mockSizeguides,
  recommendedSet: mockSetId,
  relatedSets: [
    {
      setId: mockSetId,
      setType: 3,
    },
    {
      setId: 7861688,
      setType: 5,
    },
  ],
  scaleId: mockSizeScaleId,
  breadCrumbs: mockBreadCrumbs,
  isDuplicated: false,
  associationsInformation: {
    hasColorGrouping: true,
  },
};
