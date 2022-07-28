import { mockBreadCrumbs } from './products.fixtures';
import { mockPriceAdaptedEmpty, mockPricesResponse } from './price.fixtures';
import { mockSetId } from './ids.fixtures';
import type { FacetValue } from '@farfetch/blackout-client';

export const mockProductsListPathname = 'shopping/woman/clothing';
export const mockProductsListSlug = '/woman/clothing';
export const mockQuery = { categories: '135971', colors: '6', pageIndex: 1 };
export const mockQueryWithoutPageIndex = {
  categories: '135971',
  colors: '6',
};
export const mockProductsListHashWithoutParameters = 'listing/woman/clothing';
export const mockProductsListHash =
  'listing/woman/clothing?categories=135971&colors=6&pageindex=1';
export const mockProductsListHashWithoutPageIndex =
  'listing/woman/clothing?categories=135971&colors=6';
export const mockProductsListHashWithPageIndex2 =
  'listing/woman/clothing?categories=135971&colors=6&pageindex=2';
export const mockProductsListHashWithPageIndexParameter =
  'listing/woman/clothing?pageindex=1';
export const mockProductsListHashForSets =
  'sets/woman/clothing?categories=135971&colors=6&pageindex=1';
export const mockProductsListHashForSetsWithId = `sets/${mockSetId}`;
export const mockProductsListResponse = {
  breadCrumbs: [],
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
  didYouMean: [],
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
            count: 1,
            description: 'Clothing',
            groupsOn: 0,
            parentId: 0,
            slug: 'clothing',
            url: 'clothing',
            value: 136330,
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
  facetsBaseUrl: '/shopping',
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
  gender: null,
  genderName: null,
  name: null,
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
            formattedPrice: '100 €',
            formattedPriceWithoutCurrency: '100',
            formattedPriceWithoutDiscount: '100 €',
            formattedPriceWithoutDiscountAndCurrency: '100',
            price: 100,
            priceWithoutDiscount: 100,
            promotionPercentage: 0,
            promotionType: 'FullPrice',
            type: 0,
            typeDescription: 'Min',
          },
        ],
        slug: 'chuck-70-u-throat-ballet-sneakers-12913172',
        quantity: 7,
        brand: {
          description: null,
          id: 2450,
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
        merchantId: 11554,
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
    totalPages: 2,
    totalItems: 1,
  },
  redirectInformation: null,
  searchTerm: null,
  _clearUrl: null,
  _isClearHidden: false,
  _sorts: null,
};
export const mockGroupedEntries = {
  totalItems: 20,
  remaining: 15,
  entries: [
    {
      productId: 12912485,
      merchantId: 9359,
      shortDescription: 'Cotton Patchwork Trousers',
      images: [
        {
          order: 1,
          size: '50',
          url: 'image-1',
          sources: {
            50: 'image-1',
          },
        },
      ],
    },
  ],
};
export const mockMaxDepth = 4;
export const mockShallowestDepth = 1;
export const mockFacetsGroups = [
  {
    deep: 2,
    description: 'Categories',
    type: 6,
  },
  {
    deep: mockMaxDepth,
    description: 'Categories',
    type: 6,
  },
  {
    deep: mockShallowestDepth,
    description: 'Categories',
    type: 6,
  },
  {
    deep: 3,
    description: 'Categories',
    type: 6,
  },
];
export const mockSortOptions = [
  {
    key: 'price-asc',
    sort: 'PRICE',
    sortDirection: 'ASC',
    value: 0,
  },
  {
    key: 'price-desc',
    sort: 'PRICE',
    sortDirection: 'DESC',
    value: 1,
  },
  {
    key: 'new-items',
    sort: 'NEWITEMS',
    value: 0,
  },
];
export const mockFacets = [
  {
    count: 13,
    description: 'Women',
    groupsOn: 0,
    id: 'categories_144307',
    parentId: 'categories_0',
    slug: 'women',
    url: 'women',
    value: 144307,
    valueUpperBound: 0,
  },
  {
    count: 2,
    description: 'Accessories',
    groupsOn: 0,
    id: 'categories_144331',
    parentId: 'categories_144307',
    slug: 'women-accessories',
    url: 'women-accessories',
    value: 144331,
    valueUpperBound: 0,
  },
  {
    count: 1,
    description: 'Special Accessories',
    groupsOn: 0,
    id: 'categories_144424',
    parentId: 'categories_144418',
    slug: 'women-specials-special-accessories',
    url: 'women-specials-special-accessories',
    value: 144424,
    valueUpperBound: 0,
  },
  {
    count: 4,
    description: 'BLACK',
    groupsOn: 0,
    id: 'colors_1',
    parentId: 'colors_0',
    slug: null,
    url: '?colors=1',
    value: 1,
    valueUpperBound: 0,
  },
  {
    count: 13,
    description: 'FullPrice',
    groupsOn: 0,
    id: 'pricetype_0',
    parentId: 'pricetype_0',
    slug: 'fullprice',
    url: 'fullprice',
    value: 0,
    valueUpperBound: 0,
  },
  {
    count: 5,
    description: '36',
    groupsOn: 144307,
    id: 'sizes_22_144307',
    parentId: 'sizes_0',
    slug: null,
    url: '?sizes=22',
    value: 22,
    valueUpperBound: 0,
  },
] as const;

