import {
  mockAttributes,
  mockBreadCrumbs,
  mockPriceResponse,
  mockProduct,
  mockProductId,
  mockSetId,
  mockSizeScale,
  mockSizeScaleId,
  mockSizesResponse,
} from './products.fixtures';
import { mockMerchantId } from './merchants.fixtures';

const mockDataLayer = { general: { type: 'Product' } };
const mockProductSlug = 'rockstud-sling-back-flats-12854475';

const mockProductResult = {
  brand: {
    id: 1053,
  },
  categories: [
    {
      id: 136301,
      name: 'Shoes',
    },
  ],
  description: 'Luxury Italian',
  gender: 0,
  id: mockProductId,
  images: {
    images: [],
    liveModelId: 0,
    tag: null,
  },
  preferedMerchant: {
    merchantId: 9359,
  },
  shortDescription: 'Rockstud sling-back flats',
  customAttributes: null,
};

export const mockComplementaryInformation = [
  {
    title: 'Designer',
    value: '<p>Product designed by Chloé, originally from France.</p>',
  },
  {
    title: 'Care Information',
    value: '<p>Wash the item in low temperatures.</p>',
  },
];

export const mockDetailsModel = {
  dataLayer: mockDataLayer,
  slug: mockProductSlug,
  breadCrumbs: mockBreadCrumbs,
  complementaryInformation: mockComplementaryInformation,
  sizes: mockSizesResponse,
  scaleId: mockSizeScaleId,
  price: mockPriceResponse,
  productAttributes: mockAttributes,
  recommendedSet: mockSetId,
  result: mockProductResult,
  colorSet: [
    {
      productId: 14074682,
      name: 'stadium-goods-spider-print-t-shirt',
      url: '/en-pt/shopping/-stadium-goods-spider-print-t-shirt-14074682',
      image: '',
    },
  ],
  colorSwatch: null,
  imageGroups: [
    {
      order: 1,
      images: [
        {
          size: '120',
          url: 'https://cdn-images.farfetch-contents.com/services-unknown-x-browns-east-stadium-goods-tri-band-hoodie_14074610_18494976_120.jpg',
        },
      ],
    },
  ],
  relatedSets: [],
  liveModel: {
    id: 0,
  },
};

export const { dataLayer, ...mockResponse } = mockDetailsModel;

export const mockDetailsState = {
  details: {
    error: {
      [mockProductId]: 'Error - Not loaded.',
      456: null,
    },
    id: mockProductId,
    isHydrated: {
      [mockProductId]: false,
      456: false,
    },
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    attributes: {
      isLoading: {
        [mockProductId]: false,
        456: false,
      },
      error: {
        [mockProductId]: 'Error',
      },
    },
    colorGrouping: {
      isLoading: {
        [mockProductId]: false,
        456: false,
      },
      error: {
        [mockProductId]: 'Error',
      },
      currentPageIndex: {
        [mockProductId]: 4,
      },
    },
    fittings: {
      isLoading: {
        [mockProductId]: false,
        456: false,
      },
      error: {
        [mockProductId]: 'Error',
      },
    },
    measurements: {
      isLoading: {
        [mockProductId]: false,
        456: false,
      },
      error: {
        [mockProductId]: 'Error',
      },
    },
    recommendedSets: {
      isLoading: {
        [mockSetId]: false,
        456: false,
      },
      error: {
        [mockSetId]: 'Error',
      },
    },
    recommendedSetsWithOutOfStock: {
      isLoading: {
        [mockSetId]: false,
        456: false,
      },
      error: {
        [mockSetId]: { message: 'Error' },
      },
    },
    sets: {
      isLoading: {
        [mockSetId]: false,
        7861688: false,
      },
      error: {
        [mockSetId]: 'Error',
      },
    },
    sizeguides: {
      isLoading: {
        [mockProductId]: false,
        456: false,
      },
      error: {
        [mockProductId]: 'Error',
      },
    },
    sizeScale: {
      isLoading: {
        [mockSizeScaleId]: true,
        456: false,
      },
      error: {},
    },
    sizes: {
      isLoading: {
        [mockProductId]: false,
        456: false,
      },
      error: {
        [mockProductId]: 'Error',
      },
    },
    merchantsLocations: {
      isLoading: {
        [mockProductId]: false,
        456: false,
      },
      error: {
        [mockProductId]: 'Error',
      },
    },
  },
  bag: {
    id: 1,
  },
  entities: {
    bag: { 1: { id: 1, items: [101, 102, 103] } },
    bagItems: {
      101: {
        id: 101,
        quantity: 1,
        product: mockProductId,
        merchant: mockMerchantId,
        size: {
          id: 1,
          scale: 117,
          name: '37',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 10,
        },
      },
      102: {
        id: 102,
        quantity: 1,
        product: mockProductId,
        merchant: mockMerchantId,
        size: {
          scale: 117,
          id: 6,
          name: '40',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 44,
        },
      },
      103: {
        id: 103,
        quantity: 1,
        product: mockProductId,
        merchant: 788,
        size: {
          scale: 117,
          id: 1,
          name: '37',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 10,
        },
      },
    },
    products: {
      [mockProductId]: mockProduct,
    },
    sizeScales: {
      [mockSizeScaleId]: mockSizeScale,
    },
  },
};
