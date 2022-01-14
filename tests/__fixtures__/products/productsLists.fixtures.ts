import { mockBreadCrumbs } from './products.fixtures';
import { mockPriceAdaptedEmpty } from './price.fixtures';
import { mockSetId } from './ids.fixtures';

export const mockProductsListSlug = '/woman/clothing';
export const mockQuery = { categories: '135971', colors: '6', pageIndex: '1' };
export const mockQueryWithoutPageIndex = {
  categories: '135971',
  colors: '6',
};
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
] as const;
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
          {
            value: 136484,
            description: 'Ballerina Shoes',
            slug: 'shoes-ballerina-shoes',
            url: 'shoes-ballerina-shoes',
          },
        ],
      ],
      key: 'categories',
    },
    {
      deep: 0,
      description: 'Colors',
      dynamic: 0,
      format: 'multiple',
      key: 'colors',
      type: 11,
      values: [
        [
          {
            value: 6,
            description: 'BLUE',
            slug: null,
            parentId: 0,
          },
        ],
      ],
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
    facets: {
      categories_136103: {
        value: 136103,
        description: 'A-Line Skirts',
        slug: 'skirts-a-line-skirts',
        url: 'woman/skirts-a-line-skirts',
        id: 'categories_136103',
        parentId: 'categories_undefined',
      },
      categories_136484: {
        value: 136484,
        description: 'Ballerina Shoes',
        slug: 'shoes-ballerina-shoes',
        url: 'shoes-ballerina-shoes',
        id: 'categories_136484',
        parentId: 'categories_undefined',
      },
      colors_6: {
        description: 'BLUE',
        id: 'colors_6',
        parentId: 'colors_0',
        slug: null,
        value: 6,
      },
    },
    productsLists: {
      [mockProductsListHash]: {
        products: {
          entries: [12913172, 12913174],
          number: 1,
          totalItems: 40,
          totalPages: 2,
        },
        hash: mockProductsListHash,
        breadCrumbs: [{ text: 'Woman', slug: 'woman', link: 'shopping/woman' }],
        name: null,
        facetGroups: [
          {
            deep: 3,
            description: 'Categories',
            type: 6,
            values: [['categories_136103', 'categories_136484']],
            key: 'categories',
          },
          {
            deep: 0,
            description: 'Colors',
            dynamic: 0,
            format: 'multiple',
            key: 'colors',
            type: 11,
            values: [['colors_6']],
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
    },
    facets: {
      categories_136103: {
        value: 136103,
        description: 'A-Line Skirts',
        slug: 'skirts-a-line-skirts',
        url: 'woman/skirts-a-line-skirts',
        id: 'categories_136103',
        parentId: 'categories_undefined',
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
        hash: 'sets/1050',
        name: 'cool set',
        gender: 0,
        genderName: 'foo-bar',
        facetGroups: [
          {
            deep: 3,
            description: 'Categories',
            type: 6,
            values: [['categories_136103']],
            key: 'categories',
          },
        ],
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
    facets: {
      [mockFacets[0].id]: mockFacets[0],
      [mockFacets[1].id]: mockFacets[1],
      [mockFacets[2].id]: mockFacets[2],
      [mockFacets[3].id]: mockFacets[3],
      [mockFacets[4].id]: mockFacets[4],
    },
    productsLists: {
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
            values: [[mockFacets[2].id]],
          },
          {
            deep: 2,
            description: 'Categories',
            format: 'hierarchical',
            key: 'categories',
            type: 6,
            values: [[mockFacets[3].id]],
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
  facetGroups: [],
  breadCrumbs: [],
  facetsBaseUrl: '/en-pt/shopping',
  filterSegments: [
    {
      order: 0,
      type: 6,
      key: 'categories',
      value: 137626,
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
