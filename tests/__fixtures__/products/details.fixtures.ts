import { mockBreadCrumbs, mockPriceResponse } from './products.fixtures';
import { mockProductAttributes } from './productAttributes.fixtures';
import { mockProductId, mockSetId, mockSizeScaleId } from './ids.fixtures';
import { mockProductSizes } from './productSizes.fixtures';

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

export const mockDetailsModel = {
  dataLayer: mockDataLayer,
  slug: mockProductSlug,
  breadCrumbs: mockBreadCrumbs,
  complementaryInformation: mockComplementaryInformation,
  sizes: mockProductSizes,
  scaleId: mockSizeScaleId,
  price: mockPriceResponse,
  productAttributes: mockProductAttributes,
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
          url: 'https://cdn-images.farfetch-contents.com/services-unknown-x-east-stadium-goods-tri-band-hoodie_14074610_18494976_120.jpg',
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

const getMockProductResponseNormalized = (includeImageQueryParam = true) => ({
  entities: {
    categories: { 136301: { id: 136301, name: 'Shoes' } },
    brands: { 1053: { id: 1053 } },
    products: {
      [mockProductId]: {
        customAttributes: null,
        images: [
          {
            size: '120',
            url: 'https://cdn-images.farfetch-contents.com/services-unknown-x-east-stadium-goods-tri-band-hoodie_14074610_18494976_120.jpg',
            order: 1,
            sources: {
              120: includeImageQueryParam
                ? 'https://cdn-images.farfetch-contents.com/services-unknown-x-east-stadium-goods-tri-band-hoodie_14074610_18494976_120.jpg?c=2'
                : 'https://cdn-images.farfetch-contents.com/services-unknown-x-east-stadium-goods-tri-band-hoodie_14074610_18494976_120.jpg',
            },
          },
        ],
        price: {
          includingTaxes: 610,
          includingTaxesWithoutDiscount: 610,
          excludingTaxes: 500,
          taxes: { rate: 22, amount: 110, type: 'VAT' },
          discount: { rate: 0, includingTaxes: 0, excludingTaxes: 0 },
          tags: ['VAT'],
          formatted: {
            includingTaxes: '610,00 €',
            includingTaxesWithoutDiscount: '610,00 €',
          },
          isFormatted: true,
        },
        sizes: [
          {
            globalQuantity: 2,
            id: 21,
            isOneSize: false,
            isOutOfStock: false,
            name: '36',
            scale: 206,
            scaleAbbreviation: 'IT',
            scaleDescription: undefined,
            stock: [
              {
                barcodes: ['2013323497172'],
                merchantId: 11554,
                price: {
                  formatted: {
                    includingTaxes: '4 300 €',
                    includingTaxesWithoutDiscount: '4 300 €',
                  },
                },
                purchaseChannel: null,
                quantity: 2,
              },
            ],
          },
        ],
        tag: {
          id: undefined,
          name: undefined,
        },
        isDuplicated: false,
        id: mockProductId,
        brand: 1053,
        categories: [136301],
        description: 'Luxury Italian',
        gender: 0,
        preferedMerchant: { merchantId: 9359 },
        shortDescription: 'Rockstud sling-back flats',
        slug: mockProductSlug,
        breadCrumbs: mockBreadCrumbs,
        complementaryInformation: mockComplementaryInformation,
        scaleId: 117,
        productAttributes: mockProductAttributes,
        recommendedSet: mockSetId,
        colorSet: mockDetailsModel.colorSet,
        colorSwatch: null,
        relatedSets: [],
        liveModel: { id: 0 },
        colorGrouping: undefined,
        groupedEntries: undefined,
        merchant: undefined,
        prices: undefined,
        variants: undefined,
      },
    },
  },
  result: mockProductId,
});

export const mockProductResponseNormalized = getMockProductResponseNormalized();
export const mockProductResponseNormalizedWithoutImageOptions =
  getMockProductResponseNormalized(false);
