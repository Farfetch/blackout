import { mockState as brandsMockState } from '../brands';
import { mockMerchantId, mockProductId } from './ids.fixtures';
import { mockProduct } from './products.fixtures';
import { mockProductGroupingAdapted } from './productGrouping.fixtures';
import { mockProductGroupingPropertiesAdapted } from './productGroupingProperties.fixtures';
import {
  mockProductsListHash,
  mockProductsListNormalizedPayload,
} from './productsLists.fixtures';
import { mockRecentlyViewedState } from './recentlyViewed.fixtures';
import { mockRecommendedProductsState } from './recommendedProducts.fixtures';
import { mockRecommendedSetState } from './recommendedSet.fixtures';

export const mockAttributesState = {
  attributes: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: null,
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
      456: false,
    },
    error: {
      [mockProductId]: { '?pageindex=1': null },
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
      456: false,
    },
    error: {
      [mockProductId]: { '!all': null },
    },
    results: {
      [mockProductId]: { '!all': mockProductGroupingPropertiesAdapted },
    },
  },
};
export const mockDetailsState = {
  details: {
    error: {
      [mockProductId]: null,
      456: null,
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
      [mockProductId]: { message: 'Error' },
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
  },
};
export const mockMeasurementsState = {
  measurements: {
    isLoading: {
      [mockProductId]: false,
      456: false,
    },
    error: {
      [mockProductId]: { message: 'Error' },
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
      [mockProductId]: { message: 'Error' },
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
      [mockProductId]: null,
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
      [mockProductId]: { message: 'Error' },
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
    ...mockProductsListsState,
    ...mockRecommendedSetState,
    ...mockSizeGuidesState,
    ...mockSizesState,
    ...mockVariantsByMerchantsLocationsState,
    ...mockRecommendedProductsState,
    ...mockRecentlyViewedState,
  },
  bag: {
    id: 1,
    items: {
      ids: [101, 102, 103],
    },
  },
  entities: {
    ...mockProductsListNormalizedPayload.entities,
    ...brandsMockState.entities,
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
          name: '41',
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
      ...mockProductsListNormalizedPayload.entities.products,
      [mockProductId]: mockProduct,
    },
  },
};
