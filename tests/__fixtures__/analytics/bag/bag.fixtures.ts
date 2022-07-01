import type {
  BagItemEntity,
  BrandEntity,
  CategoryEntity,
  ProductEntity,
  SizeAdapted,
  StoreState,
} from '@farfetch/blackout-redux';

const mockProductId = 1234567;
const mockProductAlternativeId = 7654321;
const mockBagItemId = 12912485;
const mockBagItemAlternativeId = 12912999;
const mockBagId = 'f0064b5b-f5f2-4008-a7cb-29f6b1fca8b7';
const mockSizeScaleId = 123;
const mockBrandId = 6326412;
const mockCategoryId = 135967;
const mockVariantId = '1234567';

const mockCategoryEntity: CategoryEntity = {
  id: mockCategoryId,
  name: 'dress',
  gender: 0,
  parentId: 0,
};

const mockBrandEntity: BrandEntity = {
  id: mockBrandId,
  description: 'Gucci',
  name: 'Gucci',
};

const mockSizes: SizeAdapted[] = [
  {
    globalQuantity: 0,
    id: 1,
    isOutOfStock: false,
    name: 'S',
    scale: 1,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    isOneSize: false,
    stock: [
      {
        merchantId: 1223,
        quantity: 2,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
  },
  {
    globalQuantity: 1,
    id: 2,
    isOutOfStock: false,
    name: 'M',
    scale: 1,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    isOneSize: false,
    stock: [
      {
        merchantId: 1223,
        quantity: 2,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
  },
  {
    globalQuantity: 2,
    id: 3,
    isOutOfStock: true,
    name: 'L',
    scale: 1,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    isOneSize: false,
    stock: [
      {
        merchantId: 1223,
        quantity: 2,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
  },
  {
    globalQuantity: 5,
    id: 4,
    isOutOfStock: true,
    name: 'XL',
    scale: 1,
    scaleAbbreviation: 'it',
    scaleDescription: 'italian',
    isOneSize: false,
    stock: [
      {
        merchantId: 1223,
        quantity: 2,
        barcodes: [],
        price: {
          formatted: {
            includingTaxes: '$129.74',
            includingTaxesWithoutDiscount: '$129.74',
          },
        },
        purchaseChannel: null,
      },
    ],
  },
];

// @ts-ignore ignore unused properties
const mockProductEntity: ProductEntity = {
  id: mockProductId,
  scaleId: mockSizeScaleId,

  associationsInformation: {
    hasColorGrouping: false,
  },
  brand: mockBrandId,
  breadCrumbs: [
    {
      text: 'Woman',
      slug: 'woman',
      link: 'shopping/woman',
      parent: false,
    },
  ],
  categories: [mockCategoryId],
  description: 'biz',
  fittings: [
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
      type: 'Fabric weight & type',
      description: 'Made with a mid-weight fabric',
    },
  ],
  images: [
    {
      order: 1,
      sources: {
        54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
        600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
      },
    },
    {
      order: 2,
      sources: {
        54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
        600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
      },
    },
    {
      order: 3,
      sources: {
        54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
        600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
      },
    },
    {
      order: 4,
      sources: {
        54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
        600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
      },
    },
    {
      order: 5,
      sources: {
        54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
        600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
      },
    },
  ],
  measurements: [
    {
      description: 'Bust',
      unit: null,
      value: 85,
    },
    {
      description: 'Height',
      unit: null,
      value: 178,
    },
    {
      description: 'Hips',
      unit: null,
      value: 90,
    },
    {
      description: 'Waist',
      unit: null,
      value: 62,
    },
  ],
  price: {
    formatted: {
      includingTaxes: '$129.74',
      includingTaxesWithoutDiscount: '$129.74',
    },
    includingTaxes: 129.7446,
    includingTaxesWithoutDiscount: 129.7446,
    taxes: {
      type: 'VAT',
      rate: 0,
      amount: 0,
    },
    isFormatted: false,
  },
  shortDescription: 'foo',
  sizes: [...mockSizes],
  sizeGuides: [
    {
      annotations: [],
      order: 0,
      brand: {
        id: mockBrandEntity.id,
        name: mockBrandEntity.name,
      },
      maps: [
        {
          isDefault: false,
          categoryId: mockCategoryId,
          sizeScaleId: 950,
          description: 'CHLOÉ STANDARD',
          abbreviation: '',
          maps: [
            {
              description: 'XXXS',
              position: 0,
            },
            {
              description: 'M',
              position: 1,
            },
            {
              description: 'L',
              position: 2,
            },
          ],
        },
        {
          isDefault: false,
          categoryId: mockCategoryId,
          sizeScaleId: 955,
          description: 'CHLOÉ FRANCE',
          abbreviation: 'FR',
          maps: [
            {
              description: '0',
              position: 0,
            },
            {
              description: '2',
              position: 1,
            },
            {
              description: '4',
              position: 2,
            },
          ],
        },
        {
          isDefault: false,
          categoryId: mockCategoryId,
          sizeScaleId: 960,
          description: 'CHLOÉ US',
          abbreviation: 'US',
          maps: [
            {
              description: '0',
              position: 0,
            },
            {
              description: '1',
              position: 1,
            },
            {
              description: '2',
              position: 2,
            },
          ],
        },
        {
          isDefault: false,
          categoryId: mockCategoryId,
          sizeScaleId: 965,
          description: 'CHLOÉ UK',
          abbreviation: 'UK',
          maps: [
            {
              description: '50',
              position: 0,
            },
            {
              description: '55',
              position: 1,
            },
            {
              description: '60',
              position: 2,
            },
          ],
        },
      ],
    },
  ],
  sku: '000000000006175920',
  preferedMerchant: {
    merchantId: 9359,
    byAttribute: [
      {
        merchantId: 9359,
        type: 0,
        value: '$129.74',
      },
    ],
  },
  variants: [
    {
      id: mockVariantId,
      merchantId: 10948,
      merchantsLocations: [
        {
          merchantLocationId: 1,
          quantity: 0,
          variantId: mockVariantId,
        },
        {
          merchantLocationId: 2,
          quantity: 1,
          variantId: mockVariantId,
        },
        {
          merchantLocationId: 3,
          quantity: 99,
          variantId: mockVariantId,
        },
      ],
      price: {
        formatted: {
          includingTaxes: '$129.74',
          includingTaxesWithoutDiscount: '$129.74',
        },
        includingTaxes: 129.7446,
        includingTaxesWithoutDiscount: 129.7446,
        isFormatted: false,
      },
      size: 'S',
      attributes: [],
      sizeDescription: 'S',
      scaleAbbreviation: 'S',
      scale: 'S',
      quantity: 99,
      isOneSize: false,
      availableAt: [],
      purchaseChannel: 0,
      barcodes: [],
      formattedPrice: '$129.74',
      formattedPriceWithoutDiscount: '$129.74',
    },
  ],
  slug: 'bar',
  colors: [
    {
      color: {
        id: 112504,
        name: 'Red',
      },
      tags: ['MainColor'],
    },
    {
      color: {
        id: 2323429,
        name: 'degrade vermelho',
      },
      tags: ['DesignerColor'],
    },
  ],
};

const mockBagItem = (id: number = mockBagItemId) => ({
  id: id || mockBagItemId,
  getItem: ({
    size = mockSizes[0] as SizeAdapted,
    productId = mockProductId,
    quantity = 3,
  }: {
    size?: SizeAdapted;
    quantity?: number;
    productId?: number;
  }): BagItemEntity => ({
    id: id,
    gender: 0,
    productAggregator: null,
    attributes: [],
    product: productId,
    customAttributes: '',
    dateCreated: 1562573174875,
    fulfillmentInfo: {
      isPreOrder: false,
      fulfillmentDate: '2020-11-06T14:19:14.4398538Z',
    },

    isAvailable: true,
    isCustomizable: false,
    isExclusive: false,
    merchant: 9359,
    price: {
      discount: {
        rate: 0,
      },
      formatted: {
        includingTaxes: '$371.62',
        includingTaxesWithoutDiscount: '$371.62',
      },
      includingTaxes: 371.62,
      includingTaxesWithoutDiscount: 371.62,
      isFormatted: false,
    },
    promotionDetail: {
      totalDiscountPercentage: null,
      totalDiscountValue: 0,
      formattedTotalDiscountValue: '0,00 €',
      isProductOffer: false,
    },
    quantity: quantity,
    size: size,
  }),
});

const mockState: StoreState = {
  entities: {
    bagItems: {
      [mockBagItem().id]: mockBagItem().getItem({}),
      [mockBagItem(mockBagItemAlternativeId).id]: mockBagItem(
        mockBagItemAlternativeId,
      ).getItem({ productId: mockProductAlternativeId, quantity: 3 }),
    },
    brands: {
      [mockBrandEntity.id]: mockBrandEntity,
    },
    categories: {
      [mockCategoryEntity.id]: mockCategoryEntity,
    },
    products: {
      [mockProductEntity.id]: mockProductEntity,
      [mockProductAlternativeId]: {
        ...mockProductEntity,
        id: mockProductAlternativeId,
      },
    },
  },
};

export const bagMockData = {
  mockProductId,
  mockProductAlternativeId,
  mockBagItemId,
  mockBagItemAlternativeId,
  mockBagId,
  mockBrandId,
  mockCategoryId,
  mockState,
  mockBagItem,
  mockSizes,
};
