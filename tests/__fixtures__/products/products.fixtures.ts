import {
  mockBrandId,
  mockMerchantId,
  mockProductId,
  mockSetId,
  mockSizeScaleId,
  mockVariantId,
} from './ids.fixtures';
import { mockCategoryId } from '../categories';
import { mockPriceAdapted } from './price.fixtures';
import { mockProductAttributes } from './productAttributes.fixtures';
import { mockProductFittings } from './productFittings.fixtures';
import { mockProductSizeGuides } from './productSizeGuides.fixtures';
import { mockProductSizesAdapted } from './productSizes.fixtures';
import { mockProductVariants } from './productVariantsMerchantsLocations.fixtures';
import { mockProductVariantsMeasurements } from './productVariantsMeasurements.fixtures';
import type { ProductEntity } from '@farfetch/blackout-redux';

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
    parent: true,
  },
];

export const mockSet = {
  breadCrumbs: [],
  id: 12913172,
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
        video: [],
        price: 129.7446,
        prices: [
          {
            formattedPrice: '186,00 €',
            formattedPriceWithoutCurrency: '100',
            formattedPriceWithoutDiscount: '310,00 €',
            formattedPriceWithoutDiscountAndCurrency: '100',
            price: 100,
            priceWithoutDiscount: 100,
            promotionPercentage: 40,
            promotionType: 'FullPrice',
            type: 0,
            typeDescription: 'Min',
          },
        ],
        slug: 'chuck-70-u-throat-ballet-sneakers-12913172',
        quantity: 7,
        brand: {
          description: null,
          id: mockBrandId,
          name: 'Balenciaga',
          priceType: 0,
          slug: 'balenciaga',
        },
        categories: [
          {
            id: 135967,
          },
        ],
        gender: 1,
        genderName: 'Man',
        groupedEntities: null,
        inInWishlist: false,
        labels: [
          {
            id: 3400,
            name: 'Almost here',
            priority: 0,
          },
        ],
        merchantId: mockMerchantId,
        priceType: 0,
        priceWithoutDiscount: 100,
        promotionPercentage: 0,
        promotions: [],
        tag: 0,
        tagDescription: 'No Tag',
        type: 0,
        currencyIsoCode: 'EUR',
        formattedPrice: '100 €',
        formattedPriceWithoutDiscount: '100 €',
      },
    ],
    number: 1,
    totalItems: 40,
    totalPages: 2,
  },
  facetGroups: [
    {
      deep: 3,
      order: 1,
      description: 'Categories',
      dynamic: 1,
      type: 6,
      values: [
        [
          {
            value: 136103,
            count: 1,
            description: 'A-Line Skirts',
            groupsOn: 0,
            parentId: 0,
            slug: 'skirts-a-line-skirts',
            url: 'woman/skirts-a-line-skirts',
            valueUpperBound: 0,
            _isActive: false,
            _isDisabled: false,
          },
        ],
      ],
      key: 'categories',
      format: 'categories',
      _clearUrl: null,
      _isClearHidden: false,
      _isClosed: false,
    },
  ],
  filterSegments: [
    {
      deep: 1,
      description: 'Women',
      fromQueryString: false,
      gender: 0,
      key: 'categories',
      negativeFilter: false,
      order: 0,
      parentId: 0,
      slug: 'women',
      type: 6,
      value: 144307,
      valueUpperBound: 0,
    },
  ],
  facetsBaseUrl: '/sets/unisex/active-life',
  searchTerm: null,
  _clearUrl: null,
  _isClearHidden: false,
  _sorts: null,
  config: {
    availableSorts: ['PRICE'],
    contextFilters: null,
    discount: null,
    encodedQuery: null,
    filterTypes: [
      {
        deep: 1,
        id: 6,
        order: 0,
      },
    ],
    filtersStartHidden: false,
    imageSizes: [],
    mixedMode: {
      endDate: '/Date(1617596841000)/',
      forceFullPrice: false,
      startDate: '/Date(1617596841000)/',
    },
    mobilePageSize: null,
    noResultsImageUrl: null,
    pageIndex: 1,
    pageSize: 1,
    query: null,
    removeSingleValueFacets: false,
    scenarios: null,
    showChildrenCategories: false,
    sort: 'RANKING',
    sortDirection: 'DESC',
  },
};

export const mockProduct = {
  associationsInformation: {
    hasColorGrouping: true,
  },
  attributes: mockProductAttributes,
  brand: mockBrandId,
  breadCrumbs: mockBreadCrumbs,
  fittings: mockProductFittings,
  id: mockProductId,
  isDuplicated: false,
  labels: mockLabels,
  measurements: mockProductVariantsMeasurements,
  merchant: mockMerchantId,
  price: mockPriceAdapted,
  promotions: mockPromotions,
  quantity: 7,
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
  shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
  sizeGuides: mockProductSizeGuides,
  sizes: mockProductSizesAdapted,
  slug: 'chuck-70-u-throat-ballet-sneakers-12913174',
  tag: mockTag,
  variants: mockProductVariants,
};

export const mockProductEntity: ProductEntity = {
  brand: mockBrandId,
  categories: [mockCategoryId],
  merchant: mockMerchantId,
  associations: null,
  associationsInformation: {
    hasColorGrouping: false,
    hasGrouping: false,
  },
  id: mockProductId,
  scaleId: mockSizeScaleId,
  breadCrumbs: [
    {
      text: 'Woman',
      slug: 'woman',
      link: 'shopping/woman',
      parent: false,
    },
  ],
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
      size: '54',
      url: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
      sources: {
        54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
        600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
      },
    },
    {
      order: 2,
      size: '54',
      url: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
      sources: {
        54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
        600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
      },
    },
    {
      order: 3,
      size: '54',
      url: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
      sources: {
        54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
        600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
      },
    },
    {
      order: 4,
      size: '54',
      url: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
      sources: {
        54: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
        600: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_600.jpg',
      },
    },
    {
      order: 5,
      size: '54',
      url: 'https://cdn-images.farfetch-contents.com/converse-x-jw-anderson-chuck-70-hi-sneakers_13145097_17128969_54.jpg',
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
  sizes: mockProductSizesAdapted,
  sizeGuides: [
    {
      annotations: [],
      order: 0,
      brand: {
        id: mockBrandId,
        name: 'Gucci',
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
