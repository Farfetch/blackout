import { mockBreadCrumbs } from './products.fixtures';

export const mockListingSlug = '/listing/woman/clothing';
export const mockSubfolder = 'us';
export const mockQuery = { categories: '135971', colors: '6', pageIndex: '1' };
export const mockQueryWithoutPageIndex = {
  categories: '135971',
  colors: '6',
};
export const mockListingHash =
  '/us/listing/woman/clothing?categories=135971&colors=6&pageindex=1';
export const mockListingHashWithoutPageIndex =
  '/us/listing/woman/clothing?categories=135971&colors=6';

export const mockListingResponse = {
  result: {
    entries: [
      {
        id: 1234,
        shortDescription: 'white shirt',
        slug: 'white-shirt-slug',
      },
    ],
  },
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
    description: 'Aquazzura',
    groupsOn: 0,
    id: 'brands_580741',
    parentId: 'brands_0',
    slug: 'aquazzura',
    url: 'aquazzura',
    value: 580741,
    valueUpperBound: 0,
  },
  {
    description: 'Prada',
    groupsOn: 0,
    id: 'brands_34624',
    parentId: 'brands_0',
    slug: 'prada',
    url: 'prada',
    value: 34624,
    valueUpperBound: 0,
  },
  {
    description: 'Shoes',
    groupsOn: 0,
    id: 'categories_136301',
    parentId: 'categories_0',
    slug: 'shoes',
    url: 'shoes',
    value: 136301,
    valueUpperBound: 0,
  },
  {
    description: 'Ballerina Shoes',
    groupsOn: 0,
    id: 'categories_136484',
    parentId: 'categories_136301',
    slug: 'shoes-ballerina-shoes',
    url: 'shoes-ballerina-shoes',
    value: 136484,
    valueUpperBound: 0,
  },
  {
    description: 'Black',
    groupsOn: 0,
    id: 'colors_1',
    parentId: 'colors_0',
    slug: null,
    url: '?colors=1',
    value: 1,
    valueUpperBound: 0,
  },
];
export const mockFacetGroups = [
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
];

export const mockSearchResult = {
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

export const mockListingNormalizedPayload = {
  listing: { hash: mockListingHash },
  result: mockListingHash,
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
    facets: {
      [mockFacets[0].id]: mockFacets[0],
      [mockFacets[1].id]: mockFacets[1],
      [mockFacets[2].id]: mockFacets[2],
      [mockFacets[3].id]: mockFacets[3],
      [mockFacets[4].id]: mockFacets[4],
    },
    searchResults: {
      [mockListingHash]: {
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
            values: [[mockFacets[2].id]],
          },
          {
            deep: 2,
            description: 'Categories',
            dynamic: 0,
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [[mockFacets[3].id]],
          },
          {
            deep: 1,
            description: 'Colors',
            dynamic: 0,
            format: 'multiple',
            key: 'colors',
            type: 11,
            values: [[mockFacets[4].id]],
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
          {
            order: 0,
            type: 11,
            key: 'colors',
            gender: null,
            value: 12,
            valueUpperBound: 0,
            slug: null,
            description: null,
            deep: 0,
            parentId: 0,
            fromQueryString: true,
            negativeFilter: false,
          },
          {
            order: 0,
            type: 2,
            key: 'gender',
            gender: null,
            value: 0,
            valueUpperBound: 0,
            slug: 'woman',
            description: 'Woman',
            deep: 0,
            parentId: 0,
            fromQueryString: false,
            negativeFilter: false,
          },
          {
            order: 0,
            type: 9,
            key: 'sizes',
            gender: null,
            value: 22,
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

export const mockListingModel = {
  slug: mockListingSlug,
  subfolder: mockSubfolder,
  config: {
    pageIndex: 1,
  },
  facetGroups: mockFacetGroups,
  breadCrumbs: [],
  facetsBaseUrl: '/en-pt/shopping',
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
};

export const mockListingState = {
  listing: {
    error: { [mockListingHash]: 'Error - Listing not loaded.' },
    isHydrated: {
      [mockListingHash]: true,
    },
    isLoading: { [mockListingHash]: false },
    hash: mockListingHash,
  },
  entities: mockListingNormalizedPayload.entities,
};