export const mockFacetsNormalized = mockFacets.reduce(
  (oldFacet, newFacet) => ({
    ...oldFacet,
    [newFacet.id]: {
      ...newFacet,
      _isActive: false,
      _isDisabled: false,
    },
  }),
  {},
) as Record<string, FacetValue>;

export const mockFacetGroups = [
  {
    deep: 1,
    description: 'Categories',
    type: 6,
    values: [
      [
        {
          value: 144307,
          valueUpperBound: 0,
          description: 'Women',
          slug: 'women',
          url: 'women',
          parentId: 0,
          _isDisabled: false,
          _isActive: false,
          groupsOn: 0,
          count: 13,
        },
      ],
    ],
    order: 0,
    key: 'categories',
    format: 'hierarchical',
    _clearUrl: null,
    _isClearHidden: false,
    _isClosed: false,
    dynamic: 0,
  },
  {
    deep: 2,
    description: 'Categories',
    type: 6,
    values: [
      [
        {
          value: 144331,
          valueUpperBound: 0,
          description: 'Accessories',
          slug: 'women-accessories',
          url: 'women-accessories',
          parentId: 144307,
          _isDisabled: false,
          _isActive: false,
          groupsOn: 0,
          count: 2,
        },
      ],
    ],
    order: 0,
    key: 'categories',
    format: 'hierarchical',
    _clearUrl: null,
    _isClearHidden: false,
    _isClosed: false,
    dynamic: 0,
  },
  {
    deep: 3,
    description: 'Categories',
    type: 6,
    values: [
      [
        {
          value: 144424,
          valueUpperBound: 0,
          description: 'Special Accessories',
          slug: 'women-specials-special-accessories',
          url: 'women-specials-special-accessories',
          parentId: 144418,
          _isDisabled: false,
          _isActive: false,
          groupsOn: 0,
          count: 1,
        },
      ],
    ],
    order: 0,
    key: 'categories',
    format: 'hierarchical',
    _clearUrl: null,
    _isClearHidden: false,
    _isClosed: false,
    dynamic: 0,
  },
  {
    deep: 0,
    description: 'Colors',
    type: 11,
    values: [
      [
        {
          value: 1,
          valueUpperBound: 0,
          description: 'BLACK',
          slug: null,
          url: '?colors=1',
          parentId: 0,
          _isDisabled: false,
          _isActive: false,
          groupsOn: 0,
          count: 4,
        },
      ],
    ],
    order: 5,
    key: 'colors',
    format: 'multiple',
    _clearUrl: null,
    _isClearHidden: false,
    _isClosed: false,
    dynamic: 0,
  },
  {
    deep: 0,
    description: 'PriceType',
    type: 14,
    values: [
      [
        {
          value: 0,
          valueUpperBound: 0,
          description: 'FullPrice',
          slug: 'fullprice',
          url: 'fullprice',
          parentId: 0,
          _isDisabled: false,
          _isActive: false,
          groupsOn: 0,
          count: 13,
        },
      ],
    ],
    order: 6,
    key: 'pricetype',
    format: 'multiple',
    _clearUrl: null,
    _isClearHidden: false,
    _isClosed: false,
    dynamic: 0,
  },
  {
    deep: 0,
    description: 'Sizes',
    type: 9,
    values: [
      [
        {
          value: 22,
          valueUpperBound: 0,
          description: '36',
          slug: null,
          url: '?sizes=22',
          parentId: 0,
          _isDisabled: false,
          _isActive: false,
          groupsOn: 144307,
          count: 5,
        },
      ],
    ],
    order: 4,
    key: 'sizes',
    format: 'multiple',
    _clearUrl: null,
    _isClearHidden: false,
    _isClosed: false,
    dynamic: 0,
  },
];

