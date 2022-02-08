import {
  mockBrandId,
  mockMerchantId,
  mockProductId,
  mockSetId,
  mockSizeScaleId,
} from './ids.fixtures';
import { mockPriceAdapted } from './price.fixtures';
import { mockProductAttributes } from './productAttributes.fixtures';
import { mockProductColorGrouping } from './productColorGrouping.fixtures';
import { mockProductFittings } from './productFittings.fixtures';
import { mockProductSizeGuides } from './productSizeGuides.fixtures';
import { mockProductSizesAdapted } from './productSizes.fixtures';
import { mockProductVariants } from './productVariantsByMerchantsLocations.fixtures';
import { mockProductVariantsMeasurements } from './productVariantsMeasurements.fixtures';

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

export const mockProduct = {
  associationsInformation: {
    hasColorGrouping: true,
  },
  attributes: mockProductAttributes,
  brand: mockBrandId,
  breadCrumbs: mockBreadCrumbs,
  colorGrouping: mockProductColorGrouping,
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
