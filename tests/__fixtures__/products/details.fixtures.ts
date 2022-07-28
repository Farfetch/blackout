import { imageGroup } from './product.fixtures';
import { mockBreadCrumbs } from './products.fixtures';
import { mockPriceResponse } from './price.fixtures';
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
  scaleId: mockSizeScaleId,
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
  imageGroups: imageGroup,
  relatedSets: [],
  liveModel: {
    id: 0,
  },
};

export const { dataLayer, ...mockResponse } = mockDetailsModel;

const getMockProductResponseNormalized = (includeImageQueryParam = true) => ({
  entities: {
    categories: {
      136301: { id: 136301, name: 'Shoes', gender: 1, parentId: 0 },
    },
    brands: {
      2450: {
        description:
          'Demna Gvasalia brings Balenciaga back to its creative roots.',
        id: 2450,
        name: 'Balenciaga',
        priceType: 0,
        slug: 'rockstud-sling-back-flats-12854475',
      },
    },
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
          id: 0,
          name: 'NoTag',
        },
        translatedAttributes: null,
        type: 0,
        variants: [
          {
            attributes: [
              {
                description: 'Size',
                type: 0,
                value: '17',
              },
            ],
            availableAt: [307],
            merchantId: 11554,
            price: {
              discount: {
                excludingTaxes: 0,
                includingTaxes: 0,
                rate: 0,
              },
              excludingTaxes: 81.3,
              formatted: {
                includingTaxes: '100 €',
                includingTaxesWithoutDiscount: '100 €',
              },
              includingTaxes: 100,
              includingTaxesWithoutDiscount: 100,
              isFormatted: true,
              priceType: undefined,
              promocode: {
                rate: undefined,
              },
              promotionType: undefined,
              tags: ['VAT'],
              taxes: {
                amount: 18.7,
                rate: 23,
                type: 'VAT',
              },
              type: undefined,
            },
            priceInclTaxes: 100,
            priceInclTaxesWithoutDiscount: 100,
            purchaseChannel: 0,
            scale: '4325',
            scaleAbbreviation: '',
            size: '17',
            sizeDescription: 'XXS',
            barcodes: ['2016192978179'],
            formattedPrice: '100 €',
            formattedPriceWithoutDiscount: '100 €',
            id: '67496013-d943-43ab-a03b-e90f4941d78b',
            quantity: 0,
            isOneSize: false,
          },
        ],
        variations: [],
        videos: [],
        id: mockProductId,
        brand: 2450,
        associations: null,
        associationsInformation: {
          hasColorGrouping: false,
          hasGrouping: false,
        },
        brandStyleId: '620973TKV99',
        categories: [136301],
        description: 'Luxury Italian',
        digitalAssets: [
          {
            displayOrder: 1,
            mediaType: 'image/jpeg',
            size: '54',
            type: 0,
            url: 'https://cdn-images.farfetch-contents.com/balenciaga-unisex-print-oversized-hoodie_16192978_32622649_54.jpg',
          },
        ],
        gender: 0,
        hasParentProduct: false,
        fulfillmentDate: null,
        shortDescription: 'Rockstud sling-back flats',
        recommendedSet: 1050,
        productSize: 'M',
        selectedSize: null,
        productRef: null,
        redirectInfo: null,
        promotions: null,
        scaleId: 4325,
        sizeSet: null,
        season: {
          id: 14731449,
          name: null,
        },
        slug: mockProductSlug,
        sku: 'unisex-print-oversized-hoodie-16192978',
        styleId: 17449261,
        breadCrumbs: mockBreadCrumbs,
        care: [
          {
            instruction: 'Washing Instructions',
            value: 'Hand Wash',
          },
        ],
        complementaryInformation: [],
        compositions: [
          { material: 'Cotton', productId: 0, productPart: null, value: '100' },
        ],
        currencyIsoCode: null,
        colors: [
          {
            color: {
              id: 112502,
              name: 'Green',
            },
            tags: ['MainColor'],
          },
        ],
        colorSet: [],
        colorSwatch: null,
        relatedSets: [],
        liveModel: {
          globalId: '00000000-0000-0000-0000-000000000000',
          id: 1796,
          measurements: [
            {
              description: 'Bust',
              unit: 'cm',
              value: 90,
            },
          ],
          name: 'Leo / HK / Elegance',
        },
        isCustomizable: false,
        isExclusive: false,
        isDuplicated: true,
        isOnline: true,
        labels: [
          {
            id: 2100,
            name: 'Back in stock',
            priority: 6,
          },
        ],
        colorGrouping: undefined,
        groupedEntries: undefined,
        merchant: undefined,
        madeIn: 'Portugal',
        parentProductId: 0,
        measurements: [],
        prices: undefined,
        preferedMerchant: {
          byAttribute: [
            {
              merchantId: 11554,
              type: 0,
              value: '17',
            },
          ],
          merchantId: 11554,
        },
        price: undefined,
      },
    },
  },
  result: mockProductId,
});
export const mockProductResponseNormalized = getMockProductResponseNormalized();
export const mockProductResponseNormalizedWithoutImageOptions =
  getMockProductResponseNormalized(false);