export const mockFacetGroupsNormalized = mockFacetGroups.map(
  (facet, index) => ({
    ...facet,
    values: [[mockFacets[index]?.id]],
  }),
);
export const mockProductsList = {
  breadCrumbs: mockBreadCrumbs,
  name: null,
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
      {
        id: 12913174,
        shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
        images: [
          {
            order: 1,
            size: '54',
            url: 'https://cdn-images.farfetch.com/12/91/31/74/12913174_13206158_54.jpg',
          },
        ],
        price: 129.7446,
        prices: [],
        slug: 'chuck-70-u-throat-ballet-sneakers-12913174',
        quantity: 7,
        groupedEntries: mockGroupedEntries,
      },
    ],
    number: 1,
    totalItems: 40,
    totalPages: 2,
  },
  facetGroups: mockFacetGroups,
  filterSegments: [
    {
      order: 0,
      type: 6,
      key: 'categories',
      gender: 0,
      value: 144307,
      valueUpperBound: 0,
      slug: 'women',
      description: 'Women',
      deep: 1,
      parentId: 0,
      fromQueryString: false,
      negativeFilter: false,
    },
  ],
  config: {
    pageSize: 20,
  },
};
const getMockProductsListNormalized = (includeImageQueryParam = true) => ({
  entities: {
    products: {
      12913172: {
        colorGrouping: undefined,
        customAttributes: undefined,
        groupedEntries: undefined,
        id: 12913172,
        images: [
          {
            order: 1,
            size: '54',
            url: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
            sources: {
              54: includeImageQueryParam
                ? 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg?c=2'
                : 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
            },
          },
        ],
        merchant: undefined,
        price: { ...mockPriceAdaptedEmpty, includingTaxes: 129.7446 },
        tag: { id: undefined, name: undefined },
        shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
        slug: 'chuck-70-u-throat-ballet-sneakers-12913172',
        prices: [],
        quantity: 7,
        sizes: undefined,
        variants: undefined,
      },
      12913174: {
        colorGrouping: undefined,
        customAttributes: undefined,
        groupedEntries: mockGroupedEntries,
        id: 12913174,
        images: [
          {
            order: 1,
            size: '54',
            url: 'https://cdn-images.farfetch.com/12/91/31/74/12913174_13206158_54.jpg',
            sources: {
              54: includeImageQueryParam
                ? 'https://cdn-images.farfetch.com/12/91/31/74/12913174_13206158_54.jpg?c=2'
                : 'https://cdn-images.farfetch.com/12/91/31/74/12913174_13206158_54.jpg',
            },
          },
        ],
        merchant: undefined,
        price: { ...mockPriceAdaptedEmpty, includingTaxes: 129.7446 },
        tag: { id: undefined, name: undefined },
        shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
        slug: 'chuck-70-u-throat-ballet-sneakers-12913174',
        prices: [],
        quantity: 7,
        sizes: undefined,
        variants: undefined,
      },
    },
    facets: mockFacetsNormalized,
    productsLists: {
      [mockProductsListHash]: {
        products: {
          entries: [12913172, 12913174],
          number: 1,
          totalItems: 40,
          totalPages: 2,
        },
        hash: mockProductsListHash,
        breadCrumbs: [
          {
            text: 'Woman',
            slug: 'woman',
            link: 'shopping/woman',
            parent: true,
          },
        ],
        name: null,
        facetGroups: mockFacetGroupsNormalized,
        filterSegments: [
          {
            order: 0,
            type: 6,
            key: 'categories',
            gender: 0,
            value: 144307,
            valueUpperBound: 0,
            slug: 'women',
            description: 'Women',
            deep: 1,
            parentId: 0,
            fromQueryString: false,
            negativeFilter: false,
            facetId: 'categories_144307',
          },
        ],
        config: { pageSize: 20 },
      },
    },
  },
  result: mockProductsListHash,
});
export const mockProductsListNormalized = getMockProductsListNormalized();
export const mockProductsListNormalizedWithoutImageOptions =
  getMockProductsListNormalized(false);
