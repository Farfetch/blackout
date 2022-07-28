import { mockBreadCrumbs } from './products.fixtures';
import { mockProductSizes } from './productSizes.fixtures';

export const imageGroup = [
  {
    images: [
      {
        size: '120',
        url: 'https://cdn-images.farfetch-contents.com/services-unknown-x-east-stadium-goods-tri-band-hoodie_14074610_18494976_120.jpg',
      },
    ],
    order: 1,
  },
];

export const mockProductDetails = {
  breadCrumbs: mockBreadCrumbs,
  colorSet: [],
  colorSwatch: null,
  complementaryInformation: [],
  currencyIsoCode: null,
  imageGroups: imageGroup,
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
  price: null,
  productRef: null,
  productSize: 'M',
  recommendedSet: 1050,
  redirectInfo: null,
  relatedSets: [],
  result: {
    associations: null,
    associationsInformation: {
      hasColorGrouping: false,
      hasGrouping: false,
    },
    brand: {
      description:
        'Demna Gvasalia brings Balenciaga back to its creative roots.',
      id: 2450,
      name: 'Balenciaga',
      priceType: 0,
      slug: 'rockstud-sling-back-flats-12854475',
    },
    brandStyleId: '620973TKV99',
    care: [
      {
        instruction: 'Washing Instructions',
        value: 'Hand Wash',
      },
    ],
    categories: [
      {
        gender: 1,
        id: 136301,
        name: 'Shoes',
        parentId: 0,
      },
    ],
    colors: [
      {
        color: {
          id: 112502,
          name: 'Green',
        },
        tags: ['MainColor'],
      },
    ],
    compositions: [
      {
        material: 'Cotton',
        productId: 0,
        productPart: null,
        value: '100',
      },
    ],
    customAttributes: null,
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
    fulfillmentDate: null,
    gender: 0,
    hasParentProduct: false,
    id: 16192978,
    images: {
      images: [],
      liveModel: null,
      liveModelId: 0,
      productSize: null,
      tag: null,
    },
    isCustomizable: false,
    isExclusive: false,
    isOnline: true,
    labels: [
      {
        id: 2100,
        name: 'Back in stock',
        priority: 6,
      },
    ],
    madeIn: 'Portugal',
    measurements: [],
    parentProductId: 0,
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
    promotions: null,
    scaleId: 4325,
    season: {
      id: 14731449,
      name: null,
    },
    shortDescription: 'Rockstud sling-back flats',
    sku: 'unisex-print-oversized-hoodie-16192978',
    styleId: 17449261,
    tag: 0,
    tagDescription: 'NoTag',
    translatedAttributes: null,
    type: 0,
    variants: [
      {
        id: '67496013-d943-43ab-a03b-e90f4941d78b',
        attributes: [
          {
            description: 'Size',
            type: 0,
            value: '17',
          },
        ],
        availableAt: [307],
        merchantId: 11554,
        barcodes: ['2016192978179'],
        formattedPrice: '100 €',
        formattedPriceWithoutDiscount: '100 €',
        priceInclTaxes: 100,
        priceInclTaxesWithoutDiscount: 100,
        quantity: 0,
        isOneSize: false,

        price: {
          discountExclTaxes: 0,
          discountInclTaxes: 0,
          discountRate: 0,
          formattedPrice: '100 €',
          formattedPriceWithoutCurrency: '100',
          formattedPriceWithoutDiscount: '100 €',
          formattedPriceWithoutDiscountAndCurrency: '100',
          priceExclTaxes: 81.3,
          priceInclTaxes: 100,
          priceInclTaxesWithoutDiscount: 100,
          tags: ['VAT'],
          taxType: 'VAT',
          taxesRate: 23,
          taxesValue: 18.7,
        },
        purchaseChannel: 0,
        scale: '4325',
        scaleAbbreviation: '',
        size: '17',
        sizeDescription: 'XXS',
      },
    ],
    variations: [],
    videos: [],
  },
  scaleId: 4325,
  selectedSize: null,
  sizeSet: null,
  sizes: mockProductSizes,
  slug: 'rockstud-sling-back-flats-12854475',
};
