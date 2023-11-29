import {
  type BlackoutError,
  FacetGroupFormat,
  FacetGroupKey,
} from '@farfetch/blackout-client';
import { mockState as brandsMockState } from '../brands/index.mjs';
import { mockBagItemEntity } from '../bags/bagItem.fixtures.mjs';
import { mockCategoriesState } from '../categories/index.mjs';
import { mockMerchantId, mockProductId } from './ids.fixtures.mjs';
import { mockProduct } from './products.fixtures.mjs';
import { mockProductGroupingAdapted } from './productGrouping.fixtures.mjs';
import { mockProductGroupingPropertiesAdapted } from './productGroupingProperties.fixtures.mjs';
import {
  mockProductsListHash,
  mockProductsListNormalizedPayload,
} from './productsLists.fixtures.mjs';
import { mockRecentlyViewedState } from './recentlyViewed.fixtures.mjs';
import { mockRecommendedProductSetState } from './recommendedProductSet.fixtures.mjs';
import { mockRecommendedProductsState } from './recommendedProducts.fixtures.mjs';
import type { ProductEntity } from '@farfetch/blackout-redux';

export const mockAttributesState = {
  attributes: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: undefined,
    },
  },
};
export const mockColorGroupingState = {
  colorGrouping: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: { message: 'Error' },
    },
    currentPageIndex: {
      [mockProductId]: 4,
    },
  },
};
export const mockGroupingState = {
  grouping: {
    isLoading: {
      [mockProductId]: { '?pageindex=1': false },
      456: { '?pageindex=1': false },
    },
    error: {
      [mockProductId]: { '?pageindex=1': undefined },
    },
    results: {
      [mockProductId]: { '?pageindex=1': mockProductGroupingAdapted },
    },
  },
};
export const mockGroupingPropertiesState = {
  groupingProperties: {
    isLoading: {
      [mockProductId]: { '!all': false },
      456: { '!all': false },
    },
    error: {
      [mockProductId]: { '!all': undefined },
    },
    results: {
      [mockProductId]: { '!all': mockProductGroupingPropertiesAdapted },
    },
  },
};
export const mockDetailsState = {
  details: {
    error: {
      [mockProductId]: undefined,
      456: undefined,
    },
    isHydrated: {
      [mockProductId]: false,
      456: false,
    },
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
  },
};
export const mockFittingsState = {
  fittings: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: new Error('Error') as BlackoutError,
    },
  },
};
export const mockOutfitsState = {
  outfits: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: new Error('Error') as BlackoutError,
    },
  },
};
export const mockProductsListsState = {
  lists: {
    error: { [mockProductsListHash]: undefined },
    isHydrated: {
      [mockProductsListHash]: true,
    },
    isLoading: { [mockProductsListHash]: false },
    hash: mockProductsListHash,
    productListingFacets: {
      isLoading: false,
      error: null,
      result: [],
    },
  },
};
export const mockMeasurementsState = {
  measurements: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: new Error('Error') as BlackoutError,
    },
  },
};
export const mockVariantsByMerchantsLocationsState = {
  variantsByMerchantsLocations: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: new Error('Error') as BlackoutError,
    },
  },
};
export const mockSizeGuidesState = {
  sizeGuides: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: undefined,
    },
  },
};
export const mockSizesState = {
  sizes: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: new Error('Error') as BlackoutError,
    },
  },
};
export const mockProductsState = {
  products: {
    ...mockAttributesState,
    ...mockColorGroupingState,
    ...mockGroupingState,
    ...mockGroupingPropertiesState,
    ...mockDetailsState,
    ...mockFittingsState,
    ...mockMeasurementsState,
    ...mockOutfitsState,
    ...mockProductsListsState,
    ...mockRecommendedProductSetState,
    ...mockSizeGuidesState,
    ...mockSizesState,
    ...mockVariantsByMerchantsLocationsState,
    ...mockRecommendedProductsState,
    ...mockRecentlyViewedState,
  },
  bag: {
    error: null,
    isLoading: false,
    result: null,
    id: '1',
    items: {
      ids: [101, 102, 103],
      item: {
        error: {},
        isLoading: {},
      },
    },
    bagOperations: {
      error: {},
      isLoading: {},
    },
    bagPromocodes: {
      error: null,
      isLoading: false,
      result: undefined,
    },
  },
  entities: {
    ...mockProductsListNormalizedPayload.entities,
    brands: {
      ...brandsMockState.entities.brands,
      6326412: {
        description: null,
        id: 6326412,
        name: 'Balenciaga',
        priceType: 0,
        slug: 'balenciaga',
      },
    },
    categories: {
      ...mockCategoriesState.entities.categories,
      135967: {
        id: 135967,
        name: '',
      },
    },
    bagItems: {
      101: {
        ...mockBagItemEntity,
        id: 101,
        quantity: 1,
        product: mockProductId,
        merchant: mockMerchantId,
        size: {
          ...mockBagItemEntity.size,
          id: 1,
          scale: 117,
          name: '37',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 10,
        },
      },
      102: {
        ...mockBagItemEntity,
        id: 102,
        quantity: 1,
        product: mockProductId,
        merchant: mockMerchantId,
        size: {
          ...mockBagItemEntity.size,
          scale: 117,
          id: 6,
          name: '41',
          scaleDescription: 'Jeans (waist)',
          scaleAbbreviation: 'WAIST',
          globalQuantity: 44,
        },
      },
      103: {
        ...mockBagItemEntity,
        id: 103,
        quantity: 1,
        product: mockProductId,
        merchant: 788,
        size: {
          ...mockBagItemEntity.size,
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
      // @ts-expect-error Missing a lot of product entity properties to be compliant with
      ...(mockProductsListNormalizedPayload.entities.products as Record<
        string,
        ProductEntity
      >),
      [mockProductId]: mockProduct,
    },
  },
};

export const mockProductsWithMultipleFacetGroupValuesState = {
  ...mockProductsState,
  entities: {
    ...mockProductsState.entities,
    facets: {
      ...mockProductsState.entities.facets,
      'sizes_17_148305_listing/woman/clothing?categories=135971&colors=6&pageindex=1':
        {
          value: 17,
          valueUpperBound: 0,
          description: '1 mth',
          slug: null,
          url: '?sizes=17',
          parentId:
            'sizes_0_listing/woman/clothing?categories=135971&colors=6&pageindex=1',
          _isDisabled: false,
          _isActive: false,
          groupsOn: 148305,
          count: 7,
          id: 'sizes_17_148305_listing/woman/clothing?categories=135971&colors=6&pageindex=1',
          groupType: 9,
        },
      'sizes_26_148177_listing/woman/clothing?categories=135971&colors=6&pageindex=1':
        {
          value: 26,
          valueUpperBound: 0,
          description: '38',
          slug: null,
          url: '?sizes=26',
          parentId:
            'sizes_0_listing/woman/clothing?categories=135971&colors=6&pageindex=1',
          _isDisabled: false,
          _isActive: false,
          groupsOn: 148177,
          count: 2200,
          id: 'sizes_26_148177_listing/woman/clothing?categories=135971&colors=6&pageindex=1',
          groupType: 9,
        },
    },
    productsLists: {
      ...mockProductsState.entities.productsLists,
      [mockProductsListHash]: {
        ...mockProductsState.entities.productsLists[mockProductsListHash],
        facetGroups: [
          ...mockProductsState.entities.productsLists[mockProductsListHash]
            .facetGroups,
          {
            deep: 0,
            description: 'Sizes',
            type: 9,
            order: 4,
            key: FacetGroupKey.Sizes,
            format: FacetGroupFormat.Multiple,
            values: [
              [
                'sizes_17_148305_listing/woman/clothing?categories=135971&colors=6&pageindex=1',
              ],
              [
                'sizes_26_148177_listing/woman/clothing?categories=135971&colors=6&pageindex=1',
              ],
            ],
            _clearUrl: null,
            _isClearHidden: false,
            _isClosed: false,
            dynamic: 0,
            hash: mockProductsListHash,
          },
        ],
      },
    },
  },
};