const getMockProductsListForSetsWithIdNormalized = (
  includeImageQueryParam = true,
) => ({
  entities: {
    merchants: {
      10973: {
        id: 10973,
        name: undefined,
        shoppingUrl: undefined,
      },
    },
    products: {
      12913172: {
        brand: 6326412,
        categories: [135967],
        colorGrouping: undefined,
        currencyIsoCode: 'EUR',
        customAttributes: undefined,
        gender: 1,
        genderName: 'Man',
        groupedEntities: null,
        groupedEntries: undefined,
        id: 12913172,
        images: [
          {
            order: 1,
            size: '54',
            url: 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
            sources: {
              54: includeImageQueryParam
                ? 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg?c=2'
                : 'https://cdn-images.farfetch.com/12/91/31/72/12913172_13206150_54.jpg',
            },
          },
        ],
        inInWishlist: false,
        labels: [
          {
            id: 3400,
            name: 'Almost here',
            priority: 0,
          },
        ],
        merchant: 10973,
        price: {
          ...mockPriceAdaptedEmpty,
          includingTaxes: 129.7446,
          priceType: 0,
          type: 0,
          includingTaxesWithoutDiscount: 100,
          formatted: {
            ...mockPriceAdaptedEmpty.formatted,
            includingTaxes: '100 €',
            includingTaxesWithoutDiscount: '100 €',
          },
          discount: {
            ...mockPriceAdaptedEmpty.discount,
            rate: 0,
          },
        },
        tag: { id: 0, name: 'No Tag' },
        shortDescription: 'Chuck 70 U-Throat Ballet sneakers',
        slug: 'chuck-70-u-throat-ballet-sneakers-12913172',
        prices: mockPricesResponse,
        quantity: 7,
        promotions: [],
        sizes: undefined,
        type: 0,
        variants: undefined,
        video: [],
      },
    },
    facets: {
      categories_136103: {
        value: 136103,
        count: 1,
        description: 'A-Line Skirts',
        groupsOn: 0,
        slug: 'skirts-a-line-skirts',
        url: 'woman/skirts-a-line-skirts',
        id: 'categories_136103',
        parentId: 'categories_0',
        valueUpperBound: 0,
        _isActive: false,
        _isDisabled: false,
      },
    },
    productsLists: {
      [mockProductsListHashForSetsWithId]: {
        products: {
          entries: [12913172],
          number: 1,
          totalItems: 40,
          totalPages: 2,
        },
        searchTerm: null,
        hash: 'sets/1050',
        name: 'cool set',
        gender: 0,
        genderName: 'foo-bar',
        _clearUrl: null,
        _isClearHidden: false,
        _sorts: null,
        breadCrumbs: [],
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
        id: 12913172,
        facetGroups: [
          {
            deep: 3,
            order: 1,
            description: 'Categories',
            dynamic: 1,
            type: 6,
            values: [['categories_136103']],
            key: 'categories',
            format: 'categories',
            _clearUrl: null,
            _isClearHidden: false,
            _isClosed: false,
          },
        ],
        facetsBaseUrl: '/sets/unisex/active-life',
        filterSegments: [
          {
            deep: 1,
            description: 'Women',
            facetId: undefined,
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
      },
    },
    brands: {
      6326412: {
        description: null,
        id: 6326412,
        name: 'Balenciaga',
        priceType: 0,
        slug: 'balenciaga',
      },
    },
    categories: {
      135967: {
        id: 135967,
      },
    },
  },
  result: mockProductsListHashForSetsWithId,
});
export const mockProductsListForSetsWithIdNormalized =
  getMockProductsListForSetsWithIdNormalized();
export const mockProductsListForSetsWithIdNormalizedWithoutImageOptions =
  getMockProductsListForSetsWithIdNormalized(false);
export const mockProductsListNormalizedPayload = {
  productsList: { hash: mockProductsListHash },
  result: mockProductsListHash,
  entities: {
    merchants: { undefined: { id: undefined } },
    genders: { undefined: { id: undefined } },
    products: {
      12913172: { id: 12913172, shortDescription: 'foo' },
      12913174: {
        id: 12913174,
        shortDescription: 'bar',
        groupedEntries: mockGroupedEntries,
      },
    },
    facets: mockFacetsNormalized,
    productsLists: {
      [mockProductsListHashWithoutParameters]: {
        products: {
          entries: [12913172, 12913174],
          number: 1,
          totalItems: 2,
          totalPages: 1,
        },
        config: {
          pageIndex: 1,
          pageSize: 20,
          sort: 'BRAND',
          sortDirection: 'ASC',
        },
      },
      [mockProductsListHash]: {
        breadCrumbs: mockBreadCrumbs,
        name: null,
        products: {
          entries: [12913172, 12913174],
          number: 1,
          totalItems: 40,
          totalPages: 2,
        },
        facetGroups: [
          {
            deep: 1,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [[mockFacets[0]?.id]],
          },
          {
            deep: 2,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [[mockFacets[1]?.id]],
          },
          {
            deep: 1,
            description: 'Colors',
            dynamic: 0,
            format: 'multiple',
            key: 'colors',
            type: 11,
            values: [[mockFacets[2]?.id]],
          },
          {
            deep: 0,
            description: 'SizesByCategory',
            dynamic: 136301,
            format: 'multiple',
            key: 'sizesbycategory',
            order: 5,
            type: 24,
            values: [['sizesbycategory_22_136301']],
          },
        ],
        filterSegments: [
          {
            order: 0,
            type: 6,
            key: 'categories',
            gender: 0,
            value: 144307,
            valueUpperBound: 0,
            slug: 'women',
            description: 'Women',
            deep: 1,
            parentId: 0,
            fromQueryString: false,
            negativeFilter: false,
          },
        ],
        config: {
          pageIndex: 1,
          pageSize: 20,
          sort: 'BRAND',
          sortDirection: 'ASC',
        },
        redirectInformation: {
          redirectUrl: '/en-pt/awesome-url-123',
        },
      },
      [mockProductsListHashWithPageIndex2]: {
        products: {
          entries: [12913172, 12913174],
        },
        config: {
          pageIndex: 2,
          pageSize: 20,
          sort: 'BRAND',
          sortDirection: 'ASC',
        },
      },
      [mockProductsListHashWithoutPageIndex]: {
        products: {
          entries: [12913172, 12913174],
        },
        config: {
          pageIndex: 1,
          pageSize: 20,
          sort: 'BRAND',
          sortDirection: 'ASC',
        },
      },
      [mockProductsListHashWithPageIndexParameter]: {
        products: {
          entries: [12913172, 12913174],
        },
        config: {
          pageIndex: 1,
          pageSize: 20,
          sort: 'BRAND',
          sortDirection: 'ASC',
        },
      },
      [mockProductsListHashForSetsWithId]: {
        breadCrumbs: mockBreadCrumbs,
        name: 'Awesome set',
        products: {
          entries: [12913172, 12913174],
          number: 1,
          totalItems: 40,
          totalPages: 2,
        },
        facetGroups: [
          {
            deep: 1,
            description: 'Categories',
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [[mockFacets[0]?.id]],
          },
          {
            deep: 2,
            description: 'Categories',
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [[mockFacets[1]?.id]],
          },
        ],
        filterSegments: [
          {
            order: 0,
            type: 6,
            key: 'categories',
            gender: 0,
            value: 136003,
            valueUpperBound: 0,
            slug: 'accessories-scarves',
            description: 'Scarves',
            deep: 2,
            parentId: 135973,
            fromQueryString: false,
            negativeFilter: false,
          },
          {
            order: 0,
            type: 11,
            key: 'colors',
            gender: null,
            value: 6,
            valueUpperBound: 0,
            slug: null,
            description: null,
            deep: 0,
            parentId: 0,
            fromQueryString: true,
            negativeFilter: false,
          },
        ],
        config: {
          pageIndex: 1,
          pageSize: 20,
          sort: 'BRAND',
          sortDirection: 'ASC',
        },
        redirectInformation: {
          redirectUrl: '/en-pt/awesome-url-123',
        },
      },
    },
  },
};
export const mockProductsListModel = {
  slug: mockProductsListSlug,
  subfolder: 'us',
  config: {
    pageIndex: 1,
  },
  breadCrumbs: [],
  facetsBaseUrl: '/en-pt/shopping',
  facetGroups: mockFacetGroups,
  filterSegments: [
    {
      order: 0,
      type: 6,
      key: 'categories',
      gender: 0,
      value: 144307,
      valueUpperBound: 0,
      slug: 'women',
      description: 'Women',
      deep: 1,
      parentId: 0,
      fromQueryString: false,
      negativeFilter: false,
    },
  ],
  gender: 0,
  genderName: 'Woman',
  id: 120198,
  name: 'New arrivals',
  products: {
    totalPages: 10,
    totalItems: 193,
    entries: [{ id: 123 }, { id: 321 }],
  },
  searchTerm: null,
  redirectInformation: null,
  pageType: 'listing',
};
